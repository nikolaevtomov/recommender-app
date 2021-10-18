from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from recommender.apps import YouMayAlsoLikeConfig

from recommender.serializers import (MoviesMetadataSerializer, MovieMetadataSerializer, MovieCreditsSerializer)
from recommender.models import (MoviesMetadataModel, MovieMetadataModel, MovieCreditsModel, MoviesKeywordsModel)

import pandas as pd
from django_pandas.io import read_frame


class MoviesMetadataView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        paginator = PageNumberPagination()
        queryset = MoviesMetadataModel.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = MoviesMetadataSerializer(context, many=True)
        return paginator.get_paginated_response(serializer.data)


class MovieDetailsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    loaded_mlmodel = YouMayAlsoLikeConfig.mlmodel
    metadata = MoviesMetadataModel.objects.all()
    credits = MovieCreditsModel.objects.all()
    keywords = MoviesKeywordsModel.objects.all()

    metadata_df = read_frame(metadata)
    credits_df = read_frame(credits)
    keywords_df = read_frame(keywords)

    df = metadata_df.merge(credits_df, on='id')
    df = df.merge(keywords_df, on='id')
    df = df.reset_index()

    df.sort_values(by=['release_date'], inplace=True, ascending=False, na_position='first')

    indices = pd.Series(df.index, index=df['title'])
    
    def get_metadata_object(self, id):
        try:
            return MovieMetadataModel.objects.get(id=id)
        except MovieMetadataModel.DoesNotExist:
            raise status.HTTP_204_NO_CONTENT

    def get_credits_object(self, id):
        try:
            return MovieCreditsModel.objects.get(id=id)
        except MovieCreditsModel.DoesNotExist:
            raise status.HTTP_204_NO_CONTENT

    def content_recommender(self, title, cosine_sim=loaded_mlmodel, df=df, indices=indices):
        idx = indices[title]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        movie_indices = [i[0] for i in sim_scores]
        return df['id'].iloc[movie_indices]

    def get(self, request, id, format=None):
        metadata_instance = self.get_metadata_object(id)
        credits_instance = self.get_credits_object(id)

        recommended_instance = MoviesMetadataModel.objects.filter(
            id__in=self.content_recommender(metadata_instance.title)
        )

        metadata_serializer = MovieMetadataSerializer(metadata_instance)
        credits_serializer = MovieCreditsSerializer(credits_instance)
        recommended_serializer = MoviesMetadataSerializer(recommended_instance, many=True)
        
        return Response({
            **metadata_serializer.data,
            **credits_serializer.data,
            "you_may_also_like": recommended_serializer.data,
        }, status=status.HTTP_200_OK)

from rest_framework import serializers
from recommender.models import (MoviesMetadataModel, MovieMetadataModel, MovieCreditsModel)

from ast import literal_eval

class MoviesMetadataSerializer(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()

    def get_genres(self, obj):
        return ', '.join(d['name'] for d in literal_eval(obj.genres.replace("'", '"')))

    class Meta:
        model = MoviesMetadataModel
        fields = (
            'id',
            'genres',
            'poster_path',
            'release_date',
            'title',
            'vote_average',
            'vote_count',
            'runtime',
        )


class MovieMetadataSerializer(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()

    def get_genres(self, obj):
        return ', '.join(d['name'] for d in literal_eval(obj.genres))

    class Meta:
        model = MovieMetadataModel
        fields = (
            'id',
            'genres',
            'overview',
            'poster_path',
            'release_date',
            'runtime',
            'tagline',
            'title',
            'vote_average',
            'vote_count',           
        )

class MovieCreditsSerializer(serializers.ModelSerializer):
    director = serializers.SerializerMethodField()
    cast = serializers.SerializerMethodField()

    def get_director(self, obj):
        for crew_member in literal_eval(obj.crew):
            if crew_member['job'] == 'Director':
                return crew_member['name']
        return None

    def get_cast(self, obj):
        return ', '.join(d['name'] for d in literal_eval(obj.cast)[:10])

    class Meta:
        model = MovieCreditsModel
        fields = (
            'id',
            'cast',
            'director',
        )
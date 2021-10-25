from django.urls import path
import recommender.views as views

urlpatterns = [
    path('movies/', views.MoviesMetadataView.as_view(), name = 'api_movies'),
    path('top_rated/', views.TopRatedView.as_view(), name = 'api_top_rated'),
    path('details/<int:id>/', views.MovieDetailsView.as_view(), name = 'api_details'),
]
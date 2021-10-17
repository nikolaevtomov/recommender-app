from django.urls import path
import recommender.views as views

urlpatterns = [
    path('movies/', views.MoviesMetadataView.as_view(), name = 'api_movies'),
    path('details/<int:id>/', views.MovieDetailsView.as_view(), name = 'api_details'),
]
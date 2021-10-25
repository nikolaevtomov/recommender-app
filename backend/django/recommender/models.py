from django.db import models

class MoviesMetadataModel(models.Model):
    id = models.IntegerField(primary_key=True)
    genres = models.TextField()
    poster_path = models.TextField()
    release_date = models.DateField()
    title = models.TextField()
    vote_average = models.DecimalField(max_digits=10, decimal_places=1)
    vote_count = models.DecimalField(max_digits=10, decimal_places=0)
    runtime = models.DecimalField(max_digits=5, decimal_places=0)

    class Meta():
        ordering = ['-release_date']
        managed=False
        db_table = 'recommender\".\"movies_metadata'


class MovieMetadataModel(models.Model):
    id = models.IntegerField(primary_key=True)
    genres = models.TextField()
    overview = models.TextField()
    poster_path = models.TextField()
    release_date = models.DateField()
    runtime = models.DecimalField(max_digits=10, decimal_places=0)
    tagline = models.TextField()
    title = models.TextField()
    vote_average = models.DecimalField(max_digits=10, decimal_places=1)
    vote_count = models.DecimalField(max_digits=10, decimal_places=0)

    class Meta():
        managed=False
        db_table = 'recommender\".\"movies_metadata'


class MovieCreditsModel(models.Model):
    id = models.IntegerField(primary_key=True)
    cast = models.TextField()
    crew = models.TextField()

    class Meta():
        managed=False
        db_table = 'recommender\".\"credits'


class MoviesKeywordsModel(models.Model):
    id = models.IntegerField(primary_key=True)
    keywords = models.TextField()

    class Meta():
        managed=False
        db_table = 'recommender\".\"keywords'
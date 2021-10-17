from django.apps import AppConfig
import pickle
import os
import blosc


class YouMayAlsoLikeConfig(AppConfig):
    name = 'you_may_also_like'
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MLMODEL_FOLDER = os.path.join(BASE_DIR, 'recommender/mlmodels/')
    MLMODEL_FILE = os.path.join(MLMODEL_FOLDER, 'cosine_similarity_model.dat')

    with open(MLMODEL_FILE, 'rb') as pickle_file:
        compressed_pickle = pickle_file.read()

    depressed_pickle = blosc.decompress(compressed_pickle)
    mlmodel = pickle.loads(depressed_pickle)
# Movie recommender app
This is a movie recommender application that utilises multiple machine learning techniques.

## Install
```
git clone git@github.com:nikolaevtomov/recommender-app.git
```

## Build
```
docker-compose build
```

## Run
```
docker-compose up
```

At this stage, the `ml` model is missing. Running all columns in the `metadata-based-recommender.ipynb` file in the `notebook` directory will create it and place it in the `backend/django/recommender/mlmodels` folder.

## Runing backend for development
Using remote backend terminal at `/home/jovyan/work` volume.

```
python manage.py runserver 8080
```
Navigate to `127.0.0.1:8080/admin/` for django admin.

## Running frontent for development
Using remote frontent terminal at `/usr/src/app` volume.
```
yarn install
```
```
npm run start
```
This will ask you to run alternative port so `3001` will be assigned as the next available port.
Then navigate to `localhost:3001/` for react frontend.

## DB
<img src="screencapture-2.png?raw=true" width="250" alt="Recommender db scheme" />

### UI
![Recommender app ui](/screencapture-1.png?raw=true "Recommender app UI")

## Dataset reference
The original dataset can be obtained from Kaggle using [this](https://www.kaggle.com/rounakbanik/the-movies-dataset) link.

## TODOs
- <del>Build docker stack
- <del>Build installable database script
- Build notebooks
- Build various machine learning modals
- <del>Build backand
- <del>Build frontend
DROP TABLE IF EXISTS movies_metadata CASCADE;
DROP SCHEMA IF EXISTS recommender CASCADE;

CREATE SCHEMA recommender
    CREATE TABLE movies_metadata(
        adult TEXT,
        belongs_to_collection TEXT,
        budget TEXT,
        genres TEXT,
        homepage TEXT,
        id TEXT,
        imdb_id TEXT,
        original_language TEXT,
        original_title TEXT,
        overview TEXT,
        popularity TEXT,
        poster_path TEXT,
        production_companies TEXT,
        production_countries TEXT,
        release_date TEXT,
        revenue TEXT,
        runtime TEXT,
        spoken_languages TEXT,
        status TEXT,
        tagline TEXT,
        title TEXT,
        video TEXT,
        vote_average TEXT,
        vote_count TEXT
    )
    CREATE TABLE credits(
        "cast" TEXT,
        crew TEXT,
        id TEXT
    )
    CREATE TABLE keywords(
        id TEXT,
        keywords TEXT
    );

SELECT 'Copying data into recommender.movies_metadata';
\copy recommender.movies_metadata(adult,belongs_to_collection,budget,genres,homepage,id,imdb_id,original_language,original_title,overview,popularity,poster_path,production_companies,production_countries,release_date,revenue,runtime,spoken_languages,status,tagline,title,video,vote_average,vote_count) FROM 'data/clean_movies_metadata.csv' DELIMITER E',' CSV HEADER;

DELETE FROM recommender.movies_metadata WHERE id = '1997-08-20';
DELETE FROM recommender.movies_metadata WHERE id = '2012-09-29';
DELETE FROM recommender.movies_metadata WHERE id = '2014-01-01';

DELETE FROM recommender.movies_metadata
WHERE id IN
    (SELECT id
    FROM 
        (SELECT id, ROW_NUMBER() OVER( PARTITION BY id ORDER BY id ) AS row_num
        FROM recommender.movies_metadata ) t
        WHERE t.row_num > 1 );

ALTER TABLE recommender.movies_metadata ALTER COLUMN id TYPE NUMERIC USING id::numeric;
ALTER TABLE recommender.movies_metadata ADD CONSTRAINT movies_metadata_pk PRIMARY KEY (id);
ALTER TABLE recommender.movies_metadata ALTER COLUMN adult TYPE BOOLEAN USING adult::boolean;
ALTER TABLE recommender.movies_metadata ALTER COLUMN budget TYPE NUMERIC USING budget::numeric;
ALTER TABLE recommender.movies_metadata ALTER COLUMN original_title TYPE VARCHAR(255);
ALTER TABLE recommender.movies_metadata ALTER COLUMN popularity TYPE DECIMAL USING popularity::decimal;
ALTER TABLE recommender.movies_metadata ALTER COLUMN release_date TYPE DATE USING release_date::date;
ALTER TABLE recommender.movies_metadata ALTER COLUMN revenue TYPE MONEY USING revenue::money;
ALTER TABLE recommender.movies_metadata ALTER COLUMN runtime TYPE DECIMAL USING runtime::decimal;
ALTER TABLE recommender.movies_metadata ALTER COLUMN title TYPE VARCHAR(255);
ALTER TABLE recommender.movies_metadata ALTER COLUMN vote_average TYPE DECIMAL USING vote_average::decimal;
ALTER TABLE recommender.movies_metadata ALTER COLUMN vote_count TYPE DECIMAL USING vote_count::decimal;

SELECT 'Copying data into recommender.credits';
\copy recommender.credits("cast",crew,id) FROM 'data/clean_credits.csv' DELIMITER ',' CSV HEADER;

DELETE FROM recommender.credits
WHERE id IN
    (SELECT id
    FROM 
        (SELECT id,
        ROW_NUMBER() OVER( PARTITION BY id ORDER BY id ) AS row_num
        FROM recommender.credits ) t
        WHERE t.row_num > 1 );

ALTER TABLE recommender.credits ADD CONSTRAINT credits_pk PRIMARY KEY (id);
ALTER TABLE recommender.credits ALTER COLUMN id TYPE NUMERIC USING id::numeric;
ALTER TABLE recommender.credits ADD CONSTRAINT id_fk FOREIGN KEY (id) REFERENCES recommender.movies_metadata(id);

SELECT 'Copying data into recommender.keywords';
\copy recommender.keywords(id,keywords) FROM 'data/clean_keywords.csv' DELIMITER ',' CSV HEADER;

DELETE FROM recommender.keywords
WHERE id IN
    (SELECT id
    FROM 
        (SELECT id,
        ROW_NUMBER() OVER( PARTITION BY id ORDER BY id ) AS row_num
        FROM recommender.keywords ) t
        WHERE t.row_num > 1 );

ALTER TABLE recommender.keywords ADD CONSTRAINT keywords_pk PRIMARY KEY (id);
ALTER TABLE recommender.keywords ALTER COLUMN id TYPE NUMERIC USING id::numeric;
ALTER TABLE recommender.keywords ADD CONSTRAINT id_fk FOREIGN KEY (id) REFERENCES recommender.movies_metadata(id);
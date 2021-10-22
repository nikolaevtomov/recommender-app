FROM library/postgres:13.4

RUN apt-get update
RUN apt-get -y install unzip

COPY init_data /data/
RUN cd /data && \
    unzip clean_credits.csv.zip && \
    rm clean_credits.csv.zip && \
    unzip clean_keywords.csv.zip && \
    rm clean_keywords.csv.zip && \
    unzip clean_movies_metadata.csv.zip && \
    rm clean_movies_metadata.csv.zip

COPY install.sql /docker-entrypoint-initdb.d/
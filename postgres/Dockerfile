FROM library/postgres:13.4

RUN mkdir data
COPY init_data /data/
COPY install.sql /docker-entrypoint-initdb.d/
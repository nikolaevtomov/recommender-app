FROM jupyter/datascience-notebook

USER root
RUN apt-get update
RUN apt-get -y install git unzip

COPY data /data/
RUN cd /data && \
    unzip credits.csv.zip && \
    rm credits.csv.zip && \
    unzip keywords.csv.zip && \
    rm keywords.csv.zip && \
    unzip movies_metadata.csv.zip && \
    rm movies_metadata.csv.zip

WORKDIR /home/jovyan/work
COPY requirements.txt /home/jovyan/work/
RUN pip3 install -r requirements.txt
COPY . /home/jovyan/work/
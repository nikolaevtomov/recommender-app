FROM jupyter/datascience-notebook

USER root
RUN apt-get update
RUN apt-get -y install git

WORKDIR /home/jovyan/work
COPY requirements.txt /home/jovyan/work/
RUN pip3 install -r requirements.txt
COPY . /home/jovyan/work/
# For more information, please refer to https://aka.ms/vscode-docker-python
# set base image as python
FROM python:3.8-slim-buster

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
RUN pip install gunicorn[gevent]
COPY config/requirements.txt .
RUN python -m pip install -r requirements.txt

# set the working directory for the following instructions
WORKDIR /app

# copying the source code from local system to docker image
COPY ./config /app

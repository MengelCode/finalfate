# Setup variables
ARG SRC_NAME=amd64
ARG SRC_REPO=httpd
ARG SRC_TAG=alpine

# Pull image
FROM ${SRC_NAME}/${SRC_REPO}:${SRC_TAG}

COPY finalfate/ /usr/local/apache2/htdocs/

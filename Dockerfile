# Setup variables
ARG SRC_NAME
ARG SRC_REPO
ARG SRC_TAG

# Pull image
FROM ${SRC_NAME}/${SRC_REPO}:${SRC_TAG}

COPY finalfate/ /usr/local/apache2/htdocs/

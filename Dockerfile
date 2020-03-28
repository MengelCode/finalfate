# Dummy Dockerfile because hooks aren't working with a custom Filename
# Have a look into the hooks folder to see them per arch
# https://github.com/mengel38/finalfate/tree/master/hooks/

FROM scratch AS buildcontext

COPY . .

# Setup variables
ARG SRC_REPO
ARG SRC_TAG

# Pull image
FROM ${SRC_NAME}/${SRC_REPO}:${SRC_TAG}

COPY --from=buildcontext finalfate/ /usr/local/apache2/htdocs/

EXPOSE 80

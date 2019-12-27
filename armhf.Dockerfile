# Set global environment variables

# Setup Qemu
FROM alpine AS qemu

ENV QEMU_URL https://github.com/balena-io/qemu/releases/download/v3.0.0%2Bresin/qemu-3.0.0+resin-arm.tar.gz

RUN apk add curl && curl -L ${QEMU_URL} | tar zxvf - -C . --strip-components 1

# Setup arguments for next image
ARG SRC_USER
ARG SRC_REPO
ARG SRC_VERSION

# Pull image
FROM ${SRC_NAME}/${SRC_REPO}:${SRC_TAG} as bundle

COPY --from=qemu qemu-arm-static /usr/bin

COPY finalfate/ /usr/local/apache2/htdocs/

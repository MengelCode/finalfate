# https://github.com/ichbestimmtnicht/docker-autobuild-release
# Template created 2020 by Ludwig Werner Döhnert
# This work is licensed under the Creative Commons Attribution 4.0 International License.
# To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

# Preset global variables from hub.docker.com

# SOURCE_BRANCH: the name of the branch or the tag that is currently being tested.
# SOURCE_COMMIT: the SHA1 hash of the commit being tested.
# COMMIT_MSG: the message from the commit being tested and built.
# DOCKER_REPO: "test" the name of the Docker repository being built.
# DOCKERFILE_PATH: the dockerfile currently being built.
# DOCKER_TAG: the Docker repository tag being built.
# IMAGE_NAME: the name and tag of the Docker repository being built. 
# (IMAGE_NAME is a combination of DOCKER_REPO:DOCKER_TAG)


#--------------------------------------------------------------
# Decisions

BUILD_COMPRESS=true # recommended=true
# remove intermediate containers?
BUILD_FORCE_RM=true
# Use Cache?
# true for no cache
BUILD_NO_CACHE=false
# Always pull images?
BUILD_PULL=true
# Do you want to see moore build information in your log?
BUILD_QUIET=false
# anything other then false will build up to that stage
# e.g. "build" to build up to stage build
BUILD_TARGET_STAGE=false
# which arches to build
DEST_ARCHES="amd64 arm32v7 arm64v8"
# username to push to
#DEST_USER="ichbestimmtnicht"
# repo to push to
DEST_REPO="finalfate"
# destination tag for the manifest
# change only if you do not use hub.docker.com as infrastructure
DEST_TAG="${DOCKER_TAG}"
# hubto
DEST_HUB="index.docker.io"

#--------------------------------------------------------------
# Multi entry variables

# --build-arg 
# use as many as you like
# BUILD_ARG_
BUILD_ARGS=true # Set to false to disable build-arg's
BUILD_ARG_SRC_REPO="httpd"
BUILD_ARG_SRC_TAG="alpine"

# LABEL_ only: Use a double underscore __ for an hyphen -
# LABEL_
# Hardcoded Labels that are pointless to change because the get overwritten
# LABEL_BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
# LABEL_VCS_REF="$(git rev-parse --short HEAD)"
LABEL_DESCRIPTION="**The Final Fate** A space game in HTML5 and JavaScript."
LABEL_VCS_URL="https://github.com/${DEST_USER}/finalfate"
LABEL_DOCKER_CMD="docker pull ${IMAGE_NAME}"
LABEL_MAINTAINER="${DEST_USER}"
LABEL_NAME="${IMAGE_NAME}"
LABEL_VENDOR="${DEST_USER}"
LABEL_SCHEMA_VERSION="1.0.0-rc1"

# use as many as you like
# NOT TESTED but should work. let me know if it works
BUILD_HOSTS=false # Set to "true" to enable Build hosts
# BUILD_HOST_

# use as many as you like
# NOT TESTED but should work. let me know if it works
BUILD_CGROUPS=false # Set to "true" to enable cgroups
# BUILD_CGROUP_

#--------------------------------------------------------------
# Experimental Features
# DO NOT DELETE OR CHANGE
# If you are running your own docker build server 
# and have experimental features enabled
# you could use squash. (combine layers)
# But make sure you do NOT download the scripts at buildtime
# from the master branch. Use a stable release tag
# or copy the hole script because the corresponding part
# may change in the future
# NOT TESTED
BUILD_SQUASH=false
 
# current implementation doesn't make sense
# DO NOT CHANGE
# NOT TESTED
BUILD_PLATFORM=false


#--------------------------------------------------------------
# Placeholder for upcoming features
# DO NOT CHANGE OR DELETE

# self-explanatory - feature will be added in the near future
BUILD_SINGLE_DOCKERFILE=false

# We may add support for different host build arches
# that you could use your raspberry pi or something like that as your buildserver
BUILD_ARCH="amd64"

# we may support MS-Windows Container in the future
DEST_OS="linux"
# for windows builds
# possible values=default process or hyperv
BUILD_ISOLATION=false

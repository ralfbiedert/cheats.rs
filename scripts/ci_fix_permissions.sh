#!/bin/bash
#
# Hack to fix Gitea actions where `shalzz/zola-deploy-action` rootifies output folder ...
#

PROJECT_ROOT="$( cd "$(dirname "$0")/.." ; pwd -P )" # this file
USER=$(whoami)

sudo chown -R $USER: "$PROJECT_ROOT"
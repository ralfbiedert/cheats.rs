#!/bin/bash

script_dir=$(readlink -f $(dirname $0))

# Docker image tag.
tag=${1:-cheats-box}

# Determine download URL of latest zola release.
zola_url=$(curl https://api.github.com/repos/getzola/zola/releases/latest |
           jq --raw-output '.assets[].browser_download_url | select(test("x86_64-unknown-linux-gnu"))')

if test -z $zola_url; then
    echo "ERR: Failed to determine zola download URL!"
    exit 1
fi

echo "-- info --"
echo "TAG : $tag"
echo "ZOLA: $zola_url"
echo "----------"

if ! docker build --tag $tag --build-arg ZOLA_URL=$zola_url $script_dir; then
    echo "ERR: Failed to build docker image!"
    exit 1
fi

exit 0

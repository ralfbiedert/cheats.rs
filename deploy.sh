#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

DIST=public
TOML_BASE=config.toml

_YELLOW='\033[1;33m'
_GREEN='\033[0;32m'
_NC='\033[0m' # No Color


NOW=`date +"%Y-%m-%dT%H:%M:%S+02:00"`


# https://stackoverflow.com/questions/5195607/checking-bash-exit-status-of-several-commands-efficiently
function exit_if_fail {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "error with '$1'" >&2
        exit 1
    fi
    return $status
}


exit_if_fail zola -c $TOML_BASE check
exit_if_fail zola -c $TOML_BASE build
exit_if_fail npm run posthtml

# Update deployment date in sitemap.xml
sed -i -e "s/_NOW_/$NOW/g" $DIST/sitemap.xml


if [[ $1 == "--live" ]]; then
    echo -e "Sending to ${_GREEN}LIVE${_NC} environment."

    # Publish
    aws s3 cp $DIST s3://cheats.rs/ --recursive
    aws cloudfront create-invalidation --distribution-id E3P5E5G4A4QPL8 --paths "/*"
else
    # Staging URL:
    # http://cheats.rs-staging.s3-website.eu-central-1.amazonaws.com/

    echo -e "Sending to ${_YELLOW}STAGING${_NC} environment."

    # Staging
    aws s3 cp $DIST s3://cheats.rs-staging/ --recursive
fi

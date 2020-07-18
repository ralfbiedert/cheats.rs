#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

TOML_BASE=config.toml

FOLDER_PREP=public       # Zola output folder
FOLDER_DIST=public.clean # Our own publish folder after asset inlining

# Only these files are allowed to move from $FOLDER_PREP to $FOLDER_DIST (and end up on S3)
FOLDER_DIST_WHITELIST=("index.html" "favicon32.png" "404.html" "legal" "sitemap.xml" "robots.txt")

# To color our `echo` output
_YELLOW='\033[1;33m'
_GREEN='\033[0;32m'
_RED='\033[0;31m'
_NC='\033[0m' # No Color

# Substituions in generated files
NOW_SITEMAP=`date +"%Y-%m-%dT%H:%M:%S+02:00"`
NOW_HUMAN=`date +"%d.%m.%Y"`
GITHASH=`git rev-parse --short HEAD`

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


exit_if_fail zola -c "$TOML_BASE" check
exit_if_fail zola -c "$TOML_BASE" build
exit_if_fail npm run posthtml_1     # This is absolutely terrible but apparently the asset inliner we use
exit_if_fail npm run posthtml_2     # is unable to handle multiple files with different paths gracefully ...

# Update deployment date in sitemap.xml
sed -i -e "s/_NOW_SITEMAP_/$NOW_SITEMAP/g" "$FOLDER_PREP/sitemap.xml"
sed -i -e "s/_NOW_HUMAN_/$NOW_HUMAN/g" "$FOLDER_PREP/index.html"
sed -i -e "s/_GITHASH_/$GITHASH/g" "$FOLDER_PREP/index.html"


# Make sure we _only_ allow final (packaged) files as S3 gets messy otherwise
rm -rf "$FOLDER_DIST"; mkdir "$FOLDER_DIST";

# Only more expressly allowed files
for item in ${FOLDER_DIST_WHITELIST[*]}
do
    echo "Copying $FOLDER_PREP/$item to $FOLDER_DIST/"
    cp -rf "$FOLDER_PREP/$item" "$FOLDER_DIST"
done

# Now we can publish
if [[ $1 == "--live" ]]; then
    echo -e "Sending to ${_GREEN}LIVE${_NC} environment."

    # Make sure we have committed so the public web site shows the right hash.
    if [[ -n "$(git status --porcelain)" ]]; then
        echo -e "You ${_RED}must commit${_NC} before going --live. Aborting ..."
        exit 1
    fi

    # Publish
    aws s3 cp $FOLDER_DIST s3://cheats.rs/ --recursive
    aws cloudfront create-invalidation --distribution-id E3P5E5G4A4QPL8 --paths "/*"
fi

if [[ $1 == "--staging" ]]; then
    # Staging URL:
    # http://cheats.rs-staging.s3-website.eu-central-1.amazonaws.com/

    echo -e "Sending to ${_YELLOW}STAGING${_NC} environment."

    # Staging
    aws s3 cp $DIST s3://cheats.rs-staging/ --recursive
fi

#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

ZOLA=zola
TOML_BASE=config.toml

FOLDER_PREP=public       # Zola output folder
FOLDER_DIST=public.clean # Our own publish folder after asset inlining

# Only these files are allowed to move from $FOLDER_PREP to $FOLDER_DIST (and end up on S3)
FOLDER_DIST_WHITELIST=("index.html" "404.html" "legal" "sitemap.xml" "robots.txt" "fonts/")

# To color our `echo` output
_YELLOW='\033[1;33m'
_GREEN='\033[0;32m'
_RED='\033[0;31m'
_NC='\033[0m' # No Color

# Substituions in generated files
NOW_SITEMAP=`date +"%Y-%m-%dT%H:%M:%S+02:00"`
NOW_HUMAN=`date +"%-d. %B %Y"`
GITHASH=`git rev-parse --short HEAD`

function abort() {
    echo "Error executing previous command."
    exit 1
}

# Make sure we _only_ allow final (packaged) files as S3 gets messy otherwise
rm -rf "$FOLDER_PREP"; mkdir "$FOLDER_PREP";
rm -rf "$FOLDER_DIST"; mkdir "$FOLDER_DIST";

$ZOLA -c "$TOML_BASE" check || abort
$ZOLA -c "$TOML_BASE" build || abort
npm run posthtml || abort  # Cleanup and minify output

# Write used zola version to help others reproduce builds
$ZOLA --version >.zolaversion

# Update deployment date in sitemap.xml
sed -i -e "s/_NOW_SITEMAP_/$NOW_SITEMAP/g" "$FOLDER_PREP/sitemap.xml"
sed -i -e "s/_NOW_HUMAN_/$NOW_HUMAN/g" "$FOLDER_PREP/index.html"
sed -i -e "s/_GITHASH_/$GITHASH/g" "$FOLDER_PREP/index.html"


# Only more expressly allowed files
for item in ${FOLDER_DIST_WHITELIST[*]}
do
    echo "Copying $FOLDER_PREP/$item to $FOLDER_DIST/"
    cp -rf "$FOLDER_PREP/$item" "$FOLDER_DIST"
done


# Early debug exit (USE THIS ONE, or there will be pain and suffering)
# exit 0


# Now we can publish
if [[ $1 == "--live" ]]; then
    echo -e "Sending to ${_GREEN}LIVE${_NC} environment."

    # Make sure we have committed so the public web site shows the right hash.
    if [[ -n "$(git status --porcelain)" ]]; then
        echo -e "You ${_RED}must commit${_NC} before going --live. Aborting ..."
        exit 1
    fi

    # Publish
    scp -r public.clean/* rb@192.168.0.1:/data/sites/cheats.rs
fi

if [[ $1 == "--staging" ]]; then
    # Staging URL:
    # http://cheats.rs-staging.s3-website.eu-central-1.amazonaws.com/

    echo -e "Sending to ${_YELLOW}STAGING${_NC} environment."

    # Staging
    scp -r public.clean/* rb@192.168.0.1:/data/sites/cheats.rs
fi

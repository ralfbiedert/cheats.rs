#!/bin/bash
#
# Pack release for public use (e.g., inject build hash, embed resources).
#

PROJECT_ROOT="$( cd "$(dirname "$0")/.." ; pwd -P )"

ZOLA=zola
TOML_BASE=config.toml

FOLDER_PREP=public       # Zola output folder
FOLDER_DIST=public.clean # Our own publish folder after asset inlining

# Only these files are allowed to move from $FOLDER_PREP to $FOLDER_DIST (and end up on S3)
FOLDER_DIST_WHITELIST=("index.html" "favicon.ico" "404.html" "legal" "faq" "sitemap.xml" "robots.txt" "fonts/")

# Substituions in generated files
NOW_SITEMAP=`date +"%Y-%m-%dT%H:%M:%S+02:00"`
NOW_HUMAN=`date +"%-d. %B %Y"`
GITHASH=`git rev-parse --short HEAD`

function abort() {
    echo "Error executing previous command."
    exit 1
}

cd "$PROJECT_ROOT"
mkdir -p "$PROJECT_ROOT/$FOLDER_DIST"

# Posthtml plugins being the pile of garbage they are, we need to manually copy files
# to these paths (no, setting a HTML root and using proper paths does NOT work ...)
cp public/*.css public/legal
cp public/*.js public/legal
cp public/*.css public/faq
cp public/*.js public/faq

# Now run Posthtml
npm run posthtml || abort  # Cleanup and minify output

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

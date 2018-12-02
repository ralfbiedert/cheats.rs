#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

PUBLIC=public/
DASHING=dashing/

cp -r $PUBLIC $DASHING
cp dashing.json $DASHING

cd $DASHING

# We have to delete all archive folders since dashing does not
# have a way to ignore these.
rm -r 201*
rm 404.html
rm .DS_Store
rm robots.txt
rm sitemap.xml
rm *.pdf

dashing build mydocs

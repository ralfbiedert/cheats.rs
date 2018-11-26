#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

if ! grep "^build_search_index = false$" config.toml > /dev/null
then
   echo "'build_search_index' must be enabled in 'config.toml'"
   exit -1
fi

zola build

aws s3 cp public s3://cheats.rs/ --recursive
aws cloudfront create-invalidation --distribution-id E3P5E5G4A4QPL8 --paths "/*"

#!/bin/bash
#
# Poor man's deploy script in lack of better infrastructure.
#

zola build

aws s3 cp public s3://cheats.rs/ --recursive
aws cloudfront create-invalidation --distribution-id E3P5E5G4A4QPL8 --paths "/*"

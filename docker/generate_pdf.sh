#!/bin/bash

output=${1:-cheats.rs/rust_cheat_sheet.pdf}

if ! test -x zola -a -d cheats.rs; then
    echo "ERR: Either 'zola' missing or repository not mounted as 'cheats.rs'!"
    exit 1
fi

./zola --root cheats.rs serve &
zola_pid=$!

# FIXME: Is there a better way to check if zola us up?
while ps $zola_pid >& /dev/null; do
    sleep 0.5
    if wkhtmltopdf http://127.0.0.1:1111 $output; then
        exit 0
    fi
done

exit 1

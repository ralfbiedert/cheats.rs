# FAQ

### How can I build an offline copy?

On Linux & macOS the following command should work. For Windows you have to adapt `$PWD` accordingly:

```sh
zola build --base-url="$PWD/public/index.html" --output-dir="$PWD/public"
```

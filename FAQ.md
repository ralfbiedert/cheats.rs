# FAQ

### How can I build an offline copy?

On Linux & macOS the following command should work. For Windows you have to adapt `$PWD` accordingly:

```sh
zola build --base-url="$PWD/public/index.html" --output-dir="$PWD/public"
```


### How do I upgrade Prism?

- Visit https://prismjs.com/download.html
- Select version: "Minified"
- Select theme: "Default"
- Select languages: "Rust" (and only Rust)
- Select plugins: "Keep Markup"
- Save files and replace the ones in `static`
- Check the Git log, and discard some changes that happened in the CSS which now make the page look ugly (for example but not limited to: `font-style`, `background`, ...)

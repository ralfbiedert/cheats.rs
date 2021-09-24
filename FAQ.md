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
- Select plugins: "Keep Markup", "Highlight Keywords" (experimental)
- Save files and replace the ones in `static`
- In `git`, discard changes to CSS which now make the page look ugly (for example but not limited to: `font-style`, `background`, ...)


### Convert unwilling images to data URIs?

- https://ezgif.com/image-to-datauri
- Add to `postprocess.js`


### Why the pentagram?

The pentagram has a few desirable properties:

- easier and safer to execute compared to heptagrams and tridecagrams,
- faster to draw,
- has excellent documentation spanning several centuries,
- and, most importantly, it requires less blood and is therefore more ergonomic.

In other words, the pentagram is the Rust of summoning circles.

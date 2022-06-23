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


### Why no visualizations for HashMap, BinaryHeap, ...?

~~They are messy to compose and their internals are unspecified. In contrast, `Box` and `Vec` are relatively well defined or at least simple. I might accept PRs, but there is a good chance for that PR to be complex and outdated soon.~~ (This has been done in d653f0f)


### I sent a message earlier, why didn't you fix ... ?

Some of the _wontfix_ end up on Github with a brief comment why. The most common reason something didn't get fixed: The comment was too short or cryptic, and it was unclear what's actually broken.


### Why all the HTML graphics? Why don't you use images?

Images are easier to create, but harder to version. Between PNGs and SVGs, HTML had the nicest balance.



### Who is the target audience? Why don't you explain ...?

At the risk of being overly specific, the _persona_ the page is written for:

- 3+ years non-Rust programming experience (Java, Python, C, ...)
- 2+ weeks Rust experience (read a book or completed a tutorial)
- some familiarity with C-level concepts (memory, pointers)

We of course hope to provide value even if someone doesn't fall into that bucket, but not at the expense of a streamlined experience for our target audience.



### I created X, can you link it?

Maybe. The current policy is not set in stone but is vaguely:

- To add items to an existing list the entry should be high quality and the list shouldn't grow too long.
- To add a specific link somewhere else it should be _the best of its kind_ for that purpose.

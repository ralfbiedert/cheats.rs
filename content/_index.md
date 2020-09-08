+++
weight = 1
sort_by = "weight"
template = "index.html"
insert_anchor_links = "right"
+++


<img id="logo" src="logo.png" alt="Ferris holding a cheat sheet."></img>
<pagetitle>Rust Language Cheat Sheet</pagetitle>
<subtitle><span id="subtitle" onclick="toggle_subtitle()">{{ date() }}</span></subtitle>



> Contains clickable links to
> **The Book** {{ book(page="") }},
> **Rust by Example** {{ ex(page="") }},
> **Std Docs** {{ std(page="std") }},
> **Nomicon** {{ nom(page="") }},
> **Reference** {{ ref(page="") }}.
> Other symbols used:
> largely **deprecated** {{ deprecated() }},
> has a **minimum edition** {{ edition(ed="'18") }},
> is **work in progress** {{ experimental() }},
> or **bad** {{ bad() }}.

<page-controls>
    <!-- <a id="" href="" style="float: left; margin-left:5px;">X-Ray Mode 👓</a> -->
    <a id="toggle_ligatures" href="javascript:toggle_ligatures()">Fira Code Ligatures (<code>..=, =></code>)</a>
    <a href="javascript:toggle_night_mode()">Night Mode &#x1f4a1;</a>
</page-controls>


<noprint>
<toc><column>

**Language Constructs**
* [Data Structures](#data-structures)
* [References & Pointers](#references-pointers)
* [Functions & Behavior](#functions-behavior)
* [Control Flow](#control-flow)
* [Organizing Code](#organizing-code)
* [Type Aliases and Casts](#type-aliases-and-casts)
* [Macros & Attributes](#macros-attributes)
* [Pattern Matching](#pattern-matching)
* [Generics & Constraints](#generics-constraints)
* [Strings & Chars](#strings-chars)
* [Comments](#comments)
* [Miscellaneous](#miscellaneous)

**Behind the Scenes**
* [Memory & Lifetimes](#memory-lifetimes)<sup>🔥new</sup>
* [Language Sugar](#language-sugar)


**Data & Types**
* [Basic Types](#basic-types)
* [Custom Types](#custom-types)
* [References & Pointers](#references-pointers-ui)
* [Closures](#closures-data)
* [Standard Library Types](#standard-library-types)

</column>

<column>

**Standard Library**
* [Common One-Liners](#common-one-liners)
* [Traits](#traits)
* [Number Conversions](#number-conversions)
* [String Conversions](#string-conversions)
* [String Formatting](#string-formatting)


**Tooling**
* [Project Anatomy](#project-anatomy)
* [Cargo](#cargo)
* [Cross Compilation](#cross-compilation)


**Coding Guides**
* [Idiomatic Rust](#idiomatic-rust)
* [Async-Await 101](#async-await-101)
* [Closures in APIs](#closures-in-apis)
* [Unsafe, Unsound, Undefined](#unsafe-unsound-undefined)
* [API Stability](#api-stability)

**Misc**
* [Links & Services](#links-services)
* [Printing & PDF](#printing-pdf)

</column></toc>

</noprint>

<noprint>

## Hello, Rust!

If you are new to Rust, or if you want to try the things below:


<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-hello-1" name="tab-hello" checked></input>
<label for="tab-hello-1"><b>Hello World</b></label>
<panel><div>
<div id="hellostatic">

```rust
fn main() {
    println!("Hello, world!");
}
```

</div>
<div id="helloplay"></div>
<div id="helloinfo">Service provided by <a href="https://play.rust-lang.org/" target="_blank">play.rust-lang.org <sup>🔗</sup></a></div>
<div id="helloctrl"><a href="javascript:show_playground(true);">▶️ Edit & Run</a></div>
</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-hello-3" name="tab-hello">
<label for="tab-hello-3"><b>Strengths</b></label>
<panel><div>

Things Rust does measurably really well:

- compiled code [about same performance](https://benchmarksgame-team.pages.debian.net/benchmarksgame/which-programs-are-fastest.html) as C / C++, and excellent [memory and energy efficiency](https://dl.acm.org/doi/10.1145/3136014.3136031)
- can [avoid 70% of all safety issues](https://msrc-blog.microsoft.com/2019/07/22/why-rust-for-safe-systems-programming/) present in C / C++, and most memory issues.
- strong type system prevents [data races](https://doc.rust-lang.org/nomicon/races.html), brings ['fearless concurrency'](https://blog.rust-lang.org/2015/04/10/Fearless-Concurrency.html) (amongst others)
- seamless C interop, and [dozens of supported platforms](https://forge.rust-lang.org/release/platform-support.html) (based on LLVM)
- ["most loved language"](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages) for 5 years in a row
- modern tooling: `cargo` (builds _just work_), `clippy` (300+ code quality lints), `rustup` (easy toolchain mgmt)

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-hello-4" name="tab-hello">
<label for="tab-hello-4"><b>Weaknesses</b></label>
<panel><div>

Points you might run into:

- steep learning curve<sup>1</sup>; compiler enforcing (esp. memory) rules that would be "best practices" elsewhere
- missing Rust-native libs in some domains, target platforms (esp. embedded), IDE features<sup>1</sup>
- longer compile times than "similar" code in other languages<sup>1</sup>
- no formal language specification, can prevent legal use in some domains (aviation, medical, ...)
- careless (use of) libraries can break safety guarantees for why Rust was picked in the first place

<sup>1</sup> Compare [Rust Survey](https://blog.rust-lang.org/2020/04/17/Rust-survey-2019.html#why-not-use-rust).
</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-hello-5" name="tab-hello">
<label for="tab-hello-5"><b>Getting Started</b></label>
<panel><div>

If you want to start developing Rust:
- download installer from [**rustup.rs**](https://rustup.rs/) (highly recommended for any platform)
- install an IDE:
    - [IntelliJ](https://www.jetbrains.com/idea/) (free) or [CLion](https://www.jetbrains.com/clion/) (paid) with [**IntelliJ Rust**](https://intellij-rust.github.io/)
    - [Visual Studio Code](https://code.visualstudio.com/) with [**rust-analyzer**](https://rust-analyzer.github.io/)
- check links on this site, more [learning resources](https://www.rust-lang.org/learn) and [**where to ask questions**](https://www.rust-lang.org/community).
</div></panel></tab>

</tabs>
</noprint>


### Data Structures

Data types and memory locations defined via keywords.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `struct S {}` | Define a **struct** {{ book(page="ch05-00-structs.html") }} {{ ex(page="custom_types/structs.html") }} {{ std(page="std/keyword.struct.html") }} {{ ref(page="expressions/struct-expr.html") }} with named fields. |
| {{ tab() }} `struct S { x: T }` | Define struct with named field `x` of type `T`. |
| {{ tab() }} `struct S` &#8203;`(T);` | Define "tupled" struct with numbered field `.0` of type `T`. |
| {{ tab() }} `struct S;` | Define **zero sized** {{ nom(page="exotic-sizes.html#zero-sized-types-zsts")}} unit struct. Occupies no space, optimized away. |
| `enum E {}` | Define an **enum** {{ book(page="ch06-01-defining-an-enum.html") }} {{ ex(page="custom_types/enum.html#enums") }} {{ ref(page="items/enumerations.html") }} , _c_. [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type), [tagged unions](https://en.wikipedia.org/wiki/Tagged_union). |
| {{ tab() }}  `enum E { A, B`&#8203;`(), C {} }` | Define variants of enum; can be unit- `A`, tuple- `B` &#8203;`()` and struct-like `C{}`. |
| {{ tab() }}  `enum E { A = 1 }` | If variants are only unit-like, allow discriminant values, e.g., for FFI. |
| `union U {}` | Unsafe C-like **union**  {{ ref(page="items/unions.html") }} for FFI compatibility. |
| `static X: T = T();`  | **Global variable** {{ book(page="ch19-01-unsafe-rust.html#accessing-or-modifying-a-mutable-static-variable") }} {{ ex(page="custom_types/constants.html#constants") }} {{ ref(page="items/static-items.html#static-items") }}  with `'static` lifetime, single memory location. |
| `const X: T = T();`  | Defines **constant** {{ book(page="ch03-01-variables-and-mutability.html#differences-between-variables-and-constants") }} {{ ex(page="custom_types/constants.html") }} {{ ref(page="items/constant-items.html") }}. Copied into a temporary when used. |
| `let x: T;`  | Allocate `T` bytes on stack{{ note( note="1") }} bound as `x`. Assignable once, not mutable.  |
| `let mut x: T;`  | Like `let`, but allow for **mutability** {{ book(page="ch03-01-variables-and-mutability.html") }} {{ ex(page="variable_bindings/mut.html") }} and mutable borrow.{{ note( note="2") }} |
| {{ tab() }} `x = y;` | Moves `y` to `x`, invalidating `y` if `T` is not **`Copy`**, {{ std(page="std/marker/trait.Copy.html") }} and copying `y` otherwise. |

</fixed-2-column>

<footnotes>

<sup>1</sup> **Bound variables** {{ book(page="ch03-01-variables-and-mutability.html") }} {{ ex(page="variable_bindings.html") }} {{ ref(page="variables.html") }} live on stack for synchronous code. In `async {}` code they become part async's state machine, may reside on heap.<br>
<sup>2</sup> Technically _mutable_ and _immutable_ are misnomer. Immutable binding or shared reference may still contain Cell {{ std(page="std/cell/index.html") }}, giving _interior mutability_.

</footnotes>


{{ tablesep() }}

Creating and accessing data structures; and some more _sigilic_ types.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `S { x: y }` | Create `struct S {}` or `use`'ed `enum E::S {}` with field `x` set to `y`. |
| `S { x }` | Same, but use local variable `x` for field `x`. |
| `S { ..s }` | Fill remaining fields from `s`, esp. useful with [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `S { 0: x }` | Like `S` &#8203;`(x)` below, but set field `.0` with struct syntax.  |
| `S`&#8203; `(x)` | Create `struct S` &#8203;`(T)` or `use`'ed `enum E::S`&#8203; `()` with field `.0` set to `x`. |
| `S` | If `S` is unit `struct S;` or `use`'ed `enum E::S` create value of `S`. |
| `E::C { x: y }` | Create enum variant `C`. Other methods above also work. |
| `()` | Empty tuple, both literal and type, aka **unit**. {{ std(page="std/primitive.unit.html") }} |
| `(x)` | Parenthesized expression. |
| `(x,)` | Single-element **tuple** expression. {{ ex(page="primitives/tuples.html") }} {{ std(page="std/primitive.tuple.html") }} {{ ref(page="expressions/tuple-expr.html") }} |
| `(S,)` | Single-element tuple type. |
| `[S]` | Array type of unspecified length, i.e., **slice**. {{ ex(page="primitives/array.html") }} {{ std(page="std/primitive.slice.html") }}   {{ ref(page="types.html#array-and-slice-types") }} Can't live on stack. {{ note( note="*") }} |
| `[S; n]` | **Array type** {{ ex(page="primitives/array.html") }}  {{ std(page="std/primitive.array.html") }} of fixed length `n` holding elements of type `S`. |
| `[x; n]` | Array instance with `n` copies of `x`. {{ ref(page="expressions/array-expr.html") }} |
| `[x, y]` | Array instance with given elements `x` and `y`. |
| `x[0]` | Collection indexing. Overloadable [Index](https://doc.rust-lang.org/std/ops/trait.Index.html), [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html) |
| `x[..]` | Collection slice-like indexing via [RangeFull](https://doc.rust-lang.org/std/ops/struct.RangeFull.html), _c_. slices.  |
| `x[a..]` | Collection slice-like indexing via [RangeFrom](https://doc.rust-lang.org/std/ops/struct.RangeFrom.html). |
| `x[..b]` | Collection slice-like indexing [RangeTo](https://doc.rust-lang.org/std/ops/struct.RangeTo.html). |
| `x[a..b]` | Collection slice-like indexing via [Range](https://doc.rust-lang.org/std/ops/struct.Range.html). |
| `a..b` | Right-exclusive **range** {{ ref(page="expressions/range-expr.html") }} creation, also seen as `..b`.  |
| `a..=b` | Inclusive range creation, also seen as `..=b`. |
| `s.x` | Named **field access**, {{ ref(page="expressions/field-expr.html") }} might try to [Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html) if `x` not part of type `S`. |
| `s.0` | Numbered field access, used for tuple types `S` &#8203;`(T)`. |

</fixed-2-column>

<footnotes>

<sup>*</sup> For now,{{ rfc( page ="1909-unsized-rvalues.html") }} pending completion of [tracking issue](https://github.com/rust-lang/rust/issues/48055).

</footnotes>


### References & Pointers

Granting access to un-owned memory. Also see section on Generics & Constraints.


<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `&S` | Shared **reference** {{ book(page="ch04-02-references-and-borrowing.html") }} {{ std(page="std/primitive.reference.html") }} {{ nom(page="references.html")}} {{ ref(page="types.html#pointer-types")}} (space for holding _any_ `&s`). |
| {{ tab() }} `&[S]` | Special slice reference that contains (`address`, `length`). |
| {{ tab() }} `&str` | Special string reference that contains (`address`, `length`). |
| {{ tab() }} `&mut S` | Exclusive reference to allow mutability (also `&mut [S]`, `&mut dyn S`, ...) |
| {{ tab() }} `&dyn T` | Special **trait object** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} reference that contains (`address`, `vtable`). |
| `*const S` | Immutable **raw pointer type** {{ book(page="ch19-01-unsafe-rust.html#dereferencing-a-raw-pointer") }} {{ std(page="std/primitive.pointer.html") }} {{ ref(page="types.html#raw-pointers-const-and-mut") }} w/o memory safety. |
| `*mut S` | Mutable raw pointer type w/o memory safety. |
| `&s` | Shared **borrow** {{ book(page="ch04-02-references-and-borrowing.html") }} {{ ex(page="scope/borrow.html") }} {{ std(page="std/borrow/trait.Borrow.html") }} (e.g., address, len, vtable, ... of _this_ `s`, like `0x1234`). |
| `&mut s` | Exclusive borrow that allows **mutability**. {{ ex(page="scope/borrow/mut.html") }} |
| `ref s` | **Bind by reference**. {{ ex(page="scope/borrow/ref.html") }} {{ deprecated() }}|
| {{ tab() }} `let ref r = s;` | Equivalent to `let r = &s`. |
| {{ tab() }} `let S { ref mut x } = s;` | Mutable ref binding (`let x = &mut s.x`), shorthand destructuring {{ below( target = "#pattern-matching") }} version. |
| `*r` | **Dereference** {{ book(page="ch15-02-deref.html") }} {{ std(page="std/ops/trait.Deref.html") }} {{ nom(page="vec-deref.html") }} a reference `r` to access what it points to. |
| {{ tab() }} `*r = s;` | If `r` is a mutable reference, move or copy `s` to target memory. |
| {{ tab() }} `s = *r;` | Make `s` a copy of whatever `r` references, if that is `Copy`. |
| {{ tab() }} `s = *my_box;` | [Special case](https://www.reddit.com/r/rust/comments/b4so6i/what_is_exactly/ej8xwg8/) for `Box` that can also move out Box'ed content if it isn't `Copy`. |
| `'a`  | A **lifetime parameter**, {{ book(page="ch10-00-generics.html") }} {{ ex(page="scope/lifetime.html")}} {{ nom(page="lifetimes.html") }} {{ ref(page="items/generics.html#type-and-lifetime-parameters")}}, duration of a flow in static analysis. |
| {{ tab() }}  `&'a S`  | Only accepts a `s` with an address that lives `'a` or longer. |
| {{ tab() }}  `&'a mut S`  | Same, but allow content of address to be changed. |
| {{ tab() }}  `struct S<'a> {}`  | Signals `S` will contain address with lifetime `'a`. Creator of `S` decides `'a`. |
| {{ tab() }} `trait T<'a> {}` | Signals a `S` which `impl T for S` might contain address. |
| {{ tab() }}  `fn f<'a>(t: &'a T)`  | Same, for function. Caller decides `'a`. |
| `'static`  | Special lifetime lasting the entire program execution. |

</fixed-2-column>




###  Functions & Behavior

Define units of code and their abstractions.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `trait T {}`  | Define a **trait**; {{ book(page="ch10-02-traits.html") }} {{ ex(page="trait.html") }} {{ ref(page="items/traits.html") }} common behavior others can implement. |
| `trait T : R {}` | `T` is subtrait of **supertrait** {{ ref(page="items/traits.html#supertraits") }} `R`. Any `S` must `impl R` before it can `impl T`. |
| `impl S {}`  | **Implementation** {{ ref(page="items/implementations.html") }} of functionality for a type `S`, e.g., methods. |
| `impl T for S {}`  | Implement trait `T` for type `S`. |
| `impl !T for S {}` | Disable an automatically derived **auto trait** {{ nom(page="send-and-sync.html") }} {{ ref(page="special-types-and-traits.html#auto-traits") }}. |
| `fn f() {}`  | Definition of a **function**; {{ book(page="ch03-03-how-functions-work.html") }}  {{ ex(page="fn.html") }} {{ ref(page="items/functions.html") }} or associated function if inside `impl`. |
| {{ tab() }} `fn f() -> S {}`  | Same, returning a value of type S. |
| {{ tab() }} `fn f(&self) {}`  | Define a **method**, {{ book(page="ch05-03-method-syntax.html") }}  {{ ex(page="fn/methods.html") }} e.g., within an `impl S {}`. |
| `const fn f() {}`  | Constant `fn` usable at compile time, e.g., `const X: u32 = f(Y)`. {{ edition(ed="'18") }}|
| `async fn f() {}`  | **Async**  {{ ref(page="items/functions.html#async-functions") }} {{ edition(ed="'18") }} function transformation, makes `f` return an `impl` **`Future`**. {{ std(page="std/future/trait.Future.html") }} |
| {{ tab() }} `async fn f() -> S {}`  | Same, but make `f` return an `impl Future<Output=S>`. |
| {{ tab() }} `async { x }`  | Used within a function, make `{ x }` an `impl Future<Output=X>`. |
| `fn() -> S`  | **Function pointers**, {{ book(page="ch19-05-advanced-functions-and-closures.html#function-pointers") }} {{ std(page="std/primitive.fn.html") }} {{ ref(page="types.html#function-pointer-types") }}, memory holding address of a callable. |
| `Fn() -> S`  | **Callable Trait**, {{ book(page="ch19-05-advanced-functions-and-closures.html#returning-closures") }} {{ std(page="std/ops/trait.Fn.html") }} (also `FnMut`, `FnOnce`), implemented by closures, fn's ... |
| <code>&vert;&vert; {} </code> | A **closure** {{ book(page="ch13-01-closures.html") }} {{ ex(page="fn/closures.html") }} {{ ref(page="expressions/closure-expr.html")}} that borrows its **captures**. {{ ref(page="types/closure.html#capture-modes") }} |
| {{ tab() }} <code>&vert;x&vert; {}</code> | Closure with a bound parameter `x`. |
| {{ tab() }} <code>&vert;x&vert; x + x</code> | Closure without block expression; may only consist of single expression.  |
| {{ tab() }} <code>move &vert;x&vert; x + y </code> | Closure taking ownership of its captures. |
| {{ tab() }} <code> return &vert;&vert; true </code> | Closures sometimes look like logical ORs (here: return a closure). |
| `unsafe` | If you enjoy debugging segfaults Friday night; **unsafe code**. {{ below(target="#unsafe-unsound-undefined") }} {{ book(page="ch19-01-unsafe-rust.html#unsafe-superpowers") }} {{ ex(page="unsafe.html#unsafe-operations") }} {{ nom(page="meet-safe-and-unsafe.html") }} {{ ref(page="unsafe-blocks.html#unsafe-blocks") }} |
| {{ tab() }} `unsafe f() {}` | Sort-of means "_can cause UB, {{ below(target="#unsafe-unsound-undefined") }} **YOU must check** requirements_". |
| {{ tab() }} `unsafe {}` | Guarantees to compiler "_**I have checked** requirements, trust me_".  |

</fixed-2-column>


### Control Flow

Control execution within a function.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `while x {}`  | **Loop** {{ ref(page="expressions/loop-expr.html#predicate-loops") }}, run while expression `x` is true. |
| `loop {}`  | **Loop infinitely** {{ ref(page="expressions/loop-expr.html#infinite-loops") }} until `break`. Can yield value with `break x`. |
| `for x in iter {}` | Syntactic sugar to loop over **iterators**. {{ book(page="ch13-02-iterators.html") }} {{ std(page="std/iter/index.html") }} {{ ref(page="expressions/loop-expr.html#iterator-loops") }} |
| `if x {} else {}`  | **Conditional branch** {{ ref(page="expressions/if-expr.html") }} if expression is true. |
| `'label: loop {}` | **Loop label** {{ ex(page="flow_control/loop/nested.html") }} {{ ref(page="expressions/loop-expr.html#loop-labels")}}, useful for flow control in nested loops. |
| `break`  | **Break expression** {{ ref(page="expressions/loop-expr.html#break-expressions") }} to exit a loop. |
| {{ tab() }} `break x`  | Same, but make `x` value of the loop expression (only in actual `loop`). |
| {{ tab() }} `break 'label`  | Exit not only this loop, but the enclosing one marked with `'label`. |
| `continue `  | **Continue expression** {{ ref(page="expressions/loop-expr.html#continue-expressions") }} to the next loop iteration of this loop. |
| `continue 'label`  | Same, but instead of enclosing loop marked with `'label`. |
| `x?` | If `x` is [Err](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err) or [None](https://doc.rust-lang.org/std/option/enum.Option.html#variant.None), **return and propagate**. {{ book(page="ch09-02-recoverable-errors-with-result.html#propagating-errors") }} {{ ex(page="error/result/enter_question_mark.html") }} {{ std(page="std/result/index.html#the-question-mark-operator-") }} {{ ref(page="expressions/operator-expr.html#the-question-mark-operator")}} |
| `x.await` | Only works inside `async`. Yield flow until **`Future`** {{ std(page="std/future/trait.Future.html") }} or Stream `x` ready. {{ ref(page="expressions/await-expr.html#await-expressions") }} {{ edition(ed="'18") }} |
| `return x`  | Early return from function. More idiomatic way is to end with expression. |
| `f()` | Invoke callable `f` (e.g., a function, closure, function pointer, `Fn`, ...). |
| `x.f()` | Call member function, requires `f` takes `self`, `&self`, ... as first argument. |
| {{ tab() }} `X::f(x)` | Same as `x.f()`. Unless `impl Copy for X {}`, `f` can only be called once. |
| {{ tab() }} `X::f(&x)` | Same as `x.f()`. |
| {{ tab() }} `X::f(&mut x)` | Same as `x.f()`. |
| {{ tab() }} `S::f(&x)` | Same as `x.f()` if `X` [derefs](https://doc.rust-lang.org/std/ops/trait.Deref.html) to `S`, i.e., `x.f()` finds methods of `S`. |
| {{ tab() }} `T::f(&x)` | Same as `x.f()` if `X impl T`, i.e., `x.f()` finds methods of `T` if in scope. |
| `X::f()` | Call associated function, e.g., `X::new()`. |
| {{ tab() }} `<X as T>::f()` | Call trait method `T::f()` implemented for `X`. |

</fixed-2-column>



### Organizing Code

Segment projects into smaller units and minimize dependencies.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `mod m {}`  | Define a **module**, {{ book(page="ch07-02-defining-modules-to-control-scope-and-privacy.html") }} {{ ex(page="mod.html#modules") }} {{ ref(page="items/modules.html#modules") }} get definition from inside `{}`. {{ below(target="#project-anatomy") }} |
| `mod m;`  | Define a module, get definition from `m.rs` or `m/mod.rs`. {{ below(target="#project-anatomy") }}|
| `a::b` | Namespace **path** {{ ex(page="mod/use.html") }} {{ ref(page="paths.html")}} to element `b` within `a` (`mod`, `enum`, ...). |
| {{ tab() }} `::b` | Search `b` relative to crate root. {{ deprecated() }} |
| {{ tab() }} `crate::b` | Search `b` relative to crate root. {{ edition(ed="'18") }} |
| {{ tab() }} `self::b`  | Search `b` relative to current module. |
| {{ tab() }} `super::b`  | Search `b` relative to parent module. |
| `use a::b;`  | **Use** {{ ex(page="mod/use.html#the-use-declaration") }} {{ ref(page="items/use-declarations.html") }}  `b` directly in this scope without requiring `a` anymore. |
| `use a::{b, c};` | Same, but bring `b` and `c` into scope. |
| `use a::b as x;`  | Bring `b` into scope but name `x`, like `use std::error::Error as E`. |
| `use a::b as _;`  | Bring `b` anonymously into scope, useful for traits with conflicting names. |
| `use a::*;`  | Bring everything from `a` into scope. |
| `pub use a::b;`  | Bring `a::b` into scope and reexport from here. |
| `pub T`  | "Public if parent path is public" **visibility** {{ book(page="ch07-02-defining-modules-to-control-scope-and-privacy.html") }} for `T`. |
| {{ tab() }} `pub(crate) T` | Visible at most in current crate. |
| {{ tab() }} `pub(self) T`  | Visible at most in current module. |
| {{ tab() }} `pub(super) T`  | Visible at most in parent. |
| {{ tab() }} `pub(in a::b) T`  | Visible at most in `a::b`. |
| `extern crate a;` | Declare dependency on external **crate** {{ book(page="ch02-00-guessing-game-tutorial.html#using-a-crate-to-get-more-functionality") }} {{ ex(page="crates/link.html#extern-crate") }} {{ ref(page="items/extern-crates.html#extern-crate-declarations") }} {{ deprecated() }} ; just `use a::b` in {{ edition(ed="'18") }}.  |
| `extern "C" {}`  | _Declare_ external dependencies and ABI (e.g., `"C"`) from **FFI**. {{ book(page="ch19-01-unsafe-rust.html#using-extern-functions-to-call-external-code") }} {{ ex(page="std_misc/ffi.html#foreign-function-interface") }} {{ nom(page="ffi.html#calling-foreign-functions") }} {{ ref(page="items/external-blocks.html#external-blocks") }} |
| `extern "C" fn f() {}`  | _Define_ function to be exported with ABI (e.g., `"C"`) to FFI. |

</fixed-2-column>



### Type Aliases and Casts

Short-hand names of types, and methods to convert one type to another.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `type T = S;`  | Create a **type alias** {{ book(page="ch19-04-advanced-types.html#creating-type-synonyms-with-type-aliases") }} {{ ref(page="items/type-aliases.html#type-aliases") }}, i.e., another name for `S`. |
| `Self`  | Type alias for **implementing type** {{ ref(page="types.html#self-types") }}, e.g. `fn new() -> Self`. |
| `self`  | Method subject in `fn f(self) {}`, same as `fn f(self: Self) {}`. |
|  {{ tab() }}  `&self`  | Same, but refers to self as borrowed, same as `f(self: &Self)`|
|  {{ tab() }}  `&mut self`  | Same, but mutably borrowed, same as `f(self: &mut Self)` |
|  {{ tab() }}  `self: Box<Self>`  | [Arbitrary self type](https://github.com/withoutboats/rfcs/blob/arbitray-receivers/text/0000-century-of-the-self-type.md), add methods to smart pointers (`my_box.f_of_self()`). |
| `S as T`  | **Disambiguate** {{ book(page="ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name") }} {{ ref(page="expressions/call-expr.html#disambiguating-function-calls") }} type `S` as trait `T`, e.g., `<S as T>::f()`. |
| `S as R`  | In `use` of symbol, import `S` as `R`, e.g., `use a::S as R`. |
| `x as u32`  | Primitive **cast** {{ ex(page="types/cast.html#casting") }} {{ ref(page="expressions/operator-expr.html#type-cast-expressions") }}, may truncate and be a bit surprising. {{ nom(page="casts.html") }} |

</fixed-2-column>



### Macros & Attributes

Code generation constructs expanded before the actual compilation happens.

<fixed-2-column>

| Example |  Explanation |
|---------|---------|
| `m!()` |  **Macro** {{book(page="ch19-06-macros.html")}} {{std(page="std/index.html#macros")}} {{ref(page="macros.html")}} invocation, also `m!{}`, `m![]` (depending on macro). |
| `#[attr]`  | Outer **attribute**. {{ex(page="attribute.html")}} {{ref(page="attributes.html")}}, annotating the following item. |
| `#![attr]` | Inner attribute, annotating the surrounding item. |

{{ tablesep() }}

</fixed-2-column>


<fixed-2-column class="color-header macro_rules">

Inside a **declarative** {{ book(page="ch19-06-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming") }} **macro by example** {{book(page="ch19-06-macros.html")}} {{ex(page="macros.html#macro_rules")}} {{ref(page="macros-by-example.html")}} `macro_rules!` implementation these work:

| Within Macros |  Explanation |
|---------|---------|
| `$x:ty`  | Macro capture, with the `ty` part being: |
| {{ tab() }} `$x:item`    | An item, like a function, struct, module, etc. |
| {{ tab() }} `$x:block`   | A block `{}` of statements or expressions, e.g., `{ let x = 5; }` |
| {{ tab() }} `$x:stmt`    | A statement, e.g., `let x = 1 + 1;`, `String::new();` or `vec![];` |
| {{ tab() }} `$x:expr`    | An expression, e.g., `x`, `1 + 1`, `String::new()` or `vec![]` |
| {{ tab() }} `$x:pat`     | A pattern, e.g., `Some(t)`, `(17, 'a')` or `_`. |
| {{ tab() }} `$x:ty`      | A type, e.g., `String`, `usize` or `Vec<u8>`. |
| {{ tab() }} `$x:ident`   | An identifier, for example in `let x = 0;` the identifier is `x`. |
| {{ tab() }} `$x:path`    | A path (e.g. `foo`, `::std::mem::replace`, `transmute::<_, int>`, …). |
| {{ tab() }} `$x:literal` | A literal (e.g. `3`, `"foo"`, `b"bar"`, etc.). |
| {{ tab() }} `$x:lifetime` | A lifetime (e.g. `'a`, `'static`, etc.). |
| {{ tab() }} `$x:meta`    | A meta item; the things that go inside `#[...]` and `#![...]` attributes. |
| {{ tab() }} `$x:vis`    | A visibility modifier;  `pub`, `pub(crate)`, etc. |
| {{ tab() }} `$x:tt`      | A single token tree, [see here](https://stackoverflow.com/a/40303308) for more details. |
| `$x` |  Macro substitution, e.g., use the captured `$x:ty` from above. |
| `$(x),*` | Macro repetition "zero or more times" in macros by example. |
| {{ tab() }} `$(x),?` | Same, but "zero or one time". |
| {{ tab() }} `$(x),+` | Same, but "one or more times". |
| {{ tab() }} `$(x)<<+` | In fact separators other than `,` are also accepted. Here: `<<`. |
| `$crate` | Special hygiene variable, crate where macros is defined. {{ todo() }} |

</fixed-2-column>

{{ tablesep() }}



### Pattern Matching

Constructs found in `match` or `let` expressions, or function parameters.


<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `match m {}` | Initiate **pattern matching** {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }}, then use match arms, _c_. next table. |
| `let S(x) = get();`  | Notably, `let` also **destructures** {{ ex(page="flow_control/match/destructuring.html") }} similar to the table below. |
|  {{ tab() }} `let S { x } = s;` | Only `x` will be bound to value `s.x`. |
|  {{ tab() }} `let (_, b, _) = abc;` | Only `b` will be bound to value `abc.1`. |
|  {{ tab() }} `let (a, ..) = abc;` | Ignoring 'the rest' also works. |
|  {{ tab() }} `let (.., a, b) = (1, 2);` | Specific bindings take precedence over 'the rest', here `a` is `1`, `b` is `2`. |
|  {{ tab() }} `let Some(x) = get();` | **Won't** work {{ bad() }} if pattern can be **refuted** {{ ref(page="expressions/if-expr.html#if-let-expressions") }}, use `if let` instead. |
| `if let Some(x) = get() {}`  | Branch if pattern can be assigned (e.g., `enum` variant), syntactic sugar. <sup>*</sup>|
| `fn f(S { x }: S)`  | Function parameters also work like `let`, here `x` bound to `s.x` of `f(s)`.|

</fixed-2-column>


<footnotes>

<sup>*</sup> Desugars to `match get() { Some(x) => {}, _ => () }`.

</footnotes>



{{ tablesep() }}

Pattern matching arms in `match` expressions. Left side of these arms can also be found in `let` expressions.

<fixed-2-column>

| Match Arm | Explanation |
|---------|-------------|
|  `E::A => {}` | Match enum variant `A`, _c_. **pattern matching**. {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }} |
|  `E::B ( .. ) => {}` | Match enum tuple variant `B`, wildcard any index. |
|  `E::C { .. } => {}` | Match enum struct variant `C`, wildcard any field. |
|  `S { x: 0, y: 1 } => {}` | Match struct with specific values (only accepts `s` with `s.x` of `0` and `s.y` of `1`). |
|  `S { x: a, y: b } => {}` | Match struct with _any_(!) values and bind `s.x` to `a` and `s.y` to `b`. |
|  {{ tab() }} `S { x, y } => {}` | Same, but shorthand with `s.x` and `s.y` bound as `x` and `y` respectively. |
|  `S { .. } => {}` | Match struct with any values. |
|  `D => {}` | Match enum variant `E::D` if `D` in `use`. |
|  `D => {}` | Match anything, bind `D`; possibly false friend {{ bad() }} of `E::D` if `D` not in `use`. |
|  `_ => {}` | Proper wildcard that matches anything / "all the rest". |
|  `(a, 0) => {}` | Match tuple with any value for `a` and `0` for second. |
|  `[a, 0] => {}` | **Slice pattern**, {{ ref(page="patterns.html#slice-patterns") }} {{ link(url="https://doc.rust-lang.org/edition-guide/rust-2018/slice-patterns.html") }} match array with any value for `a` and `0` for second. |
|  {{ tab() }} `[1, ..] => {}` | Match array starting with `1`, any value for rest; **subslice pattern**.  {{ todo() }} |
|  {{ tab() }} `[2, .., 5] => {}` | Match array starting with `1`, ending with `5`. |
|  {{ tab() }} `[2, x @ .., 5] => {}` | Same, but also bind `x` to slice representing middle (_c._ next entry).  |
| `x @ 1..=5 => {}` | Bind matched to `x`; **pattern binding**, {{ book(page="ch18-03-pattern-syntax.html#-bindings") }} {{ ex(page="flow_control/match/binding.html#binding") }} {{ ref(page="patterns.html#identifier-patterns") }} here `x` would be `1`, `2`, ... or `5`.  |
| <code>0 &vert; 1 => {}</code> | Pattern alternatives (or-patterns).|
| {{ tab() }}  <code>E::A &vert; E::Z </code> | Same, but on enum variants. |
| {{ tab() }}  <code>E::C {x} &vert; E::D {x}</code> | Same, but bind `x` if all variants have it. |
| `S { x } if x > 10 => {}`  | Pattern **match guards**, {{ book(page="ch18-03-pattern-syntax.html#extra-conditionals-with-match-guards")}} {{ ex(page="flow_control/match/guard.html#guards")}} {{ ref(page="expressions/match-expr.html#match-guards") }} condition must be true as well to match. |

</fixed-2-column>



<!-- This is more relevant for let D = ... cases, https://www.reddit.com/r/rust/comments/a1846o/rust_quiz_26_medium_to_hard_rust_questions_with/eaop291/ -->
<!-- |  `D => {}` | Match struct if `D` unit `struct D;`| -->



### Generics & Constraints

Generics combine with many other constructs such as `struct S<T>`, `fn f<T>()`, ...

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `S<T>`  | A **generic** {{ book(page="ch10-01-syntax.html") }} {{ ex(page="generics.html") }} type with a type parameter (`T` is placeholder name here). |
| `S<T: R>`  | Type short hand **trait bound** {{ book(page="ch10-02-traits.html#using-trait-bounds-to-conditionally-implement-methods") }} {{ ex(page="generics/bounds.html") }} specification  (`R` _must_ be actual trait). |
| {{ tab() }} `T: R, P: S`  | **Independent trait bounds** (here one for `T` and one for `P`). |
| {{ tab() }} `T: R, S`  | Compile error, {{ bad() }} you probably want compound bound `R + S` below. |
| {{ tab() }} `T: R + S`  | **Compound trait bound** {{ book(page="ch10-02-traits.html#specifying-multiple-trait-bounds-with-the--syntax") }} {{ ex(page="generics/multi_bounds.html") }}, `T` must fulfill `R` and `S`. |
| {{ tab() }} `T: R + 'a`  | Same, but w. lifetime. `T` must fulfill `R`, if `T` has lifetimes, must outlive `'a`. |
| {{ tab() }} `T: ?Sized` | Opt out of a pre-defined trait bound, here `Sized`. {{ todo() }} |
| {{ tab() }} `T: 'a` | Type **lifetime bound** {{ ex(page="scope/lifetime/lifetime_bounds.html") }}; if T has references, they must outlive `'a`.  |
| {{ tab() }} `T: 'static` | Same; does esp. _not_ mean value `t` _will_ {{ bad() }} live `'static`, only that it could. |
| {{ tab() }} `'b: 'a` | Lifetime `'b` must live at least as long as (i.e., _outlive_) `'a` bound. |
| `S<T> where T: R`  | Same as `S<T: R>` but more pleasant to read for longer bounds. |
| `S<T = R>` | **Default type parameter** {{ book(page="ch19-03-advanced-traits.html#default-generic-type-parameters-and-operator-overloading") }} for associated type.|
| `S<'_>` | Inferred **anonymous lifetime**; asks compiler to _'figure it out'_ if obvious.  |
| `S<_>` | Inferred **anonymous type**, e.g., as `let x: Vec<_> = iter.collect()`  |
| `S::<T>` | **Turbofish** {{ std(page="std/iter/trait.Iterator.html#method.collect")}} call site type disambiguation, e.g. `f::<u32>()`. |
| `trait T<X> {}`  | A trait generic over `X`. Can have multiple `impl T for S` (one per `X`). |
| `trait T { type X; }`  | Defines **associated type** {{ book(page="ch19-03-advanced-traits.html#specifying-placeholder-types-in-trait-definitions-with-associated-types") }} {{ ref(page="items/associated-items.html#associated-types") }} `X`. Only one `impl T for S` possible. |
| {{ tab() }} `type X = R;`  | Set associated type within `impl T for S { type X = R; }`. |
| `impl<T> S<T> {}`  | Implement functionality for any `T` in `S<T>`.  |
| `impl S<T> {}`  | Implement functionality for exactly `S<T>` (e.g., `S<u32>`).  |
| `fn f() -> impl T`  | **Existential types** {{ book(page="ch10-02-traits.html#returning-types-that-implement-traits") }}, returns an unknown-to-caller `S` that `impl T`. |
| `fn f(x: &impl T)`  | Trait bound,"**impl traits**" {{ book(page="ch10-02-traits.html#trait-bound-syntax") }}, somewhat similar to `fn f<S:T>(x: &S)`. |
| `fn f(x: &dyn T)`  | Marker for **dynamic dispatch** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} {{ ref(page="types.html#trait-objects") }}, `f` will not be monomorphized. |
| `fn f() where Self: R;`  | In `trait T {}`, make `f` accessible only on types known to also `impl R`.  |
| {{ tab() }} `fn f() where Self: R {}  `  | Esp. useful w. default methods (non dflt. would need be impl'ed anyway). |
| `for<'a>` | **Higher-ranked trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |
| {{ tab() }} `trait T: for<'a> R<'a> {}` | Any `S` that `impl T` would also have to fulfill `R` for any lifetime. |

</fixed-2-column>



### Strings & Chars

Rust has several ways to create textual values.


<fixed-2-column>

| Example | Explanation |
|--------|-------------|
| `"..."` | **String literal**, {{ ref(page="tokens.html#string-literals")}} UTF-8, will interpret `\n` as _line break_ `0xA`, ... |
| `r"..."` | **Raw string literal**. {{ ref(page="tokens.html#raw-string-literals")}} UTF-8, won't interpret `\n`, ... |
| `r#"..."#` | Raw string literal, UTF-8, but can also contain `"`. Number of `#` can vary. |
| `b"..."` | **Byte string literal**; {{ ref(page="tokens.html#byte-and-byte-string-literals")}} constructs ASCII `[u8]`, not a string. |
| `br"..."`, `br#"..."#` | Raw byte string literal, ASCII `[u8]`, combination of the above. |
| `'🦀'` | **Character literal**, {{ ref(page="tokens.html#character-and-string-literals")}} fixed 4 byte unicode '**char**'. {{ std(page="std/primitive.char.html") }} |
| `b'x'` | ASCII **byte literal**. {{ ref(page="tokens.html#byte-literals")}} |

</fixed-2-column>


### Comments

No comment.

<fixed-2-column>

| Example | Explanation |
|--------|-------------|
| `//` | Line comment, use these to document code flow or _internals_. |
| `///` | Outer line **doc comment**, {{ book(page="ch14-02-publishing-to-crates-io.html#making-useful-documentation-comments") }} {{ ex(page="meta/doc.html#documentation") }} {{ ref(page="comments.html#doc-comments")}} use these on types. |
| `//!` | Inner line doc comment, mostly used at start of file to document module. |
| `/*...*/` | Block comment. |
| `/**...*/` | Outer block doc comment. |
| `/*!...*/` | Inner block doc comment. |
| ` ```rust ... ``` ` | In doc comments, include a [doc test](https://doc.rust-lang.org/rustdoc/documentation-tests.html) (doc code running on `cargo test`). |
| `#` | In doc tests, hide line from documentation (` ```   # use x::hidden; ``` `). |

</fixed-2-column>


### Miscellaneous

These sigils did not fit any other category but are good to know nonetheless.

<fixed-2-column>

| Example | Explanation |
|---------|-------------|
| `!` | Always empty **never type**. {{ experimental() }} {{ book(page="ch19-04-advanced-types.html#the-never-type-that-never-returns") }} {{ ex(page="fn/diverging.html#diverging-functions") }} {{ std(page="std/primitive.never.html") }} {{ ref(page="types.html#never-type") }} |
| `_` | Unnamed variable binding, e.g., <code>&vert;x, _&vert; {}</code>.|
| {{ tab() }} `let _ = x;`  | Unnamed assignment is no-op, does **not** {{ bad() }} move out `x` or preserve scope! |
| `_x` | Variable binding explicitly marked as unused. |
| `1_234_567` | Numeric separator for visual clarity. |
| `1_u8` | Type specifier for **numeric literals** {{ ex(page="types/literals.html#literals") }} {{ ref(page="tokens.html#number-literals") }}  (also `i8`, `u16`, ...). |
| `0xBEEF`, `0o777`, `0b1001`  | Hexadecimal (`0x`), octal (`0o`) and binary (`0b`) integer literals. |
| `r#foo` | A **raw identifier** {{ book(page="appendix-01-keywords.html#raw-identifiers") }} {{ ex(page="compatibility/raw_identifiers.html#raw-identifiers") }} for edition compatibility. |
| `x;` | **Statement** {{ ref(page="statements.html")}} terminator, _c_. **expressions** {{ ex(page="expression.html") }} {{ ref(page="expressions.html")}} |

</fixed-2-column>




### Common Operators

Rust supports most operators you would expect (`+`, `*`, `%`, `=`, `==`...), including **overloading**. {{ std(page="std/ops/index.html")}} Since they behave no differently in Rust we do not list them here.


---

<magic>

# Behind the Scenes

<noprint>

<!-- Legacy target some pages use to link here -->
<a name="reading-lifetimes"></a>

## Memory & Lifetimes


Why moves, references and lifetimes are how they are.


> 🔥 This section is brand new, feedback very welcome! 🔥

<tabs class="lifetimes">

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-lt-1" name="tab-lt" checked>
<label for="tab-lt-1"><b>Types & Moves</b></label>
<panel>
<div>


<lifetime-section>
<lifetime-example>
    <section-header>Application Memory</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 57px;">S(1)</value>
        </values>
        <labels>
            <label class="" style="right: 10px;">&nbsp;</label>
        </labels>
        <subtext>Application Memory</subtext>
    </memory-row>
</lifetime-example>
<explanation>

- Application memory in itself is just array of bytes.
- It is segmented, amongst others, into:
    - **stack** (small, low-overhead memory,<sup>1</sup> most _variables_ go here),
    - **heap** (large, flexible memory, but always handled via stack proxy like `Box<T>`),
    - **static** (most commonly used as resting place for `str` part of `&str`),
    - **code** (where bitcode of your functions reside).
- Programming languages such as Rust give developers tools to:
    - define what data goes into what segment,
    - express a desire for bitcode with specific properties to be produced,
    - protect themselves from errors while performing these operations.
- Most tricky part is tied to **how stack evolves**, which is **our focus**.

<footnotes>

<sup>1</sup> While for each part of the heap someone (the allocator) needs to perform bookkeeping at runtime, the stack is trivially managable: _take a few bytes more while you need them, they will be discarded once you leave_. The (for performance reasons desired) simplicity of this appraoch, along with the fact that you can tell others about such _transient_ locations (which in turn might want to access them long after you left), form the very essence of why _lifetimes_ exist; and are the subject of the rest of this chapter.

</footnotes>

</explanation>
</lifetime-section>



<lifetime-section>
<lifetime-example class="not-first">
    <section-header>Variables</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 57px;">S(1)</value>
            <value class="t byte2" style="left: 97.5px;">S(1)</value>
        </values>
        <labels>
            <label class="byte2 hide" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>t</code></label>
        </labels>
        <subtext>Variables</subtext>
        <!-- <subtext><code>let t = S(1);</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let t = S(1);
```

- Reserves memory location with name `t` of type `S` and the value `S(1)` stored inside.
- If declared with `let` that location lives on stack. <sup>1</sup>
- Note that the term **_variable_** has some **linguistic ambiguity**,<sup>2</sup> it can mean:
    1. the **name** of the location ("rename that variable"),
    1. the **location** itself, `0x7` ("tell me the address of that variable"),
    1. the **value** contained within, `S(1)` ("increment that variable").
- Specifically towards the compiler `t` can mean **location of** `t`, here `0x7`, and **value within** `t`, here `S(1)`.

<footnotes>

<sup>1</sup> Compare above,{{ above(target="#data-structures" ) }} true for fully synchronous code, but `async` stack frame might placed it on heap via runtime.

</footnotes>

> <sup>2</sup> It is the **author's opinion** that this ambiguity related to _variables_ (and _lifetimes_ and _scope_ later)
> are some of the biggest
> contributors to the confusion around learning the basics of lifetimes. Whenever you hear one of these terms ask yourself "what _exactly_ is meant here?"


</explanation>
</lifetime-section>


<lifetime-section>
<lifetime-example class="not-first">
    <section-header>Move Semantics</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 57px;">S(1)</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>t</code></label>
        </labels>
        <subtext>Moves</subtext>
        <!-- <subtext><code>let a = t;</code></subtext> -->
    </memory-row>
</lifetime-example>

<explanation>

```
let a = t;
```

- This will **move** value within `t` to location of `a`, or copy it, if `S` is `Copy`.
- After move location `t` is **invalid** and cannot be read anymore.
    - Technically the bits at that location are not really _empty_, but _undefined_.
    - If you still had access to `t` (via `unsafe`) they might still _look_ like valid `S`, but
    any attempt to use them as valid `S` is undefined behavior. {{ below(target="#unsafe-unsound-undefined") }}
- We do not cover `Copy` types explicitly here. They change the rules a bit, but not much:
    - They won't be dropped
    - They never leave behind an 'empty' variable location.

</explanation>
</lifetime-section>



<lifetime-section>
<lifetime-example class="not-first">
    <section-header>Type Safety</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 57px;">S(1)</value>
            <failed style="left: 177.5px;"><value class="atomic byte4">M { ... }</value></failed>
            <denied style="left: 108px;">⛔</denied>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 170px;"><code>c</code></label>
        </labels>
        <subtext>Type Safety</subtext>
        <!-- <subtext><code>let c: S = M::new();</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>


```
let c: S = M::new();
```

- The **type of a variable** serves multiple important purposes, it:
    1. dictates how the underlying bits are to be interpreted,
    1. allows only well-defined operations on these bits
    1. prevents random other values or bits from being written to that location.
- Here assignment fails to compile since the bytes of `M::new()` cannot be converted to form of type `S`.
- **Conversions between types will _always_ fail** in general, **unless explicit rule allows it** (coercion, cast, ...).

> As an excercise to the reader, any time you see a value of type A being assignable to a location of some type not-exactly-A you should ask yourself: _through what mechanism is this possible_?

</explanation>
</lifetime-section>


<lifetime-section>
<lifetime-example class="not-first">
    <section-header>Scope & Drop</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <drop><value class="t byte2" style="left: 57px;">S(1)</value><droparrow style="left:37px;">▼</droparrow></drop>
            <value class="t byte2 hide" style="left: 87.5px;">C(2)</value>
            <drop><value class="t byte2" style="left: 128px;">S(2)</value><droparrow style="left:107px;">▼</droparrow></drop>
            <failed style="left: -27.5px;"><value class="t byte2" style="left: 128px;">S(3)</value></failed>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>t</code></label>
            <label class="byte2" style="left: 136.5px;"><code>c</code></label>
        </labels>
        <subtext>Scope & Drop</subtext>
        <!-- <subtext><code>{ let a = ...; }</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
{
    let mut c = S(2);
    c = S(3);  // <- Drop called on `c` before assignment.
    let t = S(1);
    let a = t;
}   // <- Scope of `a`, `t`, `c` ends here, drop called on `a`, `c`.
```

- Once the 'name' of a non-vacated variable goes out of (drop-)**scope**, the contained value is **dropped**.
    - Rule of tumb: execution reaches point where name of variable leaves `{}`-block it was defined in
    - In detail more tricky, esp. temporaries, ...
- Drop also invoked when new value assigned to existing variable location.
- In that case **`Drop::drop()`** is called on the location of that value.
    - In the example above `drop()` is called on `a`, twice on `c`, but not on `t`.
- Most non-`Copy` values get dropped most of the time; exceptions include `mem::forget()`, `Rc` cycles, `abort()`.

</explanation>
</lifetime-section>


</div></panel></tab>



<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-lt-2" name="tab-lt">
<label for="tab-lt-2"><b>Call Stack</b></label>
<panel><div>

<lifetime-section>
<lifetime-example>
    <section-header>Stack Frame</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 57px;">S(1)</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>x</code></label>
        </labels>
        <subtext>Function Boundaries</subtext>
        <!-- <subtext><code>fn f(x: S) {}</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
fn f(x: S) { ... }

let a = S(1); // <- We are here
f(a);
```

- When a **function is called**, memory for parameters (and return values) are reserved on stack.<sup>1</sup>
- Here before `f` is invoked value in `a` is moved to 'agreed upon' location on stack, and during `f` works like 'local variable' `x`.

<footnotes>

<sup>1</sup> Actual location depends on calling convention, might practically not end up on stack at all, but that doesn't change mental model.

</footnotes>

</explanation>
</lifetime-section>


<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 131px;">S(1)</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>x</code></label>
            <label class="byte2" style="left: 136px;"><code>x</code></label>
        </labels>
        <subtext>Nested Functions</subtext>
        <!-- <subtext><code>fn f(x: S) { ... f(x) ... }</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
fn f(x: S) {
    if once() { f(x) } // <- We are here (before recursion)
}

let a = S(1);
f(a);
```

- **Recursively calling** functions, or calling other functions, likewise extends the stack frame.
- Nesting too many invocations (esp. via unbounded recursion) will cause stack to grow, and eventually to overflow, terminating the app.

</explanation>
</lifetime-section>


<lifetime-section>

<lifetime-example class="not-first">
    <section-header>Validity of Variables</section-header>
    <memory-row>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t" style="opacity: 0.4;"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 131px;">S(1)</value>
            <value class="atomic byte4" style="left: 190px;">M { }</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte2" style="left: 97.5px;"><code>x</code></label>
            <label class="byte2" style="left: 174px;"><code>m</code></label>
        </labels>
        <subtext>Repurposing Memory</subtext>
        <!-- <subtext><code>f(x); let m = M::new();</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
fn f(x: S) {
    if once() { f(x) }
    let m = M::new() // <- We are here (after recursion)
}

let a = S(1);
f(a);
```

- Stack that previously held a certain type will be repurposed across (even within) functions.
- Here, recursing on `f` produced second `x`, which after recursion was partially reused for `m`.

> Key take away so far, there are multiple ways how memory locations that previously held a valid value of a certain type stopped doing so in the meantime.
> As we will see shortly, this has implications for pointers.

</explanation>
</lifetime-section>

</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-lt-3" name="tab-lt">
<label for="tab-lt-3"><b>References & Pointers</b></label>
<panel><div>

<lifetime-section>
<lifetime-example>
    <section-header class="arrowed">Reference Types</section-header>
    <memory-row>
        <arrows>
            <arrow style="left: 62px; width: 176px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 57px;">S(1)</value>
            <value class="ptr byte4" style="left: 171px;">0x3</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte4" style="left: 171px;"><code>r</code></label>
        </labels>
        <subtext>References as Pointers</subtext>
        <!-- <subtext><code>let r = &mut a;</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let a = S(1);
let r: &S = &a;
```

- A **reference type** such as `&S` or `&mut S` can hold the **location of** some `s`.
- Here type `&S`, bound as name `r`, holds _location of_ variable `a` (`0x3`), that must be type `S`, obtained via `&a`.
- If you think of variable `c` as _specific location_, reference **`r` is a _switchboard for locations_**.
- The type of the reference, like all other types, can often be inferred, so we might omit it from now on:
    ```
    let r: &S = &a;
    let r = &a;
    ```
<!-- - References on their own are **never** concerned with the _value within_ the location they point to. -->

</explanation>
</lifetime-section>


<lifetime-section>
<lifetime-example class="not-first">
    <section-header class="arrowed">(Mutable) References</section-header>
    <memory-row>
        <arrows>
            <arrow style="left: 62px; width: 176px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 57px;">S(2)</value>
            <value class="ptr byte4" style="left: 171px;">0x3</value>
            <value class="t byte2" style="left: 213px;">S(1)</value>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte4" style="left: 171px;"><code>r</code></label>
            <label class="byte4" style="left: 193px;"><code>d</code></label>
        </labels>
        <subtext>Access to Non-Owned Memory</subtext>
        <!-- <subtext><code>let d = r.clone(); *r = S(2);</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let mut a = S(1);
let r = &mut a;
let d = r.clone();  // Valid to clone (or copy) from r-target.
*r = S(2);          // Valid to set new S value to r-target.
```


- References can **read from**  (`&S`) and also **write to** (`&mut S`) location they point to.
- The *dereference* `*r` means to neither use the _location of_ or _value within_ `r`, but the **location `r` points to**.
- In example above, clone `d` is created from `*r`, and `S(2)` written to `*r`.
    - Method `Clone::clone(&T)` expects a reference itself, which is why we can use `r`, not `*r`.
    - On assignment `*r = ...` old value in location also dropped (not shown above).

</explanation>
</lifetime-section>


<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <arrows>
            <arrow style="left: 62px; width: 176px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 57px;">S(2)</value>
            <value class="ptr byte4" style="left: 171px;">0x3</value>
            <value class="atomic byte4" style="top:-36px; left: 20px;">M { x }</value>
            <denied style="left: -71px; top:-36px;">⛔</denied>
            <denied style="left: -131px;">⛔</denied>
        </values>
        <labels>
            <label class="byte2" style="left: 57px;"><code>a</code></label>
            <label class="byte4" style="left: 171px;"><code>r</code></label>
            <label class="byte4" style="left: 193px;"><code>d</code></label>
        </labels>
        <subtext>References Guard Referents</subtext>
        <!-- <subtext><code>let d = *r; *r = M::new();</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let mut a = ...;
let r = &mut a;
let d = *r;       // Invalid to move out value, `a` would be empty.
*r = M::new();    // invalid to store non S value, doesn't make sense.
```

- While bindings guarantee to always _hold_ valid data, references guarantee to always _point to_ valid data.
- Esp. `&mut T` must provide same guarantees as variables, and some more as they can't dissolve the target:
    - They do **not allow writing invalid** data.
    - They do **not allow moving out** data (would leave target empty w/o owner knowing).

</explanation>
</lifetime-section>




<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <arrows>
            <arrow style="left: 62px; width: 176px; border-color: red;">&nbsp;<tip style="color: red">▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 57px;">C(2)</value>
            <value class="ptr byte4 unsafe" style="left: 171px;">0x3</value>
        </values>
        <labels>
            <label class="byte2 hide" style="left: 57px;"><code>c</code></label>
            <label class="byte4" style="left: 171px;"><code>p</code></label>
        </labels>
        <subtext>Raw Pointers</subtext>
        <!-- <subtext><code>let p: *const S = ...;</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let p: *const S = questionable_origin();
```

- In contrast to references, pointers come with almost no guarantees.
- They may point to invalid or non-existent data.
- Dereferencing them is `unsafe`, and treating an invalid `*p` as if it were valid is undefined behavior. {{ below(target="#unsafe-unsound-undefined") }}

</explanation>
</lifetime-section>

</div></panel></tab>




<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-lt-10" name="tab-lt">
<label for="tab-lt-10"><b>Lifetime Basics</b></label>
<panel><div>


<lifetime-section>
<lifetime-example>
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 57px;">C(2)</value>
            <value class="ptr byte4 hide" style="left: 171px;">0x3</value>
        </values>
        <labels>
            <!-- <label class="byte2" style="left: 37px;"><code>'a</code></label>
            <label class="byte4" style="left: 59px;"><code>'b: 'c</code></label>
            <label class="byte2" style="left: 81px;"><code>'c</code></label>
            <label class="byte4" style="left: 139px;"><code>'d</code></label> -->
        </labels>
        <subtext>"Lifetime" of Things</subtext>
        <!-- <subtext><code>f(); g(); h();</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

- Every entity in a program has some _time it is alive_.
- Loosely speaking, this _alive time_ can be<sup>1</sup>
    1. the **LOC** (lines of code) where an **item is available** (e.g., a module name).
    1. the **LOC** between when a _location_ is **initialized** with a value, and when the location is **abandoned**.
    1. the **LOC** between when a location is first **used in a certain way**, and when that **usage stops**.
    1. the **LOC (or actual time)** between when a _value_ is created, and when that value is dropped.
- Within the rest of this section, we will refer to the items above as the:
    1. **scope** of that item, irrelevant here.
    1. **scope** of that variable or location.
    1. **lifetime**<sup>2</sup> of that usage.
    1. **lifetime** of that value, might be useful when discussing open file descriptors, but also irrelevant here.
- Likewise, lifetime parameters in code, e.g., `r: &'a S`, are
    - concerned with LOC any **location r _points to_** needs to be accessible or locked;
    - unrelated to the 'existence time' (as LOC) of `r` itself (well, it needs to exist shorter, that's it).
- `&'static S` means address must be _valid during all lines of code_.

> <sup>1</sup> There is sometimes ambiguity in the docs differentiating the various _scopes_ and _lifetimes_.
> We try to be pragmatic here, but suggestions are welcome.
>
> <sup>2</sup> _Live lines_ might have been a more appropriate term ...

</explanation>
</lifetime-section>




<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <arrows>
            <arrow style="left: 192px; width: 120px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 38px;">S(0)</value>
            <value class="t byte2 hide" style="left: 79px;">S(1)</value>
            <value class="t byte2" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">0xa</value>
        </values>
        <labels>
            <label class="byte2 hide" style="left: 37px;"><code>a</code></label>
            <label class="byte2 hide" style="left: 78px;"><code>b</code></label>
            <label class="byte2" style="left: 118px;"><code>c</code></label>
            <label class="byte4" style="left: 177px;"><code>r</code></label>
        </labels>
        <subtext>Meaning of <code>r: &'c S</code></subtext>
        <!-- <subtext><code>r: &mut 'c S</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

- Assume you got a `r: &'c S` from somewhere it means:
    - `r` holds an address of some `S`,
    - any address `r` points to must and will exist for at least `'c`,
    - the variable `r` itself cannot live longer than `'c`.



</explanation>
</lifetime-section>



<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <arrows>
            <arrow style="left: 118px; width: 193px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 38px;">S(0)</value>
            <value class="t byte2" style="left: 79px;">S(3)</value>
            <value class="t byte2" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">0x6</value>
            <denied style="left: -125px; top:-25px;">⛔</denied>
        </values>
        <labels>
            <label class="byte2" style="left: 37px;"><code>a</code></label>
            <label class="byte2" style="left: 78px;"><code>b</code></label>
            <label class="byte2" style="left: 118px;"><code>c</code></label>
            <label class="byte4" style="left: 177px;"><code>r</code></label>
        </labels>
        <subtext>Typelikeness of Lifetimes</subtext>
        <!-- <subtext><code>r = &mut b;</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
{
    let b = S(3);
    {
        let c = S(2);
        let r: &'c S = &c;      // Does not quite work since we can't name lifetimes of local
        {                       // variables in a function body, but very same principle applies
            let a = S(0);       // to functions next page.

            r = &a;             // Location of `a` does not live sufficient many lines -> not ok.
            r = &b;             // Location of `b` lives all lines of `c` and more -> ok.
        }
    }
}
```

- Assume you got a `mut r: &mut 'c S` from somewhere.
    - That is, a mutable location that can hold a mutable reference.
- As mentioned, that reference must guard the targeted memory.
- However, the **`'c` part**, like a type, also **guards what is allowed into `r`**.
- Here assiging `&b` (`0x6`) to `r` is valid, but `&a` (`0x3`) would not, as only `&b` lives equal or longer than `&c`.

</explanation>
</lifetime-section>




<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <arrows>
            <arrow style="left: 118px; width: 193px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t borrowed"></byte>
            <byte class="t borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 38px;">S(0)</value>
            <value class="t byte2" style="left: 79px;">&nbsp;</value>
            <value class="t byte2 hide" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">0x6</value>
            <failed style="left: -40px;"><value class="t bytes">S(4)</value></failed>
            <denied style="left: -83px;">⛔</denied>
        </values>
        <labels>
            <label class="byte2 hide" style="left: 37px;"><code>a</code></label>
            <label class="byte2" style="left: 78px;"><code>b</code></label>
            <label class="byte2 hide" style="left: 118px;"><code>c</code></label>
            <label class="byte4 hide" style="left: 177px;"><code></code></label>
        </labels>
        <subtext>Borrowed State</subtext>
        <!-- <subtext><code>... = &b; b = S(n);</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let mut b = S(0);
let r = &mut b;

b = S(4);   // Will fail since `b` in borrowed state.

print_byte(r);
```

- Once the address of a variable is taken via `&b` or `&mut b` the variable is marked as **borrowed**.
- While borrowed, the content of the addess cannot be modified anymore via original binding `b`.
- Once address taken via `&b` or `&mut b` stops being used (in terms of LOC) original binding `b` works again.


</explanation>
</lifetime-section>

</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-lt-11" name="tab-lt">
<label for="tab-lt-11"><b>Lifetimes in Functions</b></label>
<panel>
<div>


<lifetime-section>
<lifetime-example>
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t borrowed"></byte>
            <byte class="t borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t borrowed"></byte>
            <byte class="t borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 38px;">S(0)</value>
            <value class="t byte2" style="left: 79px;">S(1)</value>
            <value class="t byte2" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">?</value>
            <value class="ptr byte4" style="left: 201px;">0x6</value>
            <value class="ptr byte4" style="left: 224px;">0xa</value>
        </values>
        <labels>
            <label class="byte2 hide" style="left: 37px;"><code>a</code></label>
            <label class="byte4" style="left: 59px;"><code>b</code></label>
            <label class="byte2" style="left: 81px;"><code>c</code></label>
            <label class="byte4" style="left: 139px;"><code>r</code></label>
            <label class="byte4" style="left: 165px;"><code>x</code></label>
            <label class="byte4" style="left: 188px;"><code>y</code></label>
        </labels>
        <subtext>Function Parameters</subtext>
        <!-- <subtext><code>let r = f(&b, &c);</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
fn f(x: &S, y:&S) -> &u8 { ... }

let b = S(1);
let c = S(2);

let r = f(&b, &c);
```

- When calling functions that take and return references two interesting things happen:
    - The used local variables are placed in a borrowed state,
    - But it is during compilation unknown which address will be returned.



</explanation>
</lifetime-section>




<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t maybe-borrowed"></byte>
            <byte class="t maybe-borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t maybe-borrowed"></byte>
            <byte class="t maybe-borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2 hide" style="left: 38px;">S(0)</value>
            <value class="t byte2" style="left: 79px;">S(1)</value>
            <value class="t byte2" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">?</value>
            <value class="ptr byte4 hide" style="left: 201px;">0x6</value>
            <value class="ptr byte4 hide" style="left: 224px;">0xa</value>
        </values>
        <labels>
            <label class="byte2" style="left: 37px;"><code>a</code></label>
            <label class="byte4" style="left: 59px;"><code>b</code></label>
            <label class="byte2" style="left: 81px;"><code>c</code></label>
            <label class="byte4" style="left: 139px;"><code>r</code></label>
            <label class="byte4 hide" style="left: 165px;"><code>x</code></label>
            <label class="byte4 hide" style="left: 188px;"><code>y</code></label>
        </labels>
        <subtext>Problem of 'Borrowed' Propagation</subtext>
        <!-- <subtext><code>let a = b;</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
let b = S(1);
let c = S(2);

let r = f(&b, &c);

let a = b;   // Are we allowed to do this?
let a = c;   // Which one is _really_ borrowed?

print_byte(r);
```

- Since `f` can return only one address, not in all cases `b` and `c` need to stay locked.
- In many cases we can get quality-of-life improvements.
    - Notably, when we know one parameter _couldn't_ have been used in return value anymore.


</explanation>
</lifetime-section>



<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <arrows>
            <arrow style="left: 210px; width: 102px;">&nbsp;<tip>▼</tip></value>
        </arrows>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t borrowed"></byte>
            <byte class="t borrowed"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 38px;">S(1)</value>
            <value class="t byte2 hide" style="left: 79px;">S(1)</value>
            <value class="t byte2" style="left: 119px;">S(2)</value>
            <value class="ptr byte4" style="left: 177px;">y + _</value>
            <value class="ptr byte4 hide" style="left: 201px;">0x6</value>
            <value class="ptr byte4 hide" style="left: 224px;">0xa</value>
        </values>
        <labels>
            <label class="byte2" style="left: 37px;"><code>a</code></label>
            <label class="byte4" style="left: 59px;"><code>b</code></label>
            <label class="byte2" style="left: 81px;"><code>c</code></label>
            <label class="byte4" style="left: 139px;"><code>r</code></label>
            <label class="byte4 hide" style="left: 165px;"><code>x</code></label>
            <label class="byte4 hide" style="left: 188px;"><code>y</code></label>
        </labels>
        <subtext>Lifetimes Propagate Borrowed State</subtext>
        <!-- <subtext><code>f(x: &'x S, y: &'y S) -> &'y u8</code></subtext> -->
    </memory-row>
</lifetime-example>
<explanation>

```
fn f<'b, 'c>(x: &'b S, y: &'c S) -> &'c u8 { ... }

let b = S(1);
let c = S(2);

let r = f(&b, &c); // We know returned reference is `c`-based, which must stay locked,
                   // while `b` is free to move.

let a = b;

print_byte(r);
```

- Liftime parameters in signatures, like `'c` above, solve that problem.
- Their primary purpose is:
    - **outside the function**, to explain based on which input address an output address could be generated,
    - **within the function**, to guarantee only addresses that live at least `'c` are assigned.
- The actual lifetimes `'b`, `'c` are transparently picked by the compiler at **call site**, based on the borrowed variables the developer gave.
- They are **not** equal to the _scope_ (which would be LOC from initialization to destruction) of `b` or `c`, but only a minimal subset of their scope called _lifetime_, that is, a minmal set of LOC based on how long `b` and `c` need to be borrowed to perform this call and use the obtained result.
- In some cases, like if `f` had `'c: 'b` instead, we still couldn't distinguish and both needed to stay locked.

</explanation>
</lifetime-section>




<lifetime-section>
<lifetime-example class="not-first">
    <memory-row>
        <memory-backdrop class="past" style="padding-left: 7px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte class="atomic"></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop class="past" style="padding-left: 3px;">
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte class="ptr"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <memory-backdrop>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte class="t"></byte>
            <byte class="t"></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
            <byte></byte>
        </memory-backdrop>
        <values>
            <value class="t byte2" style="left: 38px;">S(2)</value>
            <value class="t byte2 hide" style="left: 79px;">S(1)</value>
            <value class="t byte2 hide" style="left: 119px;">S(2)</value>
            <value class="ptr byte4 hide" style="left: 177px;">y + 1</value>
            <value class="ptr byte4 hide" style="left: 201px;">0x6</value>
            <value class="ptr byte4 hide" style="left: 224px;">0xa</value>
        </values>
        <labels>
            <label class="byte2" style="left: 37px;"><code>a</code></label>
            <label class="byte4 hide" style="left: 59px;"><code>b</code></label>
            <label class="byte2" style="left: 81px;"><code>c</code></label>
            <label class="byte4 hide" style="left: 139px;"><code>r</code></label>
            <label class="byte4 hide" style="left: 165px;"><code>x</code></label>
            <label class="byte4 hide" style="left: 188px;"><code>y</code></label>
        </labels>
        <!-- <subtext><code>{ let r = ... }</code></subtext> -->
        <subtext>Unlocking</subtext>
    </memory-row>
</lifetime-example>
<explanation>

```
let mut c = S(2);

let r = f(&c);
let s = r;
                    // <- Not here, `s` prolongs locking of `c`.

print_byte(s);

let a = c;          // <- But here, no more use of `r` or `s`.


```
- A variable location is _unlocked_ again once the last use of any reference that may point to it ends.

</explanation>
</lifetime-section>

</div></panel></tab>
</tabs>


<footnotes>

↕️ Examples expand by clicking.

</footnotes>



{{ tablesep() }}

</noprint>


## Language Sugar

If something works that "shouldn't work now that you think about it", it might be due to one of these.


<div class="color-header language-sugar">


| Name | Description |
|--------| -----------|
| **Coercions** {{ nom(page="coercions.html") }} | 'Weaken' types to match signature, e.g., `&mut T` to `&T`.  |
| **Deref** {{ nom(page="vec-deref.html#deref") }} | [Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html) `x: T` until `*x`, `**x`, ... compatible with some target `S`. |
| **Prelude** {{ std(page="std/prelude/index.html") }} | Automatic import of basic types.
| **Reborrow** | Since `x: &mut T` can't be copied; move new `&mut *x` instead. |
| **Lifetime Elision** {{ book(page="ch10-03-lifetime-syntax.html#lifetime-elision") }} {{ nom(page="lifetime-elision.html#lifetime-elision") }} {{ ref(page="lifetime-elision.html#lifetime-elision") }} | Automatically annotate `f(x: &T)` to `f<'a>(x: &'a T)`.|
| **Method Resolution** {{ ref(page="expressions/method-call-expr.html") }} | Deref or borrow `x` until `x.f()` works. |
| **Match Ergonomics** {{ rfc(page="2005-match-ergonomics.html") }} | Repeatedly dereference [scrutinee](https://doc.rust-lang.org/stable/reference/glossary.html#scrutinee) and add `ref` and `ref mut` to bindings. |


</div>

{{ tablesep() }}

> **Editorial Comment** <sup>💬</sup> &mdash; The features above will make your life easier, but might hinder your understanding. If you are new to Rust, you should consider reading about them in more detail.

</magic>

---

<!-- This whole section doesn't look good on print -->
<noprint>

# Data & Types

Memory representations of common data types.


## Basic Types

Essential types built into the core of the language.


#### Numeric Types {{ ref(page="types/numeric.html") }}

<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>u8</code>, <code>i8</code></name>
    <visual class="bytes">
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced" >
    <name><code>u16</code>, <code>i16</code></name>
    <visual class="bytes">
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum  class="spaced">
    <name><code>u32</code>, <code>i32</code></name>
    <visual class="bytes">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum  class="spaced">
    <name><code>u64</code>, <code>i64</code></name>
    <visual class="bytes">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum  class="spaced">
    <name><code>u128</code>, <code>i128</code></name>
    <visual class="bytes">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>f32</code></name>
    <visual class="float">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>f64</code></name>
    <visual class="float">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>usize</code>, <code>isize</code></name>
    <visual class="sized">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte style="border-color: #888;"><code></code></byte>
        <byte style="border-color: #888;"><code></code></byte>
        <byte style="border-color: #aaa;"><code></code></byte>
        <byte style="border-color: #aaa;"><code></code></byte>
        <byte style="border-color: #aaa;"><code></code></byte>
        <byte style="border-color: #aaa;"><code></code></byte>
    </visual>
    <zoom>
        Same as <code>ptr</code> on platform.
    </zoom>
</datum>



<br/>


{{ tablesep() }}


<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-numeric-1" name="tab-group-numeric" checked>
<label for="tab-numeric-1"><b>Unsigned Types</b></label>
<panel><div>



|Type|Max Value|
|---|---|
|`u8`| `255` |
|`u16` | `65_535` |
|`u32`| `4_294_967_295` |
|`u64`| `18_446_744_073_709_551_615` |
|`u128`| `340_282_366_920_938_463_463_374_607_431_768_211_455` |
|`usize`| Depending on platform pointer size, same as `u16`, `u32`, or `u64`. |


</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-numeric-3" name="tab-group-numeric">
<label for="tab-numeric-3"><b>Signed Types</b></label>
<panel><div>



|Type |Max Value|
|---|---|
|`i8`| `127` |
|`i16` | `32_767` |
|`i32`| `2_147_483_647` |
|`i64`| `9_223_372_036_854_775_807` |
|`i128`| `170_141_183_460_469_231_731_687_303_715_884_105_727` |
|`isize`| Depending on platform pointer size, same as `i16`, `i32`, or `i64`. |

{{ tablesep() }}

|Type |Min Value|
|---|---|
|`i8`| `-128` |
|`i16` | `-32_768` |
|`i32`| `-2_147_483_648` |
|`i64`| `-9_223_372_036_854_775_808` |
|`i128`| `-170_141_183_460_469_231_731_687_303_715_884_105_728` |
|`isize`| Depending on platform pointer size, same as `i16`, `i32`, or `i64`. |


</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-numeric-2" name="tab-group-numeric">
<label for="tab-numeric-2"><b>Float Types</b></label>
<panel><div>


Sample bit representation<sup>*</sup> for a `f32`:

<!-- NEW ENTRY -->
<datum style="opacity:0.7; margin-bottom:10px;">
    <visual class="float">
    <bitgroup>
        <bit><code>S</code></bit>
    </bitgroup>
    <bitgroup>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
        <bit><code>E</code></bit>
    </bitgroup>
    <bitgroup>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
        <bit><code>F</code></bit>
    </bitgroup>
    </visual>
</datum>

{{ tablesep() }}

Explanation:

| f32 | S (1) | E (8) | F (23) | Value |
|------| ---------| ---------| ---------| ---------|
| Normalized number | ± | 1 to 254 | any | ±(1.F)<sub>2</sub> * 2<sup>E-127</sup>  |
| Denormalized number | ± | 0 | non-zero | ±(0.F)<sub>2</sub> * 2<sup>-126</sup>  |
| Zero | ± | 0 | 0 | ±0  |
| Infinity | ± | 255 | 0 | ±∞  |
| NaN | ± | 255 | non-zero | NaN  |

{{ tablesep() }}

Similarly, for <code>f64</code> types this would look like:

| f64 | S (1) | E (11) | F (52) | Value |
|------| ---------| ---------| ---------| ---------|
| Normalized number | ± | 1 to 2046 | any | ±(1.F)<sub>2</sub> * 2<sup>E-1023</sup>  |
| Denormalized number | ± | 0 | non-zero | ±(0.F)<sub>2</sub> * 2<sup>-1022</sup>  |
| Zero | ± | 0 | 0 | ±0  |
| Infinity | ± | 2047 | 0 | ±∞  |
| NaN | ± | 2047 | non-zero | NaN  |

<footnotes>
    <sup>*</sup> Float types follow <a href="https://en.wikipedia.org/wiki/IEEE_754-2008_revision">IEEE 754-2008</a> and depend on platform endianness.
</footnotes>

</div></panel></tab>

<!-- End tabs -->
</tabs>

<!-- End overflow prevention -->
</div></div>


{{ tablesep() }}



#### Textual Types {{ ref(page="types/textual.html") }}


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>char</code></name>
    <visual class="char">
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
        <byte><code></code></byte>
    </visual>
    <description>Any UTF-8 scalar.</description>
</datum>



<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>str</code></name>
    <visual>
        <note>...</note>
        <byte class="bytes"><code>U</code></byte>
        <byte class="bytes"><code>T</code></byte>
        <byte class="bytes"><code>F</code></byte>
        <byte class="bytes"><code>-</code></byte>
        <byte class="bytes"><code>8</code></byte>
        <note>... unspecified times</note>
    </visual>
    <description>Rarely seen alone, but as <code>&str</code> instead.</description>
</datum>


{{ tablesep() }}

<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-textual-3" name="tab-group-textual" checked>
<label for="tab-textual-3"><b>Basics</b></label>
<panel><div>

| Type | Description |
|---------|-------------|
| `char` | Always 4 bytes and only holds a single Unicode **scalar value** {{ link(url="https://www.unicode.org/glossary/#unicode_scalar_value") }}. |
| `str` | An `u8`-array of unknown length guaranteed to hold **UTF-8 encoded code points**. |

</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-textual-1" name="tab-group-textual">
<label for="tab-textual-1"><b>Usage</b></label>
<panel><div>



<!-- Notice how:

- `char` is always 4 bytes and only holds a single Unicode **scalar value** {{ link(url="https://www.unicode.org/glossary/#unicode_scalar_value") }}, thus possibly wasting space.
- `str` is a byte-array of unknown length guaranteed to hold **UTF-8 encoded code points** (but harder to index).
 -->

| Chars | Description |
|---------|-------------|
| `let c = 'a';` | Often a `char` (unicode scalar) can coincide with your intuition of _character_. |
| `let c = '❤';` | It can also hold many Unicode symbols. |
| `let c = '❤️';` | But not always. Given emoji is **two** `char` (see Encoding) and **can't** {{ bad() }} be held by `c`.<sup>1</sup> |
| `c = 0xffff_ffff;` | Also, chars are **not allowed** {{ bad() }} to hold arbitrary bit patterns. |

<footnotes>
    <sup>1</sup> Fun fact, due to the <a href="https://en.wikipedia.org/wiki/Zero-width_joiner">Zero-width joiner</a> (⨝) what the user <i>perceives as a character</i> can get even more unpredictable: 👨‍👩‍👧 is in fact 5 chars 👨⨝👩⨝👧, and rendering engines are free to either show them fused as one, or separately as three, depending on their abilities.
</footnotes>


{{ tablesep() }}

| Strings | Description |
|---------|-------------|
| `let s = "a";` | A `str` is usually never held directly, but as `&str`, like `s` here. |
| `let s = "❤❤️";` | It can hold arbitrary text, has variable length per _c._, and is hard to index. |


</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-textual-2" name="tab-group-textual">
<label for="tab-textual-2"><b>Encoding</b></label>
<panel><div>


`let s = "I ❤ Rust"; ` <br>
`let t = "I ❤️ Rust";`

| Variant | Memory Representation<sup>2<sup> |
|---------|-------------|
| `s.as_bytes()` | `49` `20` <span class="force-code-color same-black"><b>`e2 9d a4`</b> </span> `20 52 75 73 74` <sup>3<sup> |
| `s.chars()`<sup>1<sup> | `49 00 00 00 20 00 00 00` <span class="force-code-color same-black"><b>`64 27 00 00` </b></span> `20 00 00 00 52 00 00 00 75 00 00 00 73 00` ... |
| `t.as_bytes()` | `49` `20` <span class="force-code-color same-black"><b>`e2 9d a4`</b> </span> <span class="force-code-color same-red"><b>`ef b8 8f`</b></span> `20 52 75 73 74` <sup>4<sup> |
| `t.chars()`<sup>1<sup> | `49 00 00 00 20 00 00 00` <span class="force-code-color same-black"><b>`64 27 00 00`</b></span> <span class="force-code-color same-red"><b>`0f fe 01 00`</b></span> `20 00 00 00 52 00 00 00 75 00` ... |

{{ tablesep() }}

<footnotes>
    <sup>1</sup> Result then collected into array and transmuted to bytes.<br>
    <sup>2</sup> Values given in hex, on x86.<br>
    <sup>3</sup> Notice how <code>❤</code>, having <a href="https://codepoints.net/U+2764">Unicode Code Point (U+2764)</a>, is represented as <span class="force-code-color same-black"><b>64 27 00 00</b></span> inside the <code>char</code>, but got <a href="https://en.wikipedia.org/wiki/UTF-8#Description">UTF-8 encoded to</a> <span class="force-code-color same-black"><b>e2 9d a4</b></span> in the <code>str</code>.<br>
    <sup>4</sup> Also observe how the emoji <a href="https://emojipedia.org/red-heart/">Red Heart <code>❤️</code></a>, is a combination of <code>❤</code> and the <a href="https://codepoints.net/U+FE0F">U+FE0F Variation Selector</a>, thus <code>t</code> has a higher char count than <code>s</code>.
</footnotes>

{{ tablesep() }}


<footnotes>

> <sup>💬</sup> For what seem to be browser bugs Safari and Edge render the hearts in Footnote 3 and 4 wrong, despite being able to differentiate them correctly in `s` and `t` above.

</footnotes>

</div></panel></tab>


<!-- End tabs -->
</tabs>


{{ tablesep() }}


## Custom Types

Basic types definable by users. Actual <b>layout</b> {{ ref(page="type-layout.html") }} is subject to <b>representation</b>; {{ ref(page="type-layout.html#representations") }} padding can be present. <sup>1</sup>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name class="nogrow"><code>T</code></name>
    <name class="hidden">x</name>
    <visual>
       <framed class="any t"><code>T</code></framed>
    </visual>
    <description>Sized {{ below(target = "#sized-types") }} </description>
</datum>

<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>T: ?Sized</code></name>
    <visual>
       <framed class="any unsized"><code>T</code></framed>
    </visual>
    <description>Maybe DST {{ below(target = "#sized-types") }} </description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>(A, B, C)</code></name>
    <visual>
       <framed class="any"><code>A</code></framed>
       <framed class="any" style="width: 100px;"><code>B</code></framed>
       <framed class="any" style="width: 50px;"><code>C</code></framed>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum style="margin-right:70px;">
    <name class="nogrow"><code>struct S; </code></name>
    <name class="hidden"><code>;</code></name>
    <visual style="width: 15px;" class="zst">
        <code></code>
    </visual>
    <description>Zero-Sized {{ below(target = "#sized-types") }} </description>
</datum>



<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>struct S { b: B, c: C } </code></name>
    <visual>
       <framed class="any" style="width: 100px;"><code>B</code></framed>
       <framed class="any" style="width: 50px;"><code>C</code></framed>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>[T; n]</code></name>
    <visual>
       <framed class="any t"><code>T</code></framed>
       <framed class="any t"><code>T</code></framed>
       <framed class="any t"><code>T</code></framed>
       <note>... n times</note>
    </visual>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>[T]</code></name>
    <visual>
       <note>...</note>
       <framed class="any t"><code>T</code></framed>
       <framed class="any t"><code>T</code></framed>
       <framed class="any t"><code>T</code></framed>
       <note>... unspecified times</note>
    </visual>
</datum>



{{ tablesep() }}

These **sum types** hold a value of one of their sub types:

<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>enum E { A, B, C }</code></name>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
        <framed class="any">
            <code>A</code>
        </framed>
    </visual>
    <andor>exclusive or</andor>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
        <framed class="any" style="width: 100px;">
            <code>B</code>
        </framed>
    </visual>
    <andor>exclusive or</andor>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
        <framed class="any" style="width: 50px;">
            <code>C</code>
        </framed>
    </visual>
    <description>
        Safely holds A or B or C, also <br> called 'tagged union', though <br> compiler may omit tag.
    </description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>union { ... }</code></name>
    <visual style="text-align: left;">
        <framed class="any">
            <code>A</code>
        </framed>
    </visual>
    <andor>unsafe or</andor>
    <visual style="text-align: left;">
        <framed class="any" style="width: 100px;">
            <code>B</code>
        </framed>
    </visual>
    <andor>unsafe or</andor>
    <visual style="text-align: left;">
        <framed class="any" style="width: 50px;">
            <code>C</code>
        </framed>
    </visual>
    <description>
        Can unsafely reinterpret <br>memory. Result might <br> be undefined.
    </description>
</datum>


<footnotes>

<sup>1</sup> To be clear, the depiction of types here merely illustrates a _random_ representation. Unless a certain one is forced (e.g., via `#[repr(C)]`, Rust will, for example, be free to layout `A(u8, u16)` as `[u8 u16]` and `B(u8, u16)` as `[u16 u8]`, even inside the same application!

</footnotes>


## References & Pointers {#references-pointers-ui}

References give safe access to other memory, raw pointers `unsafe` access.
For some referents additional `payload` may be present, see below.
The respective `mut` types are identical.


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>&'a T</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <payload>
            <code>payload</code><sub>2/4/8</sub>
        </payload>
    </visual>
    <memory-entry>
        <memory-link style="left:46%;">|</memory-link>
        <memory class="anymem">
            <framed class="any unsized"><code>T</code></framed>
        </memory>
    </memory-entry>
    <description>During <code>'a</code> any 'mem' this targets
    must <br> always be a valid <code>t</code> of <code>T</code>.</description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>*const T</code></name>
    <visual class="unsafe">
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <payload>
            <code>payload</code><sub>2/4/8</sub>
        </payload>
    </visual>
    <zoom>
        No guarantees.
    </zoom>
</datum>

<br/>


{{ tablesep() }}


The **`payload`** depends on the base type of the referent. This applies to both references and pointers.

<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>&'a T</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
    </visual>
    <memory-entry>
        <memory-link style="left:46%;">|</memory-link>
        <memory class="anymem">
            <framed class="any t"><code>T</code></framed>
        </memory>
    </memory-entry>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>&'a T</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry>
        <memory-link style="left:46%;">|</memory-link>
        <memory class="anymem">
            <framed class="any unsized"><code>T</code></framed>
        </memory>
    </memory-entry>
    <description>If <code>T</code> is a DST <code>struct</code> such as<br> <code>S { x: [u8] }</code>
    field <code>len</code> is <br>length of dyn. sized content.</description>
</datum>



<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>&'a [T]</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:24%;">|</memory-link>
        <memory class="anymem">
            ...
            <framed class="any" style="width: 30px;"><code>T</code></framed>
            <framed class="any" style="width: 30px;"><code>T</code></framed>
            ...
        </memory>
    </memory-entry>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>&'a str</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:24%;">|</memory-link>
        <memory class="anymem">
            ...
            <byte class="bytes"><code>U</code></byte>
            <byte class="bytes"><code>T</code></byte>
            <byte class="bytes"><code>F</code></byte>
            <byte class="bytes"><code>-</code></byte>
            <byte class="bytes"><code>8</code></byte>
            ...
        </memory>
    </memory-entry>
</datum>

<br>

<!-- NEW ENTRY -->
<datum class="spaced" style="padding-bottom: 165px;">
    <name><code>&'a dyn Trait</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <ptr>
            <code>ptr</code><sub>2/4/8</sub>
        </ptr>
    </visual>
    <memory-entry>
        <memory-link style="left:49%;">|</memory-link>
        <memory class="anymem">
            <framed class="any unsized"><code>T</code></framed>
        </memory>
    </memory-entry>
    <memory-entry style="width:220px; position: absolute;">
        <memory-link style="left:22%;">|</memory-link>
        <memory class="static-vtable" style="width: 210px;">
            <table>
                <tr class="vtable"><td><code>*Drop::drop(&mut T)</code></td></tr>
                <tr class="vtable"><td><code>size</code></td></tr>
                <tr class="vtable"><td><code>align</code></td></tr>
                <tr class="vtable"><td><code>*Trait::f(&T, ...)</code></td></tr>
                <tr class="vtable"><td><code>*Trait::g(&T, ...)</code></td></tr>
            </table>
        </memory>
        <description>Where <code>*Drop::drop()</code>, <code>*Trait::f()</code>, ... are pointers to their respective <code>impl</code> for <code>T</code>.</description>
    </memory-entry>

</datum>


## Closures {#closures-data}

Closures are ad-hoc functions along with an automatically managed data block **capturing** {{ ref(page="types/closure.html#capture-modes") }}
the environment accessed where closure was defined. For example:

<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>move |x| x + y.f() + z</code></name>
    <visual>
       <framed class="any" style="width: 100px;"><code>Y</code></framed>
       <framed class="any" style="width: 50px;"><code>Z</code></framed>
    </visual>
    <zoom>Anonymous closure type C1</zoom>
    <!-- <description>Also produces anonymous <br><code>f_c1 (c: C1, x: T)</code>. Details depend<br> which <code>FnOnce</code>, <code>FnMut</code>, <code>Fn</code> is allowed.</description> -->
</datum>



<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>|x| x + y.f() + z</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
    </visual>
    <zoom>Anonymous closure type C2</zoom>
    <memory-entry>
        <memory-link style="left:44%;">|</memory-link>
        <memory class="anymem">
            <framed class="any" style="width: 30px;"><code>Y</code></framed>
        </memory>
    </memory-entry>
    <memory-entry>
        <memory-link style="left:44%;">|</memory-link>
        <memory class="anymem">
            <framed class="any" style="width: 30px;"><code>Z</code></framed>
        </memory>
    </memory-entry>
    <!-- <description>Similar, but captured context by<br> reference. Details might differ <br> depending on types involved.</description> -->
</datum>

<!-- Little hack as description below was too cluttered. -->
<datum>
    <name>&nbsp;</name>
    <description>
    Also produces anonymous <code>fn</code> such as <code>f_c1 (C1, X)</code> or <br>
    <code>f_c2 (&C2, X)</code>. Details depend which <code>FnOnce</code>, <code>FnMut</code>, <code>Fn</code> ...<br>
    is supported, based on properties of captured types.
    </description>
</datum>




## Standard Library Types

Rust's standard library combines the above primitive types into useful types with special semantics, e.g.:


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>UnsafeCell&lt;T&gt;</code></name>
    <visual class="cell">
           <framed class="any unsized"><code>T</code></framed>
    </visual>
    <description>Magic type allowing <br>aliased mutability.</description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>Cell&lt;T&gt;</code></name>
    <visual>
           <framed class="any unsized celled"><code>T</code></framed>
    </visual>
    <description>Allows <code>T</code>'s<br> to move in<br> and out.</description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>RefCell&lt;T&gt;</code></name>
    <visual>
        <sized class="celled"><code>borrowed</code></sized>
        <framed class="any unsized celled"><code>T</code></framed>
    </visual>
    <description>Also support dynamic<br>
    borrowing of <code>T</code>. Like <code>Cell</code> this<br>
    is <code>Send</code>, but not <code>Sync</code>.</description>
</datum>


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>AtomicUsize</code></name>
    <visual class="atomic">
        <ptr class="atomic">
            <code>usize</code><sub>2/4/8</sub>
        </ptr>
    </visual>
    <description>Other atomic similarly.</description>
</datum>




<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>Option&lt;T&gt;</code></name>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
    </visual>
    <andor>or</andor>
    <visual class="enum">
        <pad><code>Tag</code></pad>
        <framed class="any" style="width: 100px;">
            <code>T</code>
        </framed>
    </visual>
    <description>Tag may be omitted for <br> certain T.</description>
</datum>


<!-- NEW ENTRY -->
<datum>
    <name><code>Result&lt;T, E&gt;</code></name>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
        <framed class="any" style="width: 50px;">
            <code>E</code>
        </framed>
    </visual>
    <andor>or</andor>
    <visual class="enum" style="text-align: left;">
        <pad><code>Tag</code></pad>
        <framed class="any" style="width: 100px;">
            <code>T</code>
        </framed>
    </visual>
</datum>

{{ tablesep() }}


#### General Purpose Heap Storage


<!-- NEW ENTRY -->
<datum class="spaced">
    <name><code>Box&lt;T&gt;</code></name>
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <payload>
            <code>payload</code><sub>2/4/8</sub>
        </payload>
    </visual>
    <memory-entry>
        <memory-link style="left:49%;">|</memory-link>
        <memory class="heap">
        <framed class="any unsized"><code>T</code></framed>
        </memory>
    </memory-entry>
</datum>

<spacer>
</spacer>

<!-- NEW ENTRY -->
<datum>
    <name><code>Vec&lt;T&gt;</code></name>
    <!-- For some reason we need the width for mobile not to line break -->
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>capacity</code><sub>2/4/8</sub>
        </sized>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:25%;">|</memory-link>
        <memory class="heap capacity">
            <div>
                <framed class="any t"><code>T</code></framed>
                <framed class="any t"><code>T</code></framed>
                <note>... len</note>
            </div>
            <capacity>← <note>capacity</note> →</capacity>
        </memory>
    </memory-entry>
</datum>


{{ tablesep() }}


#### Owned Strings


<!-- NEW ENTRY -->
<datum>
    <name><code>String</code></name>
    <!-- For some reason we need the width for mobile not to line break -->
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>capacity</code><sub>2/4/8</sub>
        </sized>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:25%;">|</memory-link>
        <memory class="heap">
            <div>
                <byte class="bytes"><code>U</code></byte>
                <byte class="bytes"><code>T</code></byte>
                <byte class="bytes"><code>F</code></byte>
                <byte class="bytes"><code>-</code></byte>
                <byte class="bytes"><code>8</code></byte>
                <note>... len</note>
            </div>
            <capacity>← <note>capacity</note> →</capacity>
        </memory>
    </memory-entry>
    <description>Observe how <code>String</code> differs from <code>&str</code> and <code>&[char]</code>.</description>
</datum>

<spacer>
</spacer>

<!-- NEW ENTRY -->
<datum>
    <name><code>CString</code></name>
    <!-- For some reason we need the width for mobile not to line break -->
    <visual>
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <sized>
            <code>len</code><sub>2/4/8</sub>
        </sized>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:25%;">|</memory-link>
        <memory class="heap">
            <div>
                <byte class="bytes"><code>A</code></byte>
                <byte class="bytes"><code>B</code></byte>
                <byte class="bytes"><code>C</code></byte>
                <note>... len ...</note>
                <byte class="bytes"><code>␀</code></byte>
            </div>
        </memory>
    </memory-entry>
    <description>Nul-terminated but w/o nul in middle.</description>
</datum>


<spacer>
</spacer>

<!-- NEW ENTRY -->
<datum>
    <name><code>OsString</code> {{ todo() }}</name>
    <!-- For some reason we need the width for mobile not to line break -->
    <visual class="platformdefined">
        Platform Defined
    </visual>
    <memory-entry class="double">
        <memory-link style="left:25%;">|</memory-link>
        <memory class="heap">
            <div>
                <byte class="bytes"><code>?</code></byte>
                <byte class="bytes"><code>?</code></byte>
                /
                <word class="bytes"><code>?</code></word>
                <word class="bytes"><code>?</code></word>
            </div>
        </memory>
    </memory-entry>
    <description></description>
</datum>

<spacer>
</spacer>

<!-- NEW ENTRY -->
<datum>
    <name><code>PathBuf</code> {{ todo() }}</name>
    <!-- For some reason we need the width for mobile not to line break -->
    <visual class="platformdefined">
        <payload>
            <code>OsString</code>
        </payload>
    </visual>
    <memory-entry class="double">
        <memory-link style="left:40%;">|</memory-link>
        <memory class="heap">
            <div>
                <byte class="bytes"><code>?</code></byte>
                <byte class="bytes"><code>?</code></byte>
                /
                <word class="bytes"><code>?</code></word>
                <word class="bytes"><code>?</code></word>
            </div>
        </memory>
    </memory-entry>
</datum>


{{ tablesep() }}

#### Shared Ownership

If the type does not contain a `Cell` for `T`, these are often combined with one of the `Cell` types above to allow shared de-facto mutability.

<!-- NEW ENTRY -->
<datum>
    <name><code>Rc&lt;T&gt;</code></name>
    <visual style="width: 180px;">
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <payload>
            <code>payload</code><sub>2/4/8</sub>
        </payload>
    </visual>
    <div>
        <memory-entry class="quad">
            <memory-link style="left:15%;">|</memory-link>
            <memory class="heap">
                <sized class="celled"><code>strng</code><sub>2/4/8</sub></sized>
                <sized class="celled"><code>weak</code><sub>2/4/8</sub></sized>
                <framed class="any unsized"><code>T</code></framed>
            </memory>
        </memory-entry>
    </div>
    <description>Share ownership of <code>T</code> in same thread. Needs nested <code>Cell</code>
    <br>or <code>RefCell</code>to allow mutation. Is neither <code>Send</code> nor <code>Sync</code>.</description>
</datum>


<!-- NEW ENTRY -->
<datum>
    <name><code>Arc&lt;T&gt;</code></name>
    <visual style="width: 180px;">
        <ptr>
           <code>ptr</code><sub>2/4/8</sub>
        </ptr>
        <payload>
            <code>payload</code><sub>2/4/8</sub>
        </payload>
    </visual>
    <div style="width: 0px;">
        <memory-entry class="quad">
            <memory-link style="left:15%;">|</memory-link>
            <memory class="heap">
                <sized class="atomicx"><code>strng</code><sub>2/4/8</sub></sized>
                <sized class="atomicx"><code>weak</code><sub>2/4/8</sub></sized>
                <framed class="any unsized"><code>T</code></framed>
            </memory>
        </memory-entry>
    </div>
    <description>Same, but allow sharing between threads IF contained<br>
    <code>T</code> itself is <code>Send</code> and <code>Sync</code>.</description>
</datum>

<br>

<!-- NEW ENTRY -->
<datum>
    <name><code>Mutex&lt;T&gt;</code> / <code>RwLock&lt;T&gt;</code></name>
    <visual style="width: 230px;">
        <ptr><code>ptr</code><sub>2/4/8</sub></ptr>
        <sized class="atomicx"><code>poison</code><sub>2/4/8</sub></sized>
        <framed class="any unsized celled"><code>T</code></framed>
    </visual>
    <memory-entry>
        <memory-link style="left:45%;">|</memory-link>
        <memory class="heap">
            <code>lock</code>
        </memory>
    </memory-entry>
    <description>Needs to be held in <code>Arc</code> to be shared between<br> threads,
    always <code>Send</code> and <code>Sync</code>. Consider using <br> <a href="https://crates.io/crates/parking_lot">parking_lot</a> instead (faster, no heap usage).
    </description>
</datum>


---

<!-- End NOPRINT for datatypes -->
</noprint>


# Standard Library


## Common One-Liners

Snippets that are common, but still easy to forget. See **Rust Cookbook** {{ link(url="https://rust-lang-nursery.github.io/rust-cookbook/") }} for more.


<!--
PRs for this section are very welcome. Idea is:
- Should be `std` only for now, no 3rd party libs (maybe exception for `rand`?)
- "Most people" should have encountered the problem
- Is not just a trival method on an 'obvious' struct (e.g., Sort a slice by `x.sort()` is probably too obvious.)
-->

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

<div class="color-header one-liners cheats">

| Intent | Snippet |
|---------|-------------|
| Create a new file<sup>*</sup> | `OpenOptions::new().create(t).write(t).truncate(t).open(PATH)?` |
| Fix inference in '`try`' closures | <code>iter.try_for_each(&vert;x&vert; { Ok::<(), Error>(()) })?;</code> |
| Macro w. variable arguments | `macro_rules! var_args { ($($args:expr),*) => {{ }} }` |
| {{ tab() }} Using the arguments | {{ tab() }} ` $( f($args); )*` |
| Iterate _and_ edit `&mut [T]` if `T` Copy. | `Cell::from_mut(mut_slice).as_slice_of_cells()` |

<footnotes>

<sup>*</sup> We're a bit short on space here, <code>t</code> means true.

</footnotes>

</div>

</div></div>


{{ tablesep() }}


## Traits

Traits define common behavior. If `S` implements `trait T`, you know `S` can behave as prescribed by `T`. Below is an overview of traits that may be more tricky.

#### 🧵 Thread Safety {#thread-safety}

<!-- Shamelessly stolen from https://www.reddit.com/r/rust/comments/ctdkyr/understanding_sendsync/exk8grg/ -->
<table class="sendsync">
    <thead>
        <tr><th>Examples</th><th><code>Send</code><sup>*</sup></th><th><code>!Send</code></th></tr>
    </thead>
    <tbody>
        <tr><td><code>Sync</code><sup>*</sup></td><td><i>Most types</i> ... <code>Mutex&lt;T&gt;</code>, <code>Arc&lt;T&gt;</code><sup>1,2</sup></td><td><code>MutexGuard&lt;T&gt;</code><sup>1</sup>, <code>RwLockReadGuard&lt;T&gt;</code><sup>1</sup></td></tr>
        <tr><td><code>!Sync</code></td><td><code>Cell&lt;T&gt;</code><sup>2</sup>, <code>RefCell&lt;T&gt;</code><sup>2</sup></td><td><code>Rc&lt;T&gt;</code>, <code>Formatter</code>, <code>&dyn Trait</code></td></tr>
    </tbody>
</table>

<footnotes>

<sup>*</sup> An instance `t` where **`T: Send`** can be moved to another thread, a **`T: Sync`** means `&t` can be moved to another thread.<br>
<sup>1</sup> If `T` is `Sync`. <br>
<sup>2</sup> If `T` is `Send`.

</footnotes>

{{ tablesep() }}


#### 🐘 (Dynamically / Zero) Sized Types {#sized-types}


<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-sized-1" name="tab-group-sized" checked>
<label for="tab-sized-1"><b>Overview</b></label>
<panel><div>




- A type `T` is **`Sized`** {{ std(page="std/marker/trait.Sized.html") }} if at compile time it is known how many bytes it occupies, `u8` and `&[u8]` are, `[u8]` isn't.
- Being `Sized` means `impl Sized for T {}` holds. Happens automatically and cannot be user impl'ed.
- Types not `Sized` are called **dynamically sized types** {{ book(page="ch19-04-advanced-types.html#dynamically-sized-types-and-the-sized-trait") }} {{ nom(page="exotic-sizes.html#dynamically-sized-types-dsts") }}  {{ ref(page="dynamically-sized-types.html#dynamically-sized-types") }} (DSTs), sometimes **unsized**.
- Types without data are called **zero sized types** {{ nom(page="exotic-sizes.html#zero-sized-types-zsts") }} (ZSTs), do not occupy space.

</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-sized-2" name="tab-group-sized">
<label for="tab-sized-2"><b>Sized in Bounds</b></label>
<panel><div>



<div class="color-header sized cheats">

| Example | Explanation |
|---------|-------------|
| `struct A { x: u8 }` | Type `A` is sized, i.e., `impl Sized for A` holds, this is a 'regular' type. |
| `struct B { x: [u8] }` | Since `[u8]` is a DST, `B` in turn becomes DST, i.e., does not `impl Sized`. |
| `struct C<T> { x: T }` | Type params **have** implicit `T: Sized` bound, e.g., `C<A>` is valid, `C<B>` is not. |
| `struct D<T: ?Sized> { x: T }` | Using **`?Sized`** {{ ref(page="trait-bounds.html#sized") }} allows opt-out of that bound, i.e., `D<B>` is also valid. |
| `struct E;` | Type `E` is zero-sized (and also sized) and will not consume memory. |
| `trait F { fn f(&self); }` | Traits **do not have** an implicit `Sized` bound, i.e., `impl F for B {}` is valid.  |
| {{ tab() }} `trait F: Sized {}` | Traits can however opt into `Sized` via supertraits.{{ above(target="#functions-behavior") }} |
| `trait G { fn g(self); }` | For `Self`-like params DST `impl` may still fail as params can't go on stack.  |

</div>


</div></panel></tab>

</tabs>



{{ tablesep() }}

#### 🚥 Iterators {#iterators}


<tabs class="color-header std-green">

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-trait-iter-1" name="tab-group-trait-iter" checked>
<label for="tab-trait-iter-1"><b>Using Iterators</b></label>
<panel><div>



**Basics**

Assume you have a collection `c` of type `C`:

* **`c.into_iter()`** &mdash; Turns collection `c` into an **`Iterator`** {{ std(page="std/iter/trait.Iterator.html") }} `i` and **consumes**<sup>*</sup> `c`. Requires **`IntoIterator`** {{ std(page="std/iter/trait.IntoIterator.html") }} for `C` to be implemented. Type of item depends on what `C` was. 'Standardized' way to get Iterators.
* **`c.iter()`** &mdash; Courtesy method **some** collections provide, returns **borrowing** Iterator, doesn't consume `c`.
* **`c.iter_mut()`** &mdash; Same, but **mutably borrowing** Iterator that allow collection to be changed.


**The Iterator**

Once you have an `i`:

* **`i.next()`** &mdash; Returns `Some(x)` next element `c` provides, or `None` if we're done.


**For Loops**

* **`for x in c {}`** &mdash; Syntactic sugar, calls `c.into_iter()` and loops `i` until `None`.



<footnotes>

<sup>*</sup> If it looks as if it doesn't consume `c` that's because type was `Copy`. For example, if you call `(&c).into_iter()` it will invoke `.into_iter()` on `&c` (which will consume the reference and turn it into an Iterator), but `c` remains untouched.

</footnotes>

</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-trait-iter-2" name="tab-group-trait-iter">
<label for="tab-trait-iter-2"><b>Implementing Iterators</b></label>
<panel><div>


**Basics**

Let's assume you have a `struct C {}` that is your collection.


* **`struct Iter {}`** &mdash; Create a struct to hold your iteration status (e.g., an index) for immutable iteration.
* **`impl Iterator for Iter {}`** &mdash; Provide an implementation of `Iterator::next()` so it can produce elements.

In addition, you might want to add a convenience `fn iter(&self) -> Iter` inside your `impl C {}`.

**Mutable Iterators**

* **`struct IterMut {}`** &mdash; To provide mutable iterators create another struct that can hold `C` as `&mut`.
* **`impl Iterator for IterMut {}`** &mdash; In that case `Iterator::Item` is probably a `&mut item`

Similarly, providing a `fn iter_mut(&mut self) -> IterMut` might be a good idea.


**Making Loops Work**
* **`impl IntoIterator for C {}`** &mdash; Now `for` loops work as `for x in c {}`.
* **`impl IntoIterator for &C {}`** &mdash; For conveninece you might want to add these as well.
* **`impl IntoIterator for &mut C {}`** &mdash; Same ...


</div></panel></tab>


</tabs>

{{ tablesep() }}

<!--
#### 📦 Type Conversions


Conversions XXX

<div class="color-header std-yellow">

| Trait ... | Implementing ... for `S` means | Requiring `<A: ...>` means |
|---------|-------------|----|
| `Borrow<T>` | `S` can produce `&T`, must match `Eq`, ... | Caller can pass `t`, `&t`, `box_t` , ...|
| `BorrowMut<T>` | `S` can produce `&mut T`, rest same. | Similar, `t`, `&mut t`, ...   |
| `AsRef<T>` | `S` can produce `&T`. | Caller can pass `Box<T>` or XXX. |
| `AsMut<T>` | `S` can produce `&mut T`. | Similar, but XXX  |


{{ tablesep() }} -->



## Number Conversions

As-correct-as-it-currently-gets number conversions.

| ↓ Have / Want → | `u8` ... `i128` |  `f32` / `f64` | String |
| --- | --- |  --- |--- |
| `u8` ... `i128` | `u8::try_from(x)?` <sup>1</sup> |  `x as f32` <sup>3</sup> | `x.to_string()` |
| `f32` / `f64` | `x as u8` <sup>2</sup> |  `x as f32` | `x.to_string()` |
| `String` | `x.parse::<u8>()?` | `x.parse::<f32>()?` | `x` |


<footnotes>

<sup>1</sup> If type true subset `from()` works directly, e.g., `u32::from(my_u8)`. <br/>
<sup>2</sup> Truncating (`11.9_f32 as u8` gives `11`) and saturating (`1024_f32 as u8` gives `255`). <br/>
<sup>3</sup> Might misrepresent number (`u64::MAX as f32`) or produce `Inf` (`u128::MAX as f32`).

</footnotes>




## String Conversions


If you **want** a string of type ...

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">


<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-1" name="tab-group-str" checked>
<label for="tab-str-1"><code>String</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`x`|
|`CString`|`x.into_string()?` |
|`OsString`|`x.to_str()?.to_string()`|
|`PathBuf`|`x.to_str()?.to_string()`|
|`Vec<u8>` <sup>1</sup> |`String::from_utf8(x)?`|
|`&str`|`x.to_string()` <sup>`i`</sup> |
|`&CStr`|`x.to_str()?.to_string()` |
|`&OsStr`|`x.to_str()?.to_string()`|
|`&Path`|`x.to_str()?.to_string()`|
|`&[u8]` <sup>1</sup> |`String::from_utf8_lossy(x).to_string()`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-2" name="tab-group-str" >
<label for="tab-str-2"><code>CString</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`CString::new(x)?`|
|`CString`|`x`|
|`OsString` <sup>2</sup>|`CString::new(x.to_str()?)?`|
|`PathBuf`|`CString::new(x.to_str()?)?`|
|`Vec<u8>` <sup>1</sup> |`CString::new(x)?`|
|`&str`|`CString::new(x)?`|
|`&CStr`|`x.to_owned()` <sup>`i`</sup> |
|`&OsStr` <sup>2</sup> |`CString::new(x.to_os_string().into_string()?)?`|
|`&Path`|`CString::new(x.to_str()?)?`|
|`&[u8]` <sup>1</sup> |`CString::new(Vec::from(x))?`|
|`*mut c_char` <sup>3</sup> |`unsafe { CString::from_raw(x) }`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-3" name="tab-group-str" >
<label for="tab-str-3"><code>OsString</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`OsString::from(x)` <sup>`i`</sup> |
|`CString`|`OsString::from(x.to_str()?)`|
|`OsString`|`x`|
|`PathBuf`|`x.into_os_string()`|
|`Vec<u8>` <sup>1</sup> | {{ todo() }} |
|`&str`|`OsString::from(x)` <sup>`i`</sup>|
|`&CStr`|`OsString::from(x.to_str()?)`|
|`&OsStr`|`OsString::from(x)` <sup>`i`</sup>|
|`&Path`|`x.as_os_str().to_owned()`|
|`&[u8]` <sup>1</sup> | {{ todo() }} |

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-35" name="tab-group-str" >
<label for="tab-str-35"><code>PathBuf</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`PathBuf::from(x)` <sup>`i`</sup>|
|`CString`|`PathBuf::from(x.to_str()?)`|
|`OsString`|`PathBuf::from(x)` <sup>`i`</sup>|
|`PathBuf`|`x`|
|`Vec<u8>` <sup>1</sup> | {{ todo() }} |
|`&str`|`PathBuf::from(x)` <sup>`i`</sup>|
|`&CStr`|`PathBuf::from(x.to_str()?)`|
|`&OsStr`|`PathBuf::from(x)` <sup>`i`</sup>|
|`&Path`|`PathBuf::from(x)` <sup>`i`</sup>|
|`&[u8]` <sup>1</sup> | {{ todo() }} |

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-4" name="tab-group-str" >
<label for="tab-str-4"><code>Vec&lt;u8&gt;</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`x.into_bytes()`|
|`CString`|`x.into_bytes()`|
|`OsString`| {{ todo() }} |
|`PathBuf`| {{ todo() }} |
|`Vec<u8>` <sup>1</sup> |`x`|
|`&str`|`Vec::from(x.as_bytes())`|
|`&CStr`|`Vec::from(x.to_bytes_with_nul())`|
|`&OsStr`| {{ todo() }} |
|`&Path`| {{ todo() }} |
|`&[u8]` <sup>1</sup> |`x.to_vec()`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-5" name="tab-group-str" >
<label for="tab-str-5"><code>&str</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`x.as_str()`|
|`CString`|`x.to_str()?`|
|`OsString`|`x.to_str()?`|
|`PathBuf`|`x.to_str()?`|
|`Vec<u8>` <sup>1</sup> |`std::str::from_utf8(&x)?`|
|`&str`|`x`|
|`&CStr`|`x.to_str()?`|
|`&OsStr`|`x.to_str()?`|
|`&Path`|`x.to_str()?`|
|`&[u8]` <sup>1</sup> |`std::str::from_utf8(x)?`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-6" name="tab-group-str" >
<label for="tab-str-6"><code>&CStr</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`CString::new(x)?.as_c_str()`|
|`CString`|`x.as_c_str()`|
|`OsString` <sup>2</sup>|`x.to_str()?`|
|`PathBuf`| {{ todo() }}<sup>,4</sup> |
|`Vec<u8>` <sup>1</sup><sup>,5</sup> |`CStr::from_bytes_with_nul(&x)?`|
|`&str`| {{ todo() }}<sup>,4</sup> |
|`&CStr`|`x`|
|`&OsStr` <sup>2</sup>| {{ todo() }} |
|`&Path`| {{ todo() }} |
|`&[u8]` <sup>1</sup><sup>,5</sup> |`CStr::from_bytes_with_nul(x)?`|
|`*const c_char` <sup>1</sup> |`unsafe { CStr::from_ptr(x) }`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-8" name="tab-group-str" >
<label for="tab-str-8"><code>&OsStr</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`OsStr::new(&x)`|
|`CString`| {{ todo() }} |
|`OsString`|`x.as_os_str()`|
|`PathBuf`|`x.as_os_str()`|
|`Vec<u8>` <sup>1</sup> | {{ todo() }} |
|`&str`|`OsStr::new(x)`|
|`&CStr`| {{ todo() }} |
|`&OsStr`|`x`|
|`&Path`|`x.as_os_str()`|
|`&[u8]` <sup>1</sup> | {{ todo() }} |

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-85" name="tab-group-str" >
<label for="tab-str-85"><code>&Path</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`Path::new(x)` <sup>`r`</sup>|
|`CString`|`Path::new(x.to_str()?)` |
|`OsString`|`Path::new(x.to_str()?)` <sup>`r`</sup>|
|`PathBuf`|`Path::new(x.to_str()?)` <sup>`r`</sup>|
|`Vec<u8>` <sup>1</sup> | {{ todo() }} |
|`&str`|`Path::new(x)` <sup>`r`</sup>|
|`&CStr`|`Path::new(x.to_str()?)` |
|`&OsStr`|`Path::new(x)` <sup>`r`</sup>|
|`&Path`|`x`|
|`&[u8]` <sup>1</sup> | {{ todo() }} |

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-7" name="tab-group-str" >
<label for="tab-str-7"><code>&[u8]</code></label>
<panel><div class="stringconversion">

| If you **have** `x` of type ...| Use this ... |
| --- | --- |
|`String`|`x.as_bytes()`|
|`CString`|`x.as_bytes()`|
|`OsString`| {{ todo() }} |
|`PathBuf`| {{ todo() }} |
|`Vec<u8>` <sup>1</sup> |`&x`|
|`&str`|`x.as_bytes()`|
|`&CStr`|`x.to_bytes_with_nul()`|
|`&OsStr`| `x.as_bytes()` <sup>2</sup> |
|`&Path`| {{ todo() }} |
|`&[u8]` <sup>1</sup> |`x`|

</div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-str-9" name="tab-group-str" >
<label for="tab-str-9"><b>Other</b></label>
<panel><div class="stringconversion">

| You **want** | And **have** `x` | Use this ... |
| --- | --- | --- |
|<b>`*const c_char`</b>|<b>`CString`</b>|`x.as_ptr()`|


</div></panel></tab>

<!-- End tabs -->
</tabs>

<!-- End overflow protection -->
</div></div>


<footnotes>

<sup>i</sup> Short form `x.into()` possible if type can be inferred. <br>
<sup>r</sup> Short form `x.as_ref()` possible if type can be inferred.

<sup>1</sup> You should, or must if call is `unsafe`, ensure raw data comes with a valid representation for the string type (e.g., UTF-8 data for a `String`).

<sup>2</sup> Only on some platforms `std::os::<your_os>::ffi::OsStrExt` exists with helper methods to get a raw `&[u8]` representation of the underlying `OsStr`. Use the rest of the table to go from there, e.g.:

```
use std::os::unix::ffi::OsStrExt;
let bytes: &[u8] = my_os_str.as_bytes();
CString::new(bytes)?
```

<sup>3</sup> The `c_char` **must** have come from a previous `CString`. If it comes from FFI see `&CStr` instead.

<sup>4</sup> No known shorthand as `x` will lack terminating `0x0`. Best way to probably go via `CString`.

<sup>5</sup> Must ensure vector actually ends with `0x0`.

</footnotes>

{{ tablesep() }}


## String Formatting

Formatting applies to `print!`, `eprint!`, `write!` (and their -`ln` siblings like `println!`).
Each format argument is either empty `{}`, `{argument}`, or follows a basic [**syntax**](https://doc.rust-lang.org/std/fmt/index.html#syntax):


```
{ [argument] ':' [[fill] align] [sign] ['#'] [width [$]] ['.' precision [$]] [type] }
```

<div class="color-header undefined-color-3">

| Element |  Meaning |
|---------| ---------|
| `argument` |  Number (`0`, `1`, ...) or argument name, e.g., `print!("{x}", x = 3)`. |
| `fill` | The character to fill empty spaces with (e.g., `0`), if `width` is specified. |
| `align` | Left (`<`), center (`^`), or right (`>`), if width is specified. |
| `sign` | Can be `+` for sign to always be printed. |
| `#` | [Alternate formatting](https://doc.rust-lang.org/std/fmt/index.html#sign0), e.g. prettify Debug `?` or prefix hex with `0x`. |
| `width` | Minimum width (&geq; 0), padding with `fill` (default to space). If starts with `0`, zero-padded. |
| `precision` | Decimal digits (&geq; 0) for numerics, or max width for non-numerics. |
| `$` | Interpret `width` or `precision` as argument identifier instead to allow for dynamic formatting. |
| `type` | [**Debug**](https://doc.rust-lang.org/std/fmt/trait.Debug.html) (`?`) formatting, hex (`x`), binary (`b`), octal (`o`), pointer (`p`), exp (`e`) ... [see more](https://doc.rust-lang.org/std/fmt/index.html#traits). |

</div>


{{ tablesep() }}


<div class="color-header undefined-color-3">

| Example | Explanation |
|---------|-------------|
| `{:?}` | Print the next argument using Debug. |
| `{2:#?}` | Pretty-print the 3rd argument with Debug formatting. |
| `{val:^2$}` | Center the `val` named argument, width specified by the 3rd argument. |
| `{:<10.3}` | Left align with width 10 and a precision of 3.|
| `{val:#x}` | Format `val` argument as hex, with a leading `0x` (alternate format for `x`). |

</div>


{{ tablesep() }}



---

# Tooling


## Project Anatomy

Basic project layout, and common files and folders, as used by `cargo`. {{ below(target="#cargo") }}

<div class="color-header red">

| Entry | Code |
|--------| ---- |
| 📁 `benches/` | Benchmarks for your crate, run via **`cargo bench`**, requires nightly by default. <sup>*</sup> {{ experimental() }} |
| 📁 `examples/` | Examples how to use your crate, they see your crate like external user would.  |
| {{ tab() }} `my_example.rs` | Individual examples are run like **`cargo run --example my_example`**. |
| 📁 `src/` | Actual source code for your project. |
| {{ tab() }} `build.rs` |  **Pre-build script** {{ link(url="https://doc.rust-lang.org/cargo/reference/build-scripts.html") }}, e.g., when compiling C / FFI, needs to be specified in <code class="ignore-auto language-bash">Cargo.toml</code>. |
| {{ tab() }} `main.rs` | Default entry point for applications, this is what **`cargo run`** uses. |
| {{ tab() }} `lib.rs` | Default entry point for libraries. This is where lookup for `my_crate::f()` starts. |
| 📁 `tests/` | Integration tests go here, invoked via **`cargo test`**. Unit tests often stay in `src/` file. |
| `.rustfmt.toml` | In case you want to [**customize**](https://rust-lang.github.io/rustfmt/) how **`cargo fmt`** works. |
| `.clippy.toml` | Special configuration for certain [**clippy lints**](https://rust-lang.github.io/rust-clippy/master/index.html), utilized via **`cargo clippy`** |
| <code class="ignore-auto language-bash">Cargo.toml</code> | Main project configuration. Defines dependencies, artifacts ... |
| <code class="ignore-auto language-bash">Cargo.lock</code> | Dependency details for reproducible builds, recommended to `git` for apps, not for libs. |
</div>

<footnotes>

<sup>*</sup> On stable consider [Criterion](https://github.com/bheisler/criterion.rs).

</footnotes>


{{ tablesep() }}

<!-- Also not printing this table -->
<noprint>

**Minimal examples** for various entry points might look like:

<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-1" name="tab-group-anatomy" checked>
<label for="tab-anatomy-1"><b>Applications</b></label>
<panel><div>


<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// src/main.rs (default application entry point)

fn main() {
    println!("Hello, world!");
}
```

</div></div></div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-2" name="tab-group-anatomy" >
<label for="tab-anatomy-2"><b>Libraries</b></label>
<panel><div>

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// src/lib.rs (default library entry point)

pub fn f() {}      // Is a public item in root, so it's accessible from the outside.

mod m {
    pub fn g() {}  // No public path (`m` not public) from root, so `g`
}                  // is not accessible from the outside of the crate.
```
</div></div></div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-25" name="tab-group-anatomy" >
<label for="tab-anatomy-25"><b>Proc Macros</b></label>
<panel><div>


<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// src/lib.rs (default entry point for proc macros)

extern crate proc_macro;  // Apparently needed to be imported like this.

use proc_macro::TokenStream;

#[proc_macro_attribute]   // Can now be used as `#[my_attribute]`
pub fn my_attribute(_attr: TokenStream, item: TokenStream) -> TokenStream {
    item
}
```


```
// Cargo.toml

[package]
name = "my_crate"
version = "0.1.0"

[lib]
crate_type = ["proc-macro"]
```


</div></div></div></panel></tab>



<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-3" name="tab-group-anatomy" >
<label for="tab-anatomy-3"><b>Unit Tests</b></label>
<panel><div>

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// src/my_module.rs (any file of your project)

fn f() -> u32 { 0 }

#[cfg(test)]
mod test {
    use super::f;           // Need to import items from parent module. Has
                            // access to non-public members.
    #[test]
    fn ff() {
        assert_eq!(f(), 0);
    }
}
```
</div></div></div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-4" name="tab-group-anatomy" >
<label for="tab-anatomy-4"><b>Integration Tests</b></label>
<panel><div>

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// tests/sample.rs (sample integration test)

#[test]
fn my_sample() {
    assert_eq!(my_crate::f(), 123); // Integration tests (and benchmarks) 'depend' to the crate like
}                                   // a 3rd party would. Hence, they only see public items.
```
</div></div></div></panel></tab>



<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-5" name="tab-group-anatomy" >
<label for="tab-anatomy-5"><b>Benchmarks</b></label>
<panel><div>


<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// benches/sample.rs (sample benchmark)

#![feature(test)]   // #[bench] is still experimental

extern crate test;  // Even in '18 this is needed ... for reasons.
                    // Normally you don't need this in '18 code.

use test::{black_box, Bencher};

#[bench]
fn my_algo(b: &mut Bencher) {
    b.iter(|| black_box(my_crate::f())); // `black_box` prevents `f` from being optimized away.
}
```
</div></div></div></panel></tab>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-anatomy-6" name="tab-group-anatomy" >
<label for="tab-anatomy-6"><b>Build Scripts</b></label>
<panel><div>

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
// src/build.rs (sample pre-build script)

// Also specify in `Cargo.toml` like this:
// [package]
// build = "src/build.rs"


fn main() {
    // You need to rely on env. vars for target; `#[cfg(...)]` are for host.
    let target_os = env::var("CARGO_CFG_TARGET_OS");
}
```

<sup>*</sup>[See here for list](https://doc.rust-lang.org/cargo/reference/environment-variables.html#environment-variables-cargo-sets-for-build-scripts) of environment variables set.

</div></div></div></panel></tab>

</tabs>


<!-- End noprint of code examples -->
</noprint>


{{ tablesep() }}


**Modules** {{ book(page="ch07-02-defining-modules-to-control-scope-and-privacy.html") }} {{ ex(page="mod.html#modules") }} {{ ref(page="items/modules.html#modules") }} and **source files** work as follows:

- **Module tree** needs to be explicitly defined, is not implicitly built from **file system tree**. {{ link(url="http://www.sheshbabu.com/posts/rust-module-system/") }}
- **Module tree root** equals library, app, ... entry point (e.g., `lib.rs`).
- A `mod m {}` defines module in-file, while `mod m;` will read `m.rs` or `m/mod.rs`.
    - Path of `.rs` based on nesting, e.g., `mod a { mod b { mod c; }}}` is either `a/b/c.rs` or `a/b/c/mod.rs`.
    - Files not pathed from module tree root via some `mod m;` won't be touched by compiler! {{ bad() }}

<!-- - **Visibility** of items (e.g., functions, fields) between modules governed by: "Is there visible path to item?"
    - Visibility like `pub fn f() {}` does not mean "`f` is public", but "`f` at most public if all parents public`. -->


{{ tablesep() }}



## Cargo

Commands and tools that are good to know.


<div class="color-header tooling">

| Command | Description |
|--------| ---- |
| `cargo init` | Create a new project for the latest edition. |
| <code>cargo <span class="cargo-prefix">b</span>uild</code> | Build the project in debug mode (`--release` for all optimization). |
| <code>cargo <span class="cargo-prefix">c</span>heck</code> | Check if project would compile (much faster). |
| <code>cargo <span class="cargo-prefix">t</span>est</code> | Run tests for the project. |
| <code>cargo <span class="cargo-prefix">r</span>un</code> | Run your project, if a binary is produced (main.rs). |
| {{ tab() }} `cargo run --bin b` | Run binary `b`. Unifies features with other dependents (can be confusing). |
| {{ tab() }} `cargo run -p w` | Run main of sub-workspace `w`. Treats features more as you would expect. |
| <code>cargo doc --open</code> | Locally generate documentation for your code and dependencies. |
| `cargo rustc -- -Zunpretty=X` | Show more desugared Rust code, in particular with X being: |
| {{ tab() }} `expanded` |  Show with expanded macros, ... |
| <code>cargo +{nightly, stable} ...</code>  | Runs command with given toolchain, e.g., for 'nightly only' tools. |
| `rustup doc` | Open offline Rust documentation (incl. the books), good on a plane! |

</div>

<footnotes>

A command like <code>cargo <span class="cargo-prefix">b</span>uild</code> means you can either type `cargo build` or just `cargo b`.

</footnotes>


{{ tablesep() }}


These are optional `rustup` components.
Install them with `rustup component add [tool]`.


<div class="color-header tooling">

| Tool | Description |
|--------| ---- |
| `cargo clippy` | Additional ([lints](https://rust-lang.github.io/rust-clippy/master/)) catching common API misuses and unidiomatic code. {{ link(url = "https://github.com/rust-lang/rust-clippy") }} |
| `cargo fmt` | Automatic code formatter (`rustup component add rustfmt`). {{ link(url = "https://github.com/rust-lang/rustfmt") }} |

</div>

{{ tablesep() }}

A large number of additional cargo plugins [**can be found here**](https://crates.io/categories/development-tools::cargo-plugins?sort=downloads).


{{ tablesep() }}


## Cross Compilation

<!-- <div class="steps"> -->

<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

🔘 Check [target is supported](https://forge.rust-lang.org/release/platform-support.html).

🔘 Install target via **`rustup target install X`**.

🔘 Install native toolchain (required to _link_, depends on target).

Get from target vendor (Google, Apple, ...), might not be available on all hosts (e.g., no iOS toolchain on Windows).

**Some toolchains require additional build steps** (e.g., Android's `make-standalone-toolchain.sh`).

🔘 Update **`~/.cargo/config.toml`** like this:

```
[target.aarch64-linux-android]
linker = "[PATH_TO_TOOLCHAIN]/aarch64-linux-android/bin/aarch64-linux-android-clang"
```

   or

```
[target.aarch64-linux-android]
linker = "C:/[PATH_TO_TOOLCHAIN]/prebuilt/windows-x86_64/bin/aarch64-linux-android21-clang.cmd"
```

🔘 Set **environment variables** (optional, wait until compiler complains before setting):

```
set CC=C:\[PATH_TO_TOOLCHAIN]\prebuilt\windows-x86_64\bin\aarch64-linux-android21-clang.cmd
set AR=C:\[PATH_TO_TOOLCHAIN]\prebuilt\windows-x86_64\bin\aarch64-linux-android-ar.exe
...
```

Whether you set them depends on how compiler complains, not necessarily all are needed.

> Some platforms / configurations can be **extremely sensitive** how paths are specified (e.g., `\` vs `/`) and quoted.


✔️ Compile with **`cargo build --target=X`**


<!-- End overflow area -->
</div>
</div>

<!-- End steps  -->
<!-- </div> -->

{{ tablesep() }}

---

# Coding Guides


## Idiomatic Rust

If you are used to programming Java or C, consider these.

<div class="color-header blue">

| Idiom | Code |
|--------| ---- |
| **Think in Expressions** | `x = if x { a } else { b };` |
|  | `x = loop { break 5 };`  |
|  | `fn f() -> u32 { 0 }`  |
| **Think in Iterators** | `(1..10).map(f).collect()` |
|  | <code>names.iter().filter(&vert;x&vert; x.starts_with("A"))</code> |
| **Handle Absence with `?`** | `x = try_something()?;` |
|  | `get_option()?.run()?` |
| **Use Strong Types** | `enum E { Invalid, Valid { ... } }` over `ERROR_INVALID = -1` |
|  | `enum E { Visible, Hidden }` over `visible: bool` |
|  | `struct Charge(f32)` over `f32` |
| **Provide Builders** | `Car::new("Model T").hp(20).build();` |
| **Split Implementations** | Generic types `S<T>` can have a separate `impl` per `T`. |
|   | Rust doesn't have OO, but with separate `impl` you can get specialization. |
| **Unsafe** | Avoid `unsafe {}`, often safer, faster solution without it. Exception: FFI. |
| **Implement Traits** | `#[derive(Debug, Copy, ...)]` and custom `impl` where needed.|
| **Tooling** | With [**clippy**](https://github.com/rust-lang/rust-clippy) you can improve your code quality. |
|  | Formatting with [**rustfmt**](https://github.com/rust-lang/rustfmt) helps others to read your code. |
|  | Add **unit tests** {{ book(page="ch11-01-writing-tests.html") }} (`#[test]`) to ensure your code works. |
|  | Add **doc tests** {{ book(page="ch14-02-publishing-to-crates-io.html") }} (` ``` my_api::f() ``` `) to ensure docs match code. |
| **Documentation** | Annotate your APIs with doc comments that can show up on [**docs.rs**](https://docs.rs). |
|  | Don't forget to include a **summary sentence** and the **Examples** heading. |
|  | If applicable: **Panics**, **Errors**, **Safety**, **Abort** and **Undefined Behavior**. |

</div>



{{ tablesep() }}

> 🔥 We **highly** recommend you also follow the
> [**API Guidelines**](https://rust-lang.github.io/api-guidelines/) ([**Checklist**](https://rust-lang.github.io/api-guidelines/checklist.html))
> for any shared project! 🔥


{{ tablesep() }}



## Async-Await 101

If you are familiar with async / await in C# or TypeScript, here are some things to keep in mind:


<tabs class="color-header orange">

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-async-1" name="tab-async" checked>
<label for="tab-async-1"><b>Basics</b></label>
<panel><div>



| Construct | Explanation |
|---------|-------------|
| `async`  | Anything declared `async` always returns an `impl Future<Output=_>`. {{ std(page="std/future/trait.Future.html") }} |
| {{ tab() }} `async fn f() {}`  | Function `f` returns an `impl Future<Output=()>`. |
| {{ tab() }} `async fn f() -> S {}`  | Function `f` returns an `impl Future<Output=S>`. |
| {{ tab() }} `async { x }`  | Transforms `{ x }` into an `impl Future<Output=X>`. |
| `let sm = f();   ` | Calling `f()` that is `async` will **not** execute `f`, but produce state machine `sm`. {{ note(note="1") }} {{ note(note="2") }} |
| {{ tab() }} `sm = async { g() };`  | Likewise, does **not** execute the `{ g() }` block; produces state machine. |
| `runtime.block_on(sm);`  | Outside an `async {}`, schedules `sm` to actually run. Would execute `g()`. {{ note(note="3") }} {{ note(note="4") }}|
| `sm.await` | Inside an `async {}`, run `sm` until complete. Yield to runtime if `sm` not ready. |


<footnotes>

{{ note(note="1") }} Technically `async` transforms following code into anonymous, compiler-generated state machine type; `f()` instantiates that machine. <br>
{{ note(note="2") }} The state machine always `impl Future`, possibly `Send` & co, depending on types used inside `async`. <br>
{{ note(note="3") }} State machine driven by worker thread invoking `Future::poll()` via runtime directly, or parent `.await` indirectly. <br>
{{ note(note="4") }} Rust doesn't come with runtime, need external crate instead, e.g., [async-std](https://github.com/async-rs/async-std) or [tokio 0.2+](https://crates.io/crates/tokio). Also, more helpers in [futures crate](https://github.com/rust-lang-nursery/futures-rs).

</footnotes>



</div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-async-2" name="tab-async">
<label for="tab-async-2"><b>Execution Flow</b></label>
<panel><div>


At each `x.await`, state machine passes control to subordinate state machine `x`. At some point a low-level state machine invoked via `.await` might not be ready. In that the case worker
thread returns all the way up to runtime so it can drive another Future. Some time later the runtime:
- **might** resume execution. It usually does, unless `sm` / `Future` dropped.
- **might** resume with the previous worker **or another** worker thread (depends on runtime).

Simplified diagram for code written inside an `async` block :


<!-- Create a horizontal scrollable area on small displays to preserve layout-->
<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```
       consecutive_code();           consecutive_code();           consecutive_code();
START --------------------> x.await --------------------> y.await --------------------> READY
// ^                          ^     ^                               Future<Output=X> ready -^
// Invoked via runtime        |     |
// or an external .await      |     This might resume on another thread (next best available),
//                            |     or NOT AT ALL if Future was dropped.
//                            |
//                            Execute `x`. If ready: just continue execution; if not, return
//                            this thread to runtime.
```

</div>
</div>

</div></panel></tab>



<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-async-3" name="tab-async">
<label for="tab-async-3"><b>Caveats</b></label>
<panel><div>


With the execution flow in mind, some considerations when writing code inside an `async` construct:

<div class="color-header orange">


| Constructs {{ note(note="1") }} | Explanation |
|---------|-------------|
| `sleep_or_block();` | Definitely bad {{ bad() }}, never halt current thread, clogs executor. |
| `set_TL(a); x.await; TL();` | Definitely bad {{ bad() }}, `await` may return from other thread, [thread local](https://doc.rust-lang.org/std/macro.thread_local.html) invalid. |
| `s.no(); x.await; s.go();` | Maybe bad {{ bad() }}, `await` will [not return](http://www.randomhacks.net/2019/03/09/in-nightly-rust-await-may-never-return/) if `Future` dropped while waiting. {{ note(note="2") }} |
| `Rc::new(); x.await; rc();` | Non-`Send` types prevent `impl Future` from being `Send`; less compatible. |

</div>

<footnotes>

{{ note(note="1") }} Here we assume `s` is any non-local that could temporarily be put into an invalid state;
`TL` is any thread local storage, and that the `async {}` containing the code is written
without assuming executor specifics. <br/>
{{ note(note="2") }} Since [Drop](https://doc.rust-lang.org/std/ops/trait.Drop.html) is run in any case when `Future` is dropped, consider using drop guard that cleans up / fixes application state if it has to be left in bad condition across `.await` points.

</footnotes>

</div></panel></tab>

<!-- end tabs -->
</tabs>


{{ tablesep() }}


## Closures in APIs

There is a subtrait relationship `Fn` : `FnMut` : `FnOnce`. That means a closure that
implements `Fn` {{ std(page="std/ops/trait.Fn.html") }} also implements `FnMut` and `FnOnce`. Likewise a closure
that implements `FnMut` {{ std(page="std/ops/trait.FnMut.html") }} also implements `FnOnce`. {{ std(page="std/ops/trait.FnOnce.html") }}

From a call site perspective that means:

<div class="color-header green">

| Signature | Function `g` can call ... |  Function `g` accepts ... |
|--------| -----------| -----------|
| `g<F: FnOnce()>(f: F)`  | ... `f()` once. |  `Fn`, `FnMut`, `FnOnce`  |
| `g<F: FnMut()>(mut f: F)`  | ... `f()` multiple times. | `Fn`, `FnMut` |
| `g<F: Fn()>(f: F)`  | ... `f()` multiple times.  | `Fn` |

</div>

<footnotes>

Notice how **asking** for a `Fn` closure as a function is
most restrictive for the caller; but **having** a `Fn`
closure as a caller is most compatible with any function.

</footnotes>



{{ tablesep() }}

From the perspective of someone defining a closure:

<div class="color-header green">

| Closure | Implements<sup>*</sup> | Comment |
|--------| -----------| --- |
| <code> &vert;&vert; { moved_s; } </code> | `FnOnce` | Caller must give up ownership of `moved_s`. |
| <code> &vert;&vert; { &mut s; } </code> | `FnOnce`, `FnMut` | Allows `g()` to change caller's local state `s`. |
| <code> &vert;&vert; { &s; } </code> | `FnOnce`, `FnMut`, `Fn` | May not mutate state; but can share and reuse `s`. |

</div>

<div class="footnotes">

<sup>*</sup> Rust [prefers capturing](https://doc.rust-lang.org/stable/reference/expressions/closure-expr.html) by reference
(resulting in the most "compatible" `Fn` closures from a caller perspective), but can be
forced to capture its environment by copy or move via the
`move || {}` syntax.

</div>

{{ tablesep() }}

That gives the following advantages and disadvantages:

<div class="color-header green">

| Requiring | Advantage | Disadvantage |
|--------| -----------| -----------|
| `F: FnOnce`  | <span class="good">Easy to satisfy as caller.</span> | <span class="bad">Single use only, `g()` may call `f()` just once.</span> |
| `F: FnMut`  | <span class="good">Allows `g()` to change caller state.</span> | <span class="bad">Caller may not reuse captures during `g()`.</span> |
| `F: Fn`  | <span class="good">Many can exist at same time.</span> | <span class="bad">Hardest to produce for caller.</span> |

</div>


{{ tablesep() }}




## Unsafe, Unsound, Undefined

Unsafe leads to unsound. Unsound leads to undefined. Undefined leads to the dark side of the force.


<tabs>

<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-unsafe-1" name="tab-unsafe" checked>
<label for="tab-unsafe-1"><b>Unsafe Code</b></label>
<panel><div>


**Unsafe Code**

- Code marked `unsafe` has special permissions, e.g., to deref raw pointers, or invoke other `unsafe` functions.
- Along come special **promises the author _must_ uphold to the compiler**, and the compiler _will_ trust you.
- By itself `unsafe` code is not bad, but dangerous, and needed for FFI or exotic data structures.

<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```rust
// `x` must always point to race-free, valid, aligned, initialized u8 memory.
unsafe fn unsafe_f(x: *mut u8) {
    my_native_lib(x);
}
```
</div></div></div></panel></tab>


<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-unsafe-2" name="tab-unsafe" >
<label for="tab-unsafe-2"><b>Undefined Behavior</b></label>
<panel><div>


**Undefined Behavior (UB)**
- As mentioned, `unsafe` code implies [special promises](https://doc.rust-lang.org/stable/reference/behavior-considered-undefined.html) to the compiler (it wouldn't need be `unsafe` otherwise).
- Failure to uphold any promise makes compiler produce fallacious code, execution of which leads to UB.
- After triggering undefined behavior _anything_ can happen. Insidiously, the effects may be 1) subtle, 2) manifest far away from the site of violation or 3) be visible only under certain conditions.
- A seemingly _working_ program (incl. any number of unit tests) is no proof UB code might not fail on a whim.
- Code with UB is objectively dangerous, invalid and should never exist.

<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">


```rust
if maybe_true() {
   let r: &u8 = unsafe { &*ptr::null() };    // Once this runs, ENTIRE app is undefined. Even if
} else {                                     // line seemingly didn't do anything, app might now run
    println!("the spanish inquisition");     // both paths, corrupt database, or anything else.
}
```
</div></div></div></panel></tab>



<!-- NEW TAB -->
<tab>
<input type="radio" id="tab-unsafe-3" name="tab-unsafe" >
<label for="tab-unsafe-3"><b>Unsound Code</b></label>
<panel><div>


**Unsound Code**
- Any _safe_ Rust that could (even only theoretically) produce UB for any user input is always **unsound**.
- As is `unsafe` code that may invoke UB on its own accord by violating above-mentioned promises.
- Unsound code is a stability and security risk, and violates basic assumption many Rust users have.

<div style="overflow:auto;">
<div style="min-width: 100%; width: 650px;">

```rust
fn unsound_ref<T>(x: &T) -> &u128 {      // Signature looks safe to users. Happens to be
    unsafe { mem::transmute(x) }         // ok if invoked with an &u128, UB for practically
}                                        // everything else.
```

</div></div></div></panel></tab>

</tabs>

{{ tablesep() }}

>
> **Responsible use of Unsafe**
>
> - Do not use `unsafe` unless you absolutely have to.
> - Follow the [Nomicon](https://doc.rust-lang.org/nightly/nomicon/), [Unsafe Guidelines](https://rust-lang.github.io/unsafe-code-guidelines/), **always** uphold **all** safety invariants, and **never** invoke [UB](https://doc.rust-lang.org/stable/reference/behavior-considered-undefined.html).
> - Minimize the use of `unsafe` and encapsulate it in small, sound modules that are easy to review.
> - Each `unsafe` unit should be accompanied by plain-text reasoning outlining its safety.



{{ tablesep() }}



## API Stability

When updating an API, these changes can break client code.{{ rfc(page="1105-api-evolution.html") }} Major changes (🔴) are **definitely breaking**, while minor changes (🟡) **might be breaking**:

<div class="color-header api-stability">


{{ tablesep() }}

| Crates |
|---------|
| 🔴 Making a crate that previously compiled for _stable_ require _nightly_. |
| 🟡 Altering use of Cargo features (e.g., adding or removing features). |

{{ tablesep() }}


| Modules |
|---------|
| 🔴 Renaming / moving / removing any public items. |
| 🟡 Adding new public items, as this might break code that does `use your_crate::*`. |

{{ tablesep() }}

| Structs |
|---------|
| 🔴 Adding private field when all current fields public. |
| 🔴 Adding public field when no private field exists. |
| 🟡 Adding or removing private fields when at least one already exists (before and after the change). |
| 🟡 Going from a tuple struct with all private fields (with at least one field) to a normal struct, or vice versa. |

{{ tablesep() }}

| Enums |
|---------|
| 🔴 Adding new variants. |
| 🔴 Adding new fields to a variant. |


{{ tablesep() }}

| Traits |
|---------|
| 🔴 Adding a non-defaulted item, breaks all existing `impl T for S {}`. |
| 🔴 Any non-trivial change to item signatures, will affect either consumers or implementors. |
| 🟡 Adding a defaulted item; might cause dispatch ambiguity with other existing trait. |
| 🟡 Adding a defaulted type parameter. |

{{ tablesep() }}

| Traits |
|---------|
| 🔴 Implementing any "fundamental" trait, as _not_ implementing a fundamental trait already was a promise. |
| 🟡 Implementing any non-fundamental trait; might also cause dispatch ambiguity. |

{{ tablesep() }}

| Inherent Implementations |
|---------|
| 🟡 Adding any inherent items; might cause clients to prefer that over trait fn and produce compile error. |

{{ tablesep() }}

| Signatures in Type Definitions |
|---------|
| 🔴 Tightening bounds (e.g., `<T>` to `<T: Clone>`). |
| 🟡 Loosening bounds. |
| 🟡 Adding defaulted type parameters. |
| 🟡 Generalizing to generics. |

| Signatures in Functions |
|---------|
| 🔴 Adding / removing arguments. |
| 🟡 Introducing a new type parameter. |
| 🟡 Generalizing to generics. |


{{ tablesep() }}

| Behavioral Changes |
|---------|
| 🔴 / 🟡 _Changing semantics might not cause compiler errors, but might make clients do wrong thing._ |


</div>


{{ tablesep() }}



<!-- Don't render this section for printing, won't be helpful -->
<noprint>

---

# Misc


## Links & Services

These are other great guides and tables.


<div class="color-header lavender">


<!-- This is for major other "cheat sheet" like material on the web. Main question when adding: does it add something
    significant not found elsewhere? -->
| Cheat Sheets | Description |
|--------| -----------|
| [Rust Learning⭐](https://github.com/ctjhoa/rust-learning) | Probably the best collection of links about learning Rust.  |
| [Functional Jargon in Rust](https://github.com/JasonShin/functional-programming-jargon.rs) | A collection of functional programming jargon explained in Rust.  |
| [Periodic Table of Types](http://cosmic.mearie.org/2014/01/periodic-table-of-rust-types) | How various types and references correlate. |
| [Futures](https://rufflewind.com/img/rust-futures-cheatsheet.html) | How to construct and work with futures. |
| [Rust Iterator Cheat Sheet](https://danielkeep.github.io/itercheat_baked.html) | Summary of iterator-related methods from `std::iter` and `itertools`. |
| [Type-Based Rust Cheat Sheet](https://upsuper.github.io/rust-cheatsheet/) | Lists common types and how they convert. |

</div>


{{ tablesep() }}


All major Rust books developed by the community.


<div class="color-header lavender">

<!-- Official Rust online "books" about Rust itself or major components (e.g., WebAssembly, Embedded, ...). Good test
    for inclusion can be official community involvement, +1k Github stars, ... -->
| Books&nbsp;️📚  | Description |
|--------| -----------|
| [The Rust Programming Language](https://doc.rust-lang.org/stable/book/) | Standard introduction to Rust, **start here if you are new**. |
| {{ tab() }} [API Guidelines](https://rust-lang.github.io/api-guidelines/) | How to write idiomatic and re-usable Rust. |
| {{ tab() }} [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/)  {{ experimental() }} | Explains `async` code, `Futures`, ... |
| {{ tab() }} [Edition Guide](https://doc.rust-lang.org/nightly/edition-guide/) | Working with Rust 2015, Rust 2018, and beyond.  |
| {{ tab() }} [Guide to Rustc Development](https://rustc-dev-guide.rust-lang.org/index.html) | Explains how the compiler works internally. |
| {{ tab() }} [Little Book of Rust Macros](https://danielkeep.github.io/tlborm/book/index.html) {{ experimental() }}| Community's collective knowledge of Rust macros. |
| {{ tab() }} [Reference](https://doc.rust-lang.org/stable/reference/) {{ experimental() }}  | Reference of the Rust language.  |
| {{ tab() }} [RFC Book ](https://rust-lang.github.io/rfcs/) | Look up accepted RFCs and how they change the language. |
| {{ tab() }} [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/) | Collection of simple examples that demonstrate good practices. |
| {{ tab() }} [Rustdoc Book](https://doc.rust-lang.org/stable/rustdoc/) | Tips how to customize `cargo doc` and `rustdoc`. |
| {{ tab() }} [Rustonomicon](https://doc.rust-lang.org/nomicon/) | Dark Arts of Advanced and Unsafe Rust Programming. |
| {{ tab() }} [Unsafe Code Guidelines](https://rust-lang.github.io/unsafe-code-guidelines/)  {{ experimental() }} | Concise information about writing `unsafe` code. |
| {{ tab() }} [Unstable Book](https://doc.rust-lang.org/unstable-book/index.html) | Information about unstable items, e.g, `#![feature(...)]`.  |
| [The Cargo Book](https://doc.rust-lang.org/cargo/) | How to use `cargo` and write `Cargo.toml`. |
| [The CLI Book](https://rust-lang-nursery.github.io/cli-wg/) | Information about creating CLI tools. |
| [The Embedded Book](https://docs.rust-embedded.org/book/intro/index.html) | Working with embedded and `#![no_std]` devices. |
| {{ tab() }} [The Embedonomicon](https://docs.rust-embedded.org/embedonomicon/) | First `#![no_std]` from scratch on a Cortex-M. |
| [The WebAssembly Book](https://rustwasm.github.io/docs/book/) | Working with the web and producing `.wasm` files. |
| {{ tab() }} [The `wasm-bindgen` Guide](https://rustwasm.github.io/docs/wasm-bindgen/) | How to bind Rust and JavaScript APIs in particular. |

</div>

<!-- Disabled for now as looks abandoned w/o content -->
<!-- | {{ tab() }} [SIMD Performance Guide](https://rust-lang.github.io/packed_simd/perf-guide/) {{ experimental() }} | Work with `u8x32` or `f32x8` to speed up your computations.  | -->


{{ tablesep() }}

Comprehensive lookup tables for common components.

<div class="color-header lavender">

<!-- Table-like sites, often auto-generated. -->
| Tables&nbsp;📋| Description |
|--------| -----------|
| [Rust Changelog](https://github.com/rust-lang/rust/blob/master/RELEASES.md) | See all the things that changed in a particular version. |
| [Rust Forge](https://forge.rust-lang.org/) | Lists release train and links for people working on the compiler. |
| {{ tab() }} [Rust Platform Support](https://forge.rust-lang.org/release/platform-support.html) | All supported platforms and their Tier. |
| {{ tab() }} [Rust Component History](https://rust-lang.github.io/rustup-components-history/) | Check **nightly** status of various Rust tools for a platform. |
| [ALL the Clippy Lints](https://rust-lang.github.io/rust-clippy/master/) | All the [**clippy**](https://github.com/rust-lang/rust-clippy) lints you might be interested in. |
| [Configuring Rustfmt](https://rust-lang.github.io/rustfmt/) | All [**rustfmt**](https://github.com/rust-lang/rustfmt) options you can use in `.rustfmt.toml`. |
| [Compiler Error Index](https://doc.rust-lang.org/error-index.html) | Ever wondered what `E0404` means? |
</div>

{{ tablesep() }}


Online services which provide information or tooling.

<div class="color-header lavender">

<!-- Other online web services related to Rust. As a heuristic, things here should
    be essential (or at least address a major concern as "best of class") and be
    a self-contained, user-facing web site. -->
| Services&nbsp;⚙️ | Description |
|--------| -----------|
| [crates.io](https://crates.io/) | All 3rd party libraries for Rust. |
| [std.rs](https://std.rs/) | Shortcut to `std` documentation. |
| [docs.rs](https://docs.rs/) | Documentation for 3rd party libraries, automatically generated from source. |
| [lib.rs](https://lib.rs/) | Unofficial overview of quality Rust libraries and applications. |
| [caniuse.rs](https://caniuse.rs/) | Check which feature is available on which edition. |
| [Rust Playground](https://play.rust-lang.org/) | Try and share snippets of Rust code. |

</div>

{{ tablesep() }}


## Printing & PDF

> Want this Rust cheat sheet as a PDF download? <a href="javascript:window.print()"><b>Generate PDF</b></a> (or select File > Print – might take 10s so) and then "Save as PDF". It looks great in both Firefox's and Chrome's PDF exports. Alternatively use the <a href="https://github.com/ralfbiedert/cheats.rs/releases/download/2020-02-08/rust_cheat_sheet.pdf"><b>cached PDF</b></a>.

</noprint>

<footer>

[Ralf Biedert](https://xr.io), {{ year() }} – [cheats.rs](https://cheats.rs) <br/><br/> [Legal & Privacy](legal)

</footer>

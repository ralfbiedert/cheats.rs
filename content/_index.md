+++
weight = 1
sort_by = "weight"
+++

<img id="logo" src="/logo.png"></img>
<div class="title">Rust Language Cheat Sheet</div>
<div class="subtitle">{{ date() }}</div>


>  Where appropriate, this document will link to the corresponding sections in the
>  **The Book** {{ book(page="") }},
>  **Rust by Example** {{ ex(page="") }},
>  **Std Docs** {{ std(page="std")}},
>  **Nomicon** {{ nom(page="")}},
>  **Reference** {{ ref(page="")}}.

# Sigils

List of most _sigils_ and _symbols_ usually found in Rust.


### Code Generation

Constructs expanded before the actual compilation happens.

<div class="cheats">

| Example |  Explanation |
|---------|---------|
| `m!` |  Invocation preamble for **macros**. {{book(page="appendix-04-macros.html")}} {{std(page="std/index.html#macros")}} {{ref(page="macros.html")}} |
| `$x:ty`  | Macro capture in macros by example. |
| `$x` |  Macro substitution in **macros by example**. {{book(page="appendix-04-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming")}} {{ex(page="macros.html#macro_rules")}} {{ref(page="macros-by-example.html")}}
| `$(x),*` | Macro repetition in macros by example. |
| `#[attr]`  | Outer **attribute**. {{ex(page="attribute.html")}} {{ref(page="attributes.html")}} |
| `#![attr]` | Inner attribute. |

</div>


### References & Pointers

Granting access to un-owned memory.


<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `&x` | Immutable **borrow**.  {{ book(page="ch04-02-references-and-borrowing.html") }} {{ ex(page="scope/borrow.html") }} {{ std(page="std/borrow/trait.Borrow.html") }} |
| `&T` | Immutable safe pointer type, aka **reference**.  {{ book(page="ch04-02-references-and-borrowing.html") }} {{ std(page="std/primitive.reference.html") }} {{ nom(page="references.html")}} {{ ref(page="types.html#pointer-types")}} |
| `&mut x` | Borrow that allows **mutability**. {{ ex(page="scope/borrow/mut.html") }} |
| `&mut T` | Reference that allows mutability. |
| `*const T` | Immutable **raw pointer type** {{ book(page="ch19-01-unsafe-rust.html#dereferencing-a-raw-pointer") }} {{ std(page="std/primitive.pointer.html") }} {{ ref(page="types.html#raw-pointers-const-and-mut") }}. |
| `*mut T` | Mutable raw pointer type. |
| `*x` | **Dereference**.  {{ book(page="ch15-02-deref.html") }} {{ std(page="std/ops/trait.Deref.html") }} {{ nom(page="vec-deref.html") }} |
| `'a`  | Often seen as `&'a T`, a **lifetime parameter**. {{ book(page="ch10-00-generics.html") }} {{ ex(page="scope/lifetime.html")}} {{ nom(page="lifetimes.html") }} {{ ref(page="items/generics.html#type-and-lifetime-parameters")}} |

</div>

### Entity Creation & Usage

Creation and usage of various built-in types.


<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S { x: y }` | Field initializer for **structs** {{ book(page="ch05-00-structs.html") }} {{ ex(page="custom_types/structs.html") }} {{ std(page="std/keyword.struct.html") }} {{ ref(page="expressions/struct-expr.html") }} |
| `S { x }` | Use local variable `x` for field `x` when creating struct. |
| `S { ..x }` | Fill remaining fields from `x`, esp. useful with [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `()` | Empty tuple, both literal and type, aka **unit** {{ std(page="std/primitive.unit.html") }} |
| `(x)` | Parenthesized expression |
| `(x,)` | Single-element **tuple** expression {{ ex(page="primitives/tuples.html") }} {{ std(page="std/primitive.tuple.html") }} {{ ref(page="expressions/tuple-expr.html") }} |
| `(T,)` | Single-element tuple type |
| `[T; n]` | **Array** {{ ex(page="primitives/array.html") }}  {{ std(page="std/primitive.array.html") }} {{ ref(page="expressions/array-expr.html") }} with `n` copies of `T`'s [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `[x; n]` | Array with `n` copies of `x`. |
| `[x, y]` | Array with given elements. |
| `x[0]` | Collection indexing. Overloadable [Index](https://doc.rust-lang.org/std/ops/trait.Index.html), [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html) |
| `x[..]` | Collection slice-like indexing via [RangeFull](https://doc.rust-lang.org/std/ops/struct.RangeFull.html), _c_. **slices**  {{ std(page="std/primitive.slice.html") }}  {{ ex(page="primitives/array.html") }}  {{ ref(page="types.html#array-and-slice-types") }} |
| `x[a..]` | Collection slice-like indexing via [RangeFrom](https://doc.rust-lang.org/std/ops/struct.RangeFrom.html). |
| `x[..b]` | Collection slice-like indexing [RangeTo](https://doc.rust-lang.org/std/ops/struct.RangeTo.html). |
| `x[a..b]` | Collection slice-like indexing via [Range](https://doc.rust-lang.org/std/ops/struct.Range.html). |
| `a..b` | Right-exclusive **range** {{ ref(page="expressions/range-expr.html") }} creation, also seen as `..`, `a..`, `..b`.  |
| `a..=b` | Inclusive range creation, also seen as `..=b`. |
| `x.i` | Member **access** {{ ref(page="expressions/field-expr.html") }} |
| `x.0` | Tuple access |

</div>

### Generics & Constraints

Code that works with more than one type.


<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S<T>`  | A **generic** {{ book(page="ch10-01-syntax.html") }} {{ ex(page="generics.html") }} type with a type parameter.  |
| `S<T = R>` | **Default type parameter** {{ book(page="ch19-03-advanced-traits.html#default-generic-type-parameters-and-operator-overloading") }}, or **associated type**. {{ book(page="ch19-03-advanced-traits.html#specifying-placeholder-types-in-trait-definitions-with-associated-types") }} {{ ex(page="generics/assoc_items/types.html") }} {{ ref(page="items/associated-items.html#associated-types") }} |
| `<'_>` | Inferred **anonymous lifetime**. {{ book(page="ch19-02-advanced-lifetimes.html#the-anonymous-lifetime") }} |
| `<_>` | Inferred **anonymous type**. {{ todo() }} |
| `T: R`  | Type **trait bound** {{ book(page="ch10-02-traits.html#using-trait-bounds-to-conditionally-implement-methods") }} {{ ex(page="generics/bounds.html") }} |
| `T: 'a` | Type **lifetime bound** {{ ex(page="scope/lifetime/lifetime_bounds.html") }} |
| `T: R + S`  | **Compound type bound** {{ book(page="ch10-02-traits.html#multiple-trait-bounds-with-") }} {{ ex(page="generics/multi_bounds.html") }}, also seen as `T: R + 'a` |
| `T::<S>` | **Turbofish** {{ std(page="std/iter/trait.Iterator.html#method.collect")}} call site type disambiguation.  |
| `'b: 'a` | Lifetime `'b` must live at least as long as `'a`. |
| `for<'a>` | **Higher-rank trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |
| `!Send`          | Disable an automatically derived trait. {{ todo() }} |
| `?Sized`         | Opt out of a pre-defined trait bound. {{ todo() }} |

</div>

### Program Structure & Flow

Ubiquitous constructs for code structure and execution flow.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `a::b` | Namespace **path**. {{ book(page="ch07-03-importing-names-with-use.html") }} {{ ex(page="mod/use.html") }} {{ ref(page="paths.html")}} |
| `'a: loop` | Loop label. {{ ex(page="flow_control/loop/nested.html") }} {{ ref(page="expressions/loop-expr.html#loop-labels")}} |
| <code>\|x\|</code> | Parameter binder for **closures**. {{ book(page="ch13-01-closures.html") }} {{ ex(page="fn/closures.html") }} {{ ref(page="expressions/closure-expr.html")}} |
| `x;` | **Statement** {{ ref(page="statements.html")}} terminator, _c_. **expressions** {{ ex(page="expression.html") }} {{ ref(page="expressions.html")}} |
| `x?` | Early return **error propagation**. {{ book(page="ch09-02-recoverable-errors-with-result.html#propagating-errors") }} {{ ex(page="error/result/enter_question_mark.html") }} {{ std(page="std/result/index.html#the-question-mark-operator-") }} {{ ref(page="expressions/operator-expr.html#the-question-mark-operator")}} |

</div>



### Pattern Matching


These sigils are only found within `match` blocks.

<div class="cheats">


| Example | Explanation |
|---------|-------------|
|  `p => x` | Part of match arm syntax in **pattern matching**. {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }} |
| `x @ p` | **Pattern binding** {{ book(page="ch18-03-pattern-syntax.html#a-bindings") }} {{ ex(page="flow_control/match/binding.html#binding") }} in match arms.  |
| <code>p \| q</code> | Pattern alternatives (or-patterns). |

</div>


### Strings & Chars

Rust has several ways to create string or char literals, depending on your needs.


<div class="cheats">

| Example | Explanation |
|--------|-------------|
| `"..."` | **String literal** {{ ref(page="tokens.html#string-literals")}}, will escape `\n`, ... |
| `r"..."`, | **Raw string literal**. {{ ref(page="tokens.html#raw-string-literals")}}, won't escape `\n`, ... |
| `r#"..."#`, etc. | Raw string literal, but can also contain `"`. |
| `b"..."` | **Byte string literal** {{ ref(page="tokens.html#byte-and-byte-string-literals")}}; constructs ASCII `[u8]`, not a string. |
| `br"..."`, `br#"..."#`, etc. | Raw byte string literal, combination of the above. |
| `'🦀'` | **Character literal** {{ ref(page="tokens.html#character-and-string-literals")}}, can contain unicode. |
| `b'x'` | ASCII **byte literal**. {{ ref(page="tokens.html#byte-literals")}} |

</div>


### Comments

No comment.

<div class="cheats">

| Example | Explanation |
|--------|-------------|
| `//` | Line comment. |
| `//!` | Inner line **doc comment**. {{ book(page="ch14-02-publishing-to-crates-io.html#making-useful-documentation-comments") }} {{ ex(page="meta/doc.html#documentation") }} {{ ref(page="comments.html#doc-comments")}} |
| `///` | Outer line doc comment. |
| `/*...*/` | Block comment. |
| `/*!...*/` | Inner block doc comment. |
| `/**...*/` | Outer block doc comment. |

</div>



### Miscellaneous

These sigils did not fit any other category but are good to know nonetheless.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `!` | Always empty **never type**. {{ book(page="ch19-04-advanced-types.html#the-never-type-that-never-returns") }} {{ ex(page="fn/diverging.html#diverging-functions") }} {{ std(page="std/primitive.never.html") }} {{ ref(page="types.html?highlight=never#never-type") }} |
| `_` | Unnamed variable binding, e.g., <code>\|x, _\| { ... }</code>.|
| `_x` | Variable binding explicitly marked as unused. |
| `1_234_567` | Numeric separator for visual clarity. |
| `1u8` | Type specifier for **numeric literals** {{ ex(page="types/literals.html#literals") }} {{ ref(page="tokens.html#number-literals") }}  (also `i8`, `u16`, ...). |
| `r#foo` | A **raw identifier** {{ book(page="appendix-01-keywords.html?highlight=raw,iten#raw-identifiers") }} {{ ex(page="compatibility/raw_identifiers.html?highlight=raw,iden#raw-identifiers") }} for edition compatibility. |

</div>




### Common Operators

Rust supports all common operators you would expect to find in a language (`+`, `*`, `%`, `=`, `==`...).
Since they behave no differently in Rust we do not list them here.
For some of them Rust also support **operator overloading**. {{ std(page="std/ops/index.html")}}



# Keywords

<div class="keywords">
<!-- |  | `? as ?`  | Imports. | -->


| Keyword | Example | Explanation |
|--------|----| -----------|
| `as` | `x as u32`  | Primitive **cast** {{ ex(page="types/cast.html#casting") }} {{ ref(page="expressions/operator-expr.html#type-cast-expressions") }}, may truncate and more. {{ nom(page="casts.html") }} |
| ~ | `T as S`  | Trait **disambiguation**. {{ book(page="ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name") }} {{ ref(page="expressions/call-expr.html#disambiguating-function-calls") }} |
| `break` | `break x;`  | Exit a loop, yield `x` as value of loop. |
| `const` | `const X`  | Define a **constant**. {{ book(page="ch03-01-variables-and-mutability.html#differences-between-variables-and-constants") }} {{ ex(page="custom_types/constants.html") }} {{ ref(page="items/constant-items.html") }} |
| ~ |  `*const T` | Constant raw pointers, _c_. raw pointer. |
| `continue` | `continue;`  | Continue to the next loop iteration |
| `crate` | `extern crate`  | Declare dependency on external **crate**. {{ book(page="ch02-00-guessing-game-tutorial.html#using-a-crate-to-get-more-functionality") }} {{ ex(page="crates/link.html#extern-crate") }} {{ ref(page="items/extern-crates.html#extern-crate-declarations") }}|
| ~ |  `pub(crate)` | Visibility modifier, _c_. `pub`. |
| `dyn` |  `&dyn T` | Marker for **dynamic dispatch** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} {{ ref(page="types.html#trait-objects") }}, _c_. `impl`. |
| `else` | `if x {} else {}` | Fallback for `if`. |
| `enum` | `enum E {}` | Define an **enum** {{ book(page="ch06-01-defining-an-enum.html") }} {{ ex(page="custom_types/enum.html#enums") }} {{ ref(page="items/enumerations.html") }} , _c_. [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type). |
| `extern` |  `extern crate`  | Link an external crate. |
| ~ | `extern "C" fn`  | External dependency for **FFI**. {{ book(page="ch19-01-unsafe-rust.html#using-extern-functions-to-call-external-code") }} {{ ex(page="std_misc/ffi.html#foreign-function-interface") }} {{ nom(page="ffi.html#calling-foreign-functions") }} {{ ref(page="items/external-blocks.html#external-blocks") }} |
| `false` | `false`  | Boolean false literal |
| `fn` | `fn f() -> T {}`  | Define a function. |
| ~ | `x: fn f()`  | **Function pointers**. {{ book(page="ch19-05-advanced-functions-and-closures.html#function-pointers") }} {{ std(page="std/primitive.fn.html") }} {{ ref(page="types.html#function-pointer-types") }} |
| `for` |  `for x in iter` | Syntactic sugar to loop over **iterators**. {{ book(page="ch13-02-iterators.html") }} {{ std(page="std/iter/index.html") }} {{ ref(page="expressions/loop-expr.html#iterator-loops") }} |
| ~ | `impl T for S`  | Implement traits |
| ~ | `for<'a>`  | **Higher-rank trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |
| `if` | `if x {}`  | Conditional branch if expression is true. |
| ~ | `if let Some(x)`  | Branch if pattern can be assigned. {{ ref(page="expressions/if-expr.html#if-let-expressions") }} |
| `impl` | `impl T {}`  | Implement functionality. |
| ~ | `fn f(x: impl T)`  | Trait bound,"**impl traits**" {{ book(page="ch10-02-traits.html#trait-bounds") }}, same {{todo()}} as `x: T`. |
| ~ | `fn f() -> impl T`  | **Existential types** {{ book(page="ch10-02-traits.html#returning-traits") }}, returns `S` that `impl T`. |
| `in` | `for x in iter`   | Part of `for` loop syntax. |
| ~ | `pub(in a::b)`  | Visibility modifier, _c_. `pub`. |
| `let` | `let x`;  | Bind a variable. |
| `loop` | `loop {}`  | Loop unconditionally. |
| `match` | `match m { ... }` | Initiate **pattern matching**. {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }} |
| `mod` | `mod m {}`  | Define a **module**. {{ book(page="ch07-00-modules.html") }} {{ ex(page="mod.html#modules") }} {{ ref(page="items/modules.html#modules") }} |
| `move` | <code>move \|\| x + x </code> | Make a closure take ownership of all its captures. |
| `mut` | `mut x`  | Denote mutability. |
| `pub` | `pub x`  | **Visibility modifier** {{ book(page="ch07-02-controlling-visibility-with-pub.html#controlling-visibility-with-pub") }} {{ ex(page="mod/visibility.html#visibility") }} {{ ref(page="visibility-and-privacy.html#visibility-and-privacy") }}, also `pub(...)`. |
| `ref` | `ref x` | **Bind by reference**. {{ book(page="ch18-03-pattern-syntax.html#legacy-patterns-ref-and-ref-mut") }} {{ ex(page="scope/borrow/ref.html") }} |
| `return` | `return 0;`  | Return from function. |
| `Self` | `fn new() -> Self`  | Type alias for the type implementing a trait. |
| `self` | `self.x`  | Method subject. |
| ~ | `self::x`  | Current module. |
| ~ | `pub(self)`  | Visibility modifier, _c_. `pub`. |
| `static` | `static X`  | **Global variable** {{ book(page="ch19-01-unsafe-rust.html#accessing-or-modifying-a-mutable-static-variable") }} {{ ex(page="custom_types/constants.html#constants") }} {{ ref(page="items/static-items.html#static-items") }}  with `'static` lifetime. |
| ~ | `'static`  | Lifetime lasting the entire program execution. |
| `struct` | `struct S;` | Define a structure. |
| `super` | `use super::x`  | Parent module of the current module. |
| ~ | `pub(super)`  | Visibility modifier, _c_. `pub`. |
| `trait` | `trait T {}`  | Define a trait. |
| `true` | `true`  | Boolean true literal. |
| `type` | `type T = S;`  | **Type alias**. {{ book(page="ch19-04-advanced-types.html#creating-type-synonyms-with-type-aliases") }} |
| ~ | `type X;`  | **Associated type**.{{ book(page="ch19-03-advanced-traits.html#specifying-placeholder-types-in-trait-definitions-with-associated-types") }} {{ ref(page="items/associated-items.html#associated-types") }}  |
| `unsafe` |  `unsafe {...}` | Marker for **unsafe code**. {{ book(page="ch19-01-unsafe-rust.html?highlight=unsafe#unsafe-superpowers") }} {{ ex(page="unsafe.html#unsafe-operations") }} {{ nom(page="meet-safe-and-unsafe.html") }} {{ ref(page="unsafe-blocks.html#unsafe-blocks") }} |
| `union` |  `union U {...}` | Unsafe **union**  {{ ref(page="items/unions.html") }} for FFI compatibility. |
| `use` | `use a::b`  | Bring symbols into scope. |
| `where` | `where T: S`  | Denote clauses that constrain a type. |
| `while` | `while x {...}`  | Loop while expression is true. |

</div>


# Invisible Sugar

If something works that "shouldn't work now that you think about it", it might be due to one of these.


| Name | Description |
|--------| -----------|
| **Coercions** {{ nom(page="coercions.html") }} | 'Weaken' types to match signature, e.g., `&mut T` to `&T`.  |
| **Deref** {{ nom(page="vec-deref.html#deref") }} | [Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html) `x: T` until `*x`, `**x`, ... compatible with some target `S`. |
| **Prelude** {{ std(page="std/prelude/index.html") }} | Automatic import of basic types.
| **Reborrow** | Since `x: &mut T` can't be copied; move new `&mut *x` instead. |
| **Lifetime Elision** {{ book(page="ch10-03-lifetime-syntax.html#lifetime-elision") }} {{ nom(page="lifetime-elision.html#lifetime-elision") }} {{ ref(page="lifetime-elision.html?highlight=lifetime,el#lifetime-elision") }} | Automatically annotate `f(x: &T)` to `f(x: &'a T)`.|
| **Method Resolution** {{ ref(page="expressions/method-call-expr.html") }} | Deref or borrow `x` until `x.f()` works. |


<!--

# Lingo

| Name | Description |
|--------| -----------|
| **Algebraic Data Type** {{ nom(page="coercions.html") }} |  |
| **Tagged Union** {{ nom(page="coercions.html") }} |  |
| **Sum Type** {{ nom(page="coercions.html") }} |  |
 -->

<!-- | **Lifetime Inference** {{ book(page="") }} {{ book(page="") }} | Automatically correct `'a` for `&'a T`.| -->


<!-- Don't render this section for printing, won't be helpful -->
<div class="noprint">

# More Cheats

{{ tool(src="/link_master.png", title="Rust Learning", url="https://github.com/ctjhoa/rust-learning") }}
{{ tool(src="/link_containers.png", title="Containers", url="https://docs.google.com/presentation/d/1q-c7UAyrUlM-eZyTo1pd8SZ0qwA_wYxmPZVOQkoDmH4/edit") }}
{{ tool(src="/link_railroad.png", title="Macro Railroad", url="https://github.com/lukaslueg/macro_railroad") }}
{{ tool(src="/link_lifetimes.png", title="Lifetimes", url="https://rufflewind.com/img/rust-move-copy-borrow.png") }}

</div>


<!-- Do we want to show them? I find these very confusing. -->
<!-- {{ tool(src="/link_godbolt.png", title="Compiler Explorer", url="https://godbolt.org/") }} -->
<!-- {{ tool(src="/link_strings.png", title="String Conversions", url="https://docs.google.com/spreadsheets/d/19vSPL6z2d50JlyzwxariaYD6EU2QQUQqIDOGbiGQC7Y/pubhtml?gid=0&single=true") }}
{{ tool(src="/link_api.png", title="API Guidelines", url="https://rust-lang-nursery.github.io/api-guidelines/") }}
{{ tool(src="/link_periodic.png", title="Periodic Table of Types", url="http://cosmic.mearie.org/2014/01/periodic-table-of-rust-types/") }} -->

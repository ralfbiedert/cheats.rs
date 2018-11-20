+++
weight = 1
sort_by = "weight"
+++

# Sigils

This section contains an example-based overview of most _sigils_ and _symbols_ usually found in Rust. It does not try to be sound from a language theory perspective, but rather easily digestible for a practitioner.

Where appropriate, this document will link to the corresponding sections in the
**The Book** {{ book(page="") }},
**Rust by Example** {{ ex(page="") }},
**Std Docs** {{ std(page="std")}},
**Nomicon** {{ nom(page="")}},
**Reference** {{ ref(page="")}}.


> **TODO** The document is only 10% annotated or so (first two sections).
> I want to get some feedback first before I put too much effort into this.

<!-- [Ⓐ]() [Ⓑ]() [Ⓔ]() [Ⓝ]() [Ⓡ]() -->

### Preprocessing

These constructs are usually processed and expanded before the actual compilation happens.

<div class="cheats">

| Example |  Explanation |
|---------|---------|
| `m!` |  Invocation preamble for **macros** {{book(page="appendix-04-macros.html")}} {{std(page="std/index.html#macros")}} {{ref(page="macros.html")}} |
| `$x:ty`  | Macro capture in macros by example. |
| `$x` |  Macro substitution in **macros by example** {{book(page="appendix-04-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming")}} {{ex(page="macros.html#macro_rules")}} {{ref(page="macros-by-example.html")}}
| `$(x),*` | Macro repetition in macros by example. |
| `#[attr]`  | Outer **attribute** {{ex(page="attribute.html")}} {{ref(page="attributes.html")}} |
| `#![attr]` | Inner attribute. |

</div>


### References & Pointers

References and pointers are Rust's way to grant something access to a memory location that does not own that location.


{{ book(page="") }}
{{ ex(page="") }}
{{ std(page="std") }}
{{ nom(page="")}}
{{ ref(page="")}}

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `&x` | Immutable **borrow**  {{ book(page="ch04-02-references-and-borrowing.html") }} {{ ex(page="scope/borrow.html") }} {{ std(page="std/borrow/trait.Borrow.html") }} |
| `&T` | Immutable safe pointer type, aka **reference**  {{ book(page="ch04-02-references-and-borrowing.html") }} {{ std(page="std/primitive.reference.html") }} {{ nom(page="references.html")}} {{ ref(page="types.html#pointer-types")}} |
| `&mut x` | Borrow that allows **mutability** {{ ex(page="scope/borrow/mut.html") }} |
| `&mut T` | Reference that allows mutability. |
| `*const x` | Immutable **raw pointer** {{ book(page="ch19-01-unsafe-rust.html#dereferencing-a-raw-pointer") }} {{ std(page="std/primitive.pointer.html") }} {{ ref(page="types.html#raw-pointers-const-and-mut") }} |
| `*const T` | Immutable raw pointer type. |
| `*mut x` | Mutable raw pointer. |
| `*mut T` | Mutable raw pointer type. |
| `*x` | **Dereference** [Ⓐ](https://doc.rust-lang.org/std/ops/trait.Deref.html) [Ⓑ](https://doc.rust-lang.org/stable/book/2018-edition/ch15-02-deref.html) [Ⓝ](https://doc.rust-lang.org/nightly/nomicon/vec-deref.html). |
| `'a`  | Often seen as `&'a T`, a **lifetime parameter** [Ⓑ](https://doc.rust-lang.org/stable/book/2018-edition/ch10-00-generics.html) [Ⓔ](https://doc.rust-lang.org/stable/rust-by-example/scope/lifetime.html) [Ⓝ](https://doc.rust-lang.org/nightly/nomicon/lifetimes.html) [Ⓡ](https://doc.rust-lang.org/stable/reference/items/generics.html#type-and-lifetime-parameters).|

</div>

### Entity Creation & Usage

Entity creation and usage sigils lists most idiomatic ways how to create and use non-primitive types and their values.


<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S { x: y }` | Field initializer for **structs** [Ⓐ](https://doc.rust-lang.org/std/keyword.struct.html) [Ⓑ](https://doc.rust-lang.org/stable/book/2018-edition/ch05-00-structs.html) [Ⓔ](https://doc.rust-lang.org/stable/rust-by-example/custom_types/structs.html) [Ⓡ](https://doc.rust-lang.org/stable/reference/expressions/struct-expr.html). |
| `S { x }` | Use local variable `x` for field `x` when creating struct. |
| `S { ..x }` | Fill remaining fields from `x`, esp. useful with [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `()` | Empty tuple, both literal and type, aka **unit** [Ⓐ](https://doc.rust-lang.org/std/primitive.unit.html). |
| `(x)` | Parenthesized expression |
| `(x,)` | Single-element **tuple** expression [Ⓐ](https://doc.rust-lang.org/std/primitive.tuple.html) [Ⓔ](https://doc.rust-lang.org/stable/rust-by-example/primitives/tuples.html) [Ⓡ](https://doc.rust-lang.org/stable/reference/expressions/tuple-expr.html).|
| `(T,)` | Single-element tuple type |
| `[T; n]` | `n`-sized **array** [Ⓐ](https://doc.rust-lang.org/std/primitive.array.html) [Ⓔ](https://doc.rust-lang.org/stable/rust-by-example/primitives/array.html) [Ⓡ](https://doc.rust-lang.org/stable/reference/expressions/array-expr.html). |
| `[x, y]` | Array with given elements. |
| `x[0]` | Collection indexing. Overloadable [Index](https://doc.rust-lang.org/std/ops/trait.Index.html), [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html) |
| `x[..]` | Collection slice-like indexing via [Range](https://doc.rust-lang.org/std/ops/struct.Range.html), compare **slices** [Ⓐ](https://doc.rust-lang.org/std/primitive.slice.html) [Ⓔ](https://doc.rust-lang.org/stable/rust-by-example/primitives/array.html) [Ⓡ](https://doc.rust-lang.org/stable/reference/types.html#array-and-slice-types). |
| `x[a..]` | Collection slice-like indexing via [RangeFrom](https://doc.rust-lang.org/std/ops/struct.RangeFrom.html). |
| `x[..b]` | Collection slice-like indexing [RangeTo](https://doc.rust-lang.org/std/ops/struct.RangeTo.html). |
| `x[a..b]` | Collection slice-like indexing via [RangeFull](https://doc.rust-lang.org/std/ops/struct.RangeFull.html). |
| `a..b` | Right-exclusive **range** [Ⓡ](https://doc.rust-lang.org/stable/reference/expressions/range-expr.html) creation, also seen as `..`, `a..`, `..b`.  |
| `a..=b` | Inclusive range creation, also seen as `..=b`. |
| `x.i` | Member **access** [Ⓡ](https://doc.rust-lang.org/stable/reference/expressions/field-expr.html) |
| `x.0` | Tuple access |

</div>

### Generics & Constraints

Generics allow you to create code that operates on more than one type. Closely related are constraints, that allow caller and callee to agree on the limits within which such code may operate.

[Ⓐ]() [Ⓑ]() [Ⓔ]() [Ⓝ]() [Ⓡ]()

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S<T>`  | A generic type with a type parameter.  |
| `S<T=R>` | A generic type with specific assignments (e.g., `Iterator<Item=T>`) |
| `<_>` | 'Automatically infer this' parameter. |
| `T: R`  | Type trait constraint |
| `T: 'a` | Type lifetime constraint |
| `T: R + S`  | Compound type constraint, also seen as `T: R + 'a` |
| `for<> R` | Higher-ranked lifetime bounds |
| `!Send`          | Disabling an automatically derived trait. |
| `?Sized`         | Opting out of a pre-defined trait bound in type

</div>

### Program Structure & Flow

These sigils are essential when dividing code into smaller units, or elegantly expressing non-linear flows such as error handling.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `a::b` | Namespace path |
| <code>\|x\| </code> | Closure preamble. |
| `f() -> T` | Function return type |
| `x;` | Statement and item terminator |
| `'a: loop` | Loop label |
| `x?` | Early return on error. |

</div>

### Pattern Matching

These sigils are only found within `match` blocks.

<div class="cheats">


| Example | Explanation |
|---------|-------------|
|  `p => x` | Part of match arm syntax |
| `x @ p` | Pattern binding in match arms. |
| <code>p \| q</code> | Pattern alternatives |

</div>


### Strings & Chars

Rust has several ways to create string or char literals, depending on your needs.

<div class="cheats">

| Symbol | Explanation |
|--------|-------------|
| `"..."` | String literal |
| `r"..."`, `r#"..."#`, `r##"..."##`, etc. | Raw string literal, escape characters not processed |
| `b"..."` | Byte string literal; constructs a `[u8]` instead of a string |
| `br"..."`, `br#"..."#`, `br##"..."##`, etc. | Raw byte string literal, combination of raw and byte string literal |
| `'...'` | Character literal |
| `b'...'` | ASCII byte literal |

</div>

### Comments

Similar to macros, comments are being removed before compilation. In addition, doc comments can be extracted and are the basis of API documentation and tooling support.

<div class="cheats">

| Symbol | Explanation |
|--------|-------------|
| `//` | Line comment |
| `//!` | Inner line doc comment |
| `///` | Outer line doc comment |
| `/*...*/` | Block comment |
| `/*!...*/` | Inner block doc comment |
| `/**...*/` | Outer block doc comment |

</div>


### Common Operators

If you are familiar with other programming languages, you will probably recognize these. Most common operators
can be customized by implementing a [std::ops]() trait.

<div class="cheats">

| Example   | Operator Trait | Explanation |
|---------  |-------------|-------|
| `!x`      | [Not](https://doc.rust-lang.org/std/ops/trait.Not.html) | Bitwise or logical complement |
| `x = y`   |  | Assignment/equivalence |
| `x / y`  | [Div](https://doc.rust-lang.org/std/ops/trait.Div.html) | Arithmetic division |
| `x /= y`  | [DivAssign](https://doc.rust-lang.org/std/ops/trait.DivAssign.html) | Arithmetic division and assignment |
| `x << y` | [Shl](https://doc.rust-lang.org/std/ops/trait.Shl.html)  | Left-shift |
|  `x <<= y`| [ShlAssign](https://doc.rust-lang.org/std/ops/trait.ShlAssign.html) | Left-shift and assignment |
| `x < y`  |  | Less than comparison |
| `x <= y` | | Less than or equal to comparison |
|  `x == y`| | Equality comparison |
| `x > y`  | | Greater than comparison |
|  `x >= y`|  | Greater than or equal to comparison |
|  `x >> y`| [Shr](https://doc.rust-lang.org/std/ops/trait.Shr.html) | Right-shift |
| `x >>= y` | [ShrAssign](https://doc.rust-lang.org/std/ops/trait.ShrAssign.html) | Right-shift and assignment |
| `x ^ y`  | [BitXor](https://doc.rust-lang.org/std/ops/trait.BitXor.html) | Bitwise exclusive OR |
|  `x ^= y` | [BitXorAssign](https://doc.rust-lang.org/std/ops/trait.BitXorAssign.html) | Bitwise exclusive OR and assignment |
| <code>x \| y</code>  | [BitOr](https://doc.rust-lang.org/std/ops/trait.BitOr.html)| Bitwise OR |
| <code>x \|= y</code>  | [BitOrAssign](https://doc.rust-lang.org/std/ops/trait.BitOrAssign.html)| Bitwise OR and assignment |
| <code>x \|\| y</code>| | Logical OR |

</div>


### Miscellaneous

These sigils did not fit any other category but are good to know nonetheless.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `!` | Always empty bottom type for diverging functions |
| `_` | Unnamed variable. |
| `_x` | Variable explicitly marked as being unused. |
| `1_0` | Numeric separator for visual clarity. |

</div>


# Keywords

<div class="cheats">

| Keyword | Explanation |
|--------|-------------|
| `as` | Primitive casting; disambiguate traits; rename imports. |
| `break` | Exit a loop immediately |
| `const` | Define constant items or constant raw pointers |
| `continue` | Continue to the next loop iteration |
| `crate` | External crate dependency or visibility modifier. |
| `dyn` | Dynamic dispatch to a trait object. |
| `else` | Fallback for `if` and `if let` control flow constructs. |
| `enum` | Define an enumeration |
| `extern` | Link an external crate, function, or variable |
| `false` | Boolean false literal |
| `fn` | Define a function or the function pointer type |
| `for` | Loop over iterators; implement traits; higher-ranked lifetimes. |
| `if` | Conditional branch. |
| `impl` | Implement functionality; existential types. |
| `in` | Part of `for` loop syntax |
| `let` | Bind a variable |
| `loop` | Loop unconditionally |
| `match` | Match a value to patterns |
| `mod` | Define a module |
| `move` | Make a closure take ownership of all its captures. |
| `mut` | Denote mutability. |
| `pub` | Denote public visibility. |
| `ref` | Bind by reference |
| `return` | Return from function |
| `Self` | Type alias for the type implementing a trait |
| `self` | Method subject or current module. |
| `static` | Global variable or lifetime lasting the entire program execution. |
| `struct` | Define a structure |
| `super` | Parent module of the current module |
| `trait` | Define a trait |
| `true` | Boolean true literal |
| `type` | Type alias or associated type |
| `unsafe` | Marker for unsafe code. |
| `use` | Bring symbols into scope |
| `where` | Denote clauses that constrain a type |
| `while` | Loop conditionally. |
</div>

# Memory Layout

> TODO: Replace this with both container types and stack / heap explanations around Sized / Unsized / dyn Trait / ...

![image](images/containers.png)

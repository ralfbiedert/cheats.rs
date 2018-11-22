+++
weight = 1
sort_by = "weight"
+++

<div class="title">Rust Cheat Sheet</div>
<div class="subtitle">22.11.2018</div>



>  Where appropriate, this document will link to the corresponding sections in the
>  **The Book** {{ book(page="") }},
>  **Rust by Example** {{ ex(page="") }},
>  **Std Docs** {{ std(page="std")}},
>  **Nomicon** {{ nom(page="")}},
>  **Reference** {{ ref(page="")}}.

# Sigils

List of most _sigils_ and _symbols_ usually found in Rust.


### Preprocessing

Constructs expanded before the actual compilation happens.

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

Granting access to un-owned memory.


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
| `*x` | **Dereference**  {{ book(page="ch15-02-deref.html") }} {{ std(page="std/ops/trait.Deref.html") }} {{ nom(page="vec-deref.html") }} |
| `'a`  | Often seen as `&'a T`, a **lifetime parameter** {{ book(page="ch10-00-generics.html") }} {{ ex(page="scope/lifetime.html")}} {{ nom(page="scope/lifetimes.html") }} {{ ref(page="generics.html#type-and-lifetime-parameters")}} |

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
| `[T; n]` | `n`-sized **array** {{ ex(page="primitives/array.html") }}  {{ std(page="std/primitive.array.html") }} {{ ref(page="expressions/array-expr.html") }} |
| `[x, y]` | Array with given elements. |
| `x[0]` | Collection indexing. Overloadable [Index](https://doc.rust-lang.org/std/ops/trait.Index.html), [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html) |
| `x[..]` | Collection slice-like indexing via [Range](https://doc.rust-lang.org/std/ops/struct.Range.html), _c_. **slices**  {{ std(page="std/primitive.slice.html") }}  {{ ex(page="primitives/array.html") }}  {{ ref(page="types.html#array-and-slice-types") }} |
| `x[a..]` | Collection slice-like indexing via [RangeFrom](https://doc.rust-lang.org/std/ops/struct.RangeFrom.html). |
| `x[..b]` | Collection slice-like indexing [RangeTo](https://doc.rust-lang.org/std/ops/struct.RangeTo.html). |
| `x[a..b]` | Collection slice-like indexing via [RangeFull](https://doc.rust-lang.org/std/ops/struct.RangeFull.html). |
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
| `S<T=R>` | A **default type parameter** {{ book(page="ch19-03-advanced-traits.html#default-generic-type-parameters-and-operator-overloading") }} |
| `<_>` | Inferred **anonymous lifetime** {{ book(page="ch19-02-advanced-lifetimes.html#the-anonymous-lifetime") }} or **type** {{ todo() }}. |
| `T: R`  | Type **trait bound** {{ book(page="ch10-02-traits.html#using-trait-bounds-to-conditionally-implement-methods") }} {{ ex(page="generics/bounds.html") }} |
| `T: 'a` | Type **lifetime bound** {{ ex(page="scope/lifetime/lifetime_bounds.html") }} |
| `T: R + S`  | **Compound type bound** {{ book(page="ch10-02-traits.html#multiple-trait-bounds-with-") }} {{ ex(page="generics/multi_bounds.html") }}, also seen as `T: R + 'a` |
| `for<> R` | **Higher-rank trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |
| `!Send`          | Disabling an automatically derived trait. {{ todo() }} |
| `?Sized`         | Opting out of a pre-defined trait bound in type {{ todo() }} |

</div>

### Program Structure & Flow

Ubiquitous constructs for code structure and execution flow.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `a::b` | Namespace **path**. {{ book(page="ch07-03-importing-names-with-use.html") }} {{ ex(page="mod/use.html") }} {{ ref(page="paths.html")}} |
| `'a: loop` | Loop label. {{ ex(page="flow_control/loop/nested.html") }} {{ ref(page="expressions/loop-expr.html#loop-labels")}} |
| <code>\|x\| </code> | Preamble for **closures**. {{ book(page="ch13-01-closures.html") }} {{ ex(page="fn/closures.html") }} {{ ref(page="expressions/closure-expr.html")}} |
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
| <code>p \| q</code> | Pattern alternatives |

</div>


### Strings & Chars

Rust has several ways to create string or char literals, depending on your needs.


<div class="cheats">

| Example | Explanation |
|--------|-------------|
| `"..."` | **String literal** {{ ref(page="tokens.html#string-literals")}}, will escape `\n`, ... |
| `r"..."`, | **Raw string literal**. {{ ref(page="tokens.html#raw-string-literals")}}, won't escape `\n`, ... |
| `r#"..."#`, etc. | Raw string literal, but can also contain `"`. |
| `b"..."` | **Byte string literal** {{ ref(page="tokens.html#byte-and-byte-string-literals")}}; constructs a `[u8]` instead of a string. |
| `br"..."`, `br#"..."#`, etc. | Raw byte string literal, combination of the above. |
| `'🦀'` | **Character literal** {{ ref(page="tokens.html#character-and-string-literals")}}, can contain unicode. |
| `b'x'` | ASCII **byte literal**. {{ ref(page="tokens.html#byte-literals")}}|

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
| `_` | Unnamed variable, e.g., <code>\|x, _\| { ... }</code>.|
| `_x` | Variable explicitly marked as unused. |
| `1_0` | Numeric separator for visual clarity. |
| `r#foo` | A **raw identifier** {{ book(page="appendix-01-keywords.html?highlight=raw,iten#raw-identifiers") }} {{ ex(page="compatibility/raw_identifiers.html?highlight=raw,iden#raw-identifiers") }} for edition compatibility. |

</div>



### Common Operators

Rust supports all common operators you would expect to find in a language (`+`, `*`, `%`, `=`, `==`...).
Since they behave no differently in Rust we do not list them here.
For some of them Rust also support **operator overloading**. {{ std(page="std/ops/index.html")}}



# Keywords

<div class="cheats">


{{ book(page="") }}
{{ book(page="") }}


| Keyword | Explanation |
|--------|-------------|
| `as` | **Casting** {{ book(page="types/cast.html#casting") }}; disambiguation; imports. |
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


# Various

> TODO: Add stack / heap explanations around Sized / Unsized / dyn Trait / ...



### Containers

[![image](/link_containers.png)](https://docs.google.com/presentation/d/1q-c7UAyrUlM-eZyTo1pd8SZ0qwA_wYxmPZVOQkoDmH4/edit#slide=id.p)

### Containers

[![image](/link_periodic.png)]()

### Railroad

[![image](/link_railroad.png)]()

### Railroad

[![image](/link_strings.png)]()



### Tools

| Keyword | Explanation |
|--------|-------------|
| [![image](/tool_railroad.png)](https://xxx) | **Macro Railroad** {{ book(page="types/cast.html#casting") }}; disambiguation; imports. |
| [![image](/tool_railroad.png)](https://xxx) | **Casting** {{ book(page="types/cast.html#casting") }}; disambiguation; imports. |

+++
weight = 1
sort_by = "weight"
+++

<img id="logo" src="/logo.png"></img>
<div class="title">Rust Language Cheat Sheet</div>
<div class="subtitle">{{ date() }}</div>



> This document links to corresponding sections in the
> **The Book** {{ book(page="") }},
> **Rust by Example** {{ ex(page="") }},
> **Std Docs** {{ std(page="std") }},
> **Nomicon** {{ nom(page="") }},
> **Reference** {{ ref(page="") }}.
> These footnotes are clickable!
>
> Furthermore, it will mark things that are
> largely **deprecated** {{ deprecated() }},
> or have a **minimum edition** {{ edition(ed="'18") }}.


### Data Structures

Define data types and memory locations, and use them.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `struct S {}` | Define a **struct**, {{ book(page="ch05-00-structs.html") }} {{ ex(page="custom_types/structs.html") }} {{ std(page="std/keyword.struct.html") }} {{ ref(page="expressions/struct-expr.html") }} with named fields. |
| {{ tab() }} `struct S` `()` | Define "tupled" struct with numbered fields `.0`, `.1`, ... |
| {{ tab() }} `struct S;` | Define zero sized unit struct. |
| `enum E {}` | Define an **enum** {{ book(page="ch06-01-defining-an-enum.html") }} {{ ex(page="custom_types/enum.html#enums") }} {{ ref(page="items/enumerations.html") }} , _c_. [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type), [tagged unions](https://en.wikipedia.org/wiki/Tagged_union). |
| `union U {}` | Unsafe C-like **union**  {{ ref(page="items/unions.html") }} for FFI compatibility. |
| `static X: T = x`  | **Global variable** {{ book(page="ch19-01-unsafe-rust.html#accessing-or-modifying-a-mutable-static-variable") }} {{ ex(page="custom_types/constants.html#constants") }} {{ ref(page="items/static-items.html#static-items") }}  with `'static` lifetime, consumes memory.  |
| `const X: T = x;`  | Define a **constant**, {{ book(page="ch03-01-variables-and-mutability.html#differences-between-variables-and-constants") }} {{ ex(page="custom_types/constants.html") }} {{ ref(page="items/constant-items.html") }} used during compilation, takes no memory. |
| `let x;`  | **Variable binding** {{ todo() }} that can't be changed or `&mut`'ed. |
| `let mut x;`  | Same, but allow for change or mutable borrow. |

</div>

{{ tablesep() }}

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S { x: y }` | Create `struct S {}` or `use`'ed `enum E::S {}` with field `x` set to `y`. |
| `S { x }` | Same, but use local variable `x` for field `x`. |
| `S { ..x }` | Same, but fill remaining fields from `x`, esp. useful with [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `S` `(x)` | Create `struct S` `(T)` or `use`'ed `enum E::S` `()` with field `.0` set to `x`. |
| `S` | If `S` is unit `struct S;` or `use`'ed `enum E::S` create value of `S`. |
| `E::A { x: y }` | Create enum variant `A`. Other methods above also work. |
| `()` | Empty tuple, both literal and type, aka **unit** {{ std(page="std/primitive.unit.html") }} |
| `(x)` | Parenthesized expression |
| `(x,)` | Single-element **tuple** expression {{ ex(page="primitives/tuples.html") }} {{ std(page="std/primitive.tuple.html") }} {{ ref(page="expressions/tuple-expr.html") }} |
| `(T,)` | Single-element tuple type |
| `[T; n]` | **Array type** {{ ex(page="primitives/array.html") }}  {{ std(page="std/primitive.array.html") }} with `n` elements of type `T`. |
| `[x; n]` | Array with `n` copies of `x`. {{ ref(page="expressions/array-expr.html") }} |
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
| `ref x` {{ deprecated() }} | **Bind by reference**. {{ book(page="ch18-03-pattern-syntax.html#legacy-patterns-ref-and-ref-mut") }} {{ ex(page="scope/borrow/ref.html") }} |
| `*x` | **Dereference**.  {{ book(page="ch15-02-deref.html") }} {{ std(page="std/ops/trait.Deref.html") }} {{ nom(page="vec-deref.html") }} |
| `'a`  | Often seen as `&'a T`, a **lifetime parameter**. {{ book(page="ch10-00-generics.html") }} {{ ex(page="scope/lifetime.html")}} {{ nom(page="lifetimes.html") }} {{ ref(page="items/generics.html#type-and-lifetime-parameters")}} |
| `'static`  | Lifetime lasting the entire program execution. |

</div>




### Functions & Behavior

Define units of code and their abstractions.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `trait T {}`  | Define a trait. |
| `impl S {}`  | Implement functionality for a type `S`. |
| `impl T for S {}`  | Implement trait `T` for type `S`. |
| `impl !T for S {}` | Disable an automatically derived marker trait. {{ todo() }} |
| `fn f() {}`  | Definition of a function; or associated function if inside `impl`. |
| {{ tab() }} `fn f() -> T {}`  | Same, returning a type T. |
| {{ tab() }} `fn f(&self) {}`  | Define a method as part of an `impl`. |
| `fn() -> T`  | **Function pointers**, {{ book(page="ch19-05-advanced-functions-and-closures.html#function-pointers") }} {{ std(page="std/primitive.fn.html") }} {{ ref(page="types.html#function-pointer-types") }} don't confuse with traits `Fn`, `FnOnce`, `FnMut`. |
| <code>\|\| {} </code> | A **closure** {{ book(page="ch13-01-closures.html") }} {{ ex(page="fn/closures.html") }} {{ ref(page="expressions/closure-expr.html")}} that borrows all captures. |
| {{ tab() }} <code>\|x\| {}</code> | Closure with a bound parameter `x`. |
| {{ tab() }} <code>\|x\| x + x</code> | Closure without block expression.  |
| {{ tab() }} <code>move \|x\| x + y </code> | Closure taking ownership of all captures. |
| {{ tab() }} <code> return \|\| true </code> | Closures may sometimes look like logical ORs (here: return a closure). |
| `unsafe {}` | _Here be dragons_, marker for **unsafe code**. {{ book(page="ch19-01-unsafe-rust.html?highlight=unsafe#unsafe-superpowers") }} {{ ex(page="unsafe.html#unsafe-operations") }} {{ nom(page="meet-safe-and-unsafe.html") }} {{ ref(page="unsafe-blocks.html#unsafe-blocks") }} |
</div>


### Control Flow

Control execution within a function.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `while x {}`  | **Loop** {{ ref(page="expressions/loop-expr.html#predicate-loops") }}, run while expression `x` is true. |
| `loop {}`  | **Loop infinitely** {{ ref(page="expressions/loop-expr.html#infinite-loops") }} until `break`. |
| `for x in iter {}` | Syntactic sugar to loop over **iterators**. {{ book(page="ch13-02-iterators.html") }} {{ std(page="std/iter/index.html") }} {{ ref(page="expressions/loop-expr.html#iterator-loops") }} |
| `if x {} else {}`  | **Conditional branch** {{ ref(page="expressions/if-expr.html") }} if expression is true. |
| `'label: loop` | **Loop label**. {{ ex(page="flow_control/loop/nested.html") }} {{ ref(page="expressions/loop-expr.html#loop-labels")}} |
| `break`  | **Break expression** {{ ref(page="expressions/loop-expr.html#break-expressions") }} to exit a loop. |
| {{ tab() }} `break x`  | Same, but make `x` value of the loop expression (only in actual `loop`). |
| {{ tab() }} `break 'label`  | Exit not only this loop, but the enclosing one marked with `'label`. |
| `continue `  | **Continue expression** {{ ref(page="expressions/loop-expr.html#continue-expressions") }} to the next loop iteration of this loop. |
| `continue 'label`  | Same, but instead of enclosing loop marked with `'label`. |
| `return x`  | Early return from function. More idiomatic way is to end with expression. |
| `x?` | If `x` is `Result::Err` or `Option::None`, **return and propagate**. {{ book(page="ch09-02-recoverable-errors-with-result.html#propagating-errors") }} {{ ex(page="error/result/enter_question_mark.html") }} {{ std(page="std/result/index.html#the-question-mark-operator-") }} {{ ref(page="expressions/operator-expr.html#the-question-mark-operator")}} |

</div>



### Organizing Code

Segment projects into smaller units and minimize dependencies.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `mod m {}`  | Define a **module**. {{ book(page="ch07-00-modules.html") }} {{ ex(page="mod.html#modules") }} {{ ref(page="items/modules.html#modules") }} |
| `a::b` | Namespace **path** {{ book(page="ch07-03-importing-names-with-use.html") }} {{ ex(page="mod/use.html") }} {{ ref(page="paths.html")}} to element `b` within `a` (`mod`, `enum`, ...). |
| {{ tab() }} `::x` | Search `x` relative to crate root. {{ deprecated() }} |
| {{ tab() }} `crate::x` | Search `x` relative to crate root. {{ edition(ed="'18") }} |
| {{ tab() }} `self::x`  | Search `x` relative to the current module. |
| {{ tab() }} `super::x`  | Search `x` relative to the parent module. |
| `use a::b`  | Bring symbol `b` directly into scope without requiring `a` anymore. |
| `use a::*`  | Bring everything from `a` into scope and reexport. |
| `pub use a::b`  | Bring `a::b` into scope and reexport from here. |
| `pub T`  | "Public if parent path public" **visibility** {{ book(page="ch07-02-controlling-visibility-with-pub.html#controlling-visibility-with-pub") }} {{ ex(page="mod/visibility.html#visibility") }} {{ ref(page="visibility-and-privacy.html#visibility-and-privacy") }} for `T`. |
| {{ tab() }} `pub(crate) T` | Visibility at most in current crate. |
| {{ tab() }} `pub(self) T`  | Visible at most in current module. |
| {{ tab() }} `pub(super) T`  | Visible at most in parent. |
| {{ tab() }} `pub(in a::b) T`  | Visible at most in `a::b`. |
| `extern crate x` | Declare dependency on external **crate**. {{ book(page="ch02-00-guessing-game-tutorial.html#using-a-crate-to-get-more-functionality") }} {{ ex(page="crates/link.html#extern-crate") }} {{ ref(page="items/extern-crates.html#extern-crate-declarations") }} {{ deprecated() }} ; since {{ edition(ed="'18") }} just `use x::f`.  |
| `extern "C" fn`  | External dependency for **FFI**. {{ book(page="ch19-01-unsafe-rust.html#using-extern-functions-to-call-external-code") }} {{ ex(page="std_misc/ffi.html#foreign-function-interface") }} {{ nom(page="ffi.html#calling-foreign-functions") }} {{ ref(page="items/external-blocks.html#external-blocks") }} |

</div>



### Type Aliases and Casts

XXX

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `type T = S;`  | Create a **type alias**. {{ book(page="ch19-04-advanced-types.html#creating-type-synonyms-with-type-aliases") }} |
| `Self`  | Type alias for current type, e.g. `fn new() -> Self`. |
| `self`  | Refer to method subject. |
| `x as u32`  | Primitive **cast** {{ ex(page="types/cast.html#casting") }} {{ ref(page="expressions/operator-expr.html#type-cast-expressions") }}, may truncate and more. {{ nom(page="casts.html") }} |
| `S as T`  | **Disambiguate** {{ book(page="ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name") }} {{ ref(page="expressions/call-expr.html#disambiguating-function-calls") }} type `S` as trait `T`. |

</div>



### Code Generation

Constructs expanded before the actual compilation happens.

<div class="cheats">

| Example |  Explanation |
|---------|---------|
| `m!` |  **Macro** {{book(page="appendix-04-macros.html")}} {{std(page="std/index.html#macros")}} {{ref(page="macros.html")}} invocation preamble, usually in `m!()`, `m!{}`, `m![]`. |
| `$x:ty`  | Macro capture, also `$x:ex`, `$x:XXX`. |
| `$x` |  Macro substitution in **macros by example**. {{book(page="appendix-04-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming")}} {{ex(page="macros.html#macro_rules")}} {{ref(page="macros-by-example.html")}}
| `$(x),*` | Macro repetition in macros by example. |
| `$crate` | Special hygiene variable, crate where macros is defined. {{ todo() }} |
| `#[attr]`  | Outer **attribute**. {{ex(page="attribute.html")}} {{ref(page="attributes.html")}} |
| `#![attr]` | Inner attribute. |

</div>




### Pattern Matching

These constructs are found in `match` expressions.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `match m {}` | Initiate **pattern matching**. {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }} |
|  `E::A => {}` | Match enum variant `A`, _c_. **pattern matching**. {{ book(page="ch06-02-match.html") }} {{ ex(page="flow_control/match.html") }} {{ ref(page="expressions/match-expr.html") }} |
|  `E::B ( .. ) => {}` | Match enum tuple variant `B`, wildcard any index. |
|  `E::C { .. } => {}` | Match enum struct variant `C`, wildcard any field. |
|  `S { x: 0, y: 1 } => {}` | Match struct with specific params. |
|  `S { x, y } => {}` | Match struct with any values for fields `x` and `y`. |
|  `S { .. } => {}` | Match struct with any values. |
|  `D => {}` | Match enum variant `E::D` if `D` in `use`. |
|  `D => {}` | Match anything, bind `D`; false friend of `E::D` if `D` not in `use`. |
|  `_ => {}` | Proper wildcard that matches anything / "all the rest". |
|  `[a, 0] => {}` | Match array with any value for `a` and `0` for second. |
|  `(a, 0) => {}` | Match tuple with any value for `a` and `0` for second. |
| `x @ 1 .. 5 => {}` | Bind matched to `x`; **pattern binding** {{ book(page="ch18-03-pattern-syntax.html#a-bindings") }} {{ ex(page="flow_control/match/binding.html#binding") }}.  |
| <code>0 \| 1 => {}</code> | Pattern alternatives (or-patterns). |
| `P(X) if x > 10`  | Pattern match **guards**. {{ book(page="ch18-03-pattern-syntax.html#extra-conditionals-with-match-guards")}} {{ ex(page="flow_control/match/guard.html#guards")}} |

| `if let Some(x)`  | Branch if pattern can be assigned. {{ ref(page="expressions/if-expr.html#if-let-expressions") }} |

</div>

<!-- This is more relevant for let D = ... cases, https://www.reddit.com/r/rust/comments/a1846o/rust_quiz_26_medium_to_hard_rust_questions_with/eaop291/ -->
<!-- |  `D => {}` | Match struct if `D` unit `struct D;`| -->



### Generics & Constraints

Generics combine with many other constructs such as `struct S<T>`, `fn f<T>()`, ... to create more flexible

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
| `T: ?Sized`         | Opt out of a pre-defined trait bound Sized. {{ todo() }} |
| `T::<S>` | **Turbofish** {{ std(page="std/iter/trait.Iterator.html#method.collect")}} call site type disambiguation.  |
| `'b: 'a` | Lifetime `'b` must live at least as long as (i.e., _outlives_) `'a`. |
| `for<'a>` | **Higher-rank trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |
| `fn f() -> impl T`  | **Existential types** {{ book(page="ch10-02-traits.html#returning-traits") }}, returns `S` that `impl T`. |
| `&dyn T` | Marker for **dynamic dispatch** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} {{ ref(page="types.html#trait-objects") }}, _c_. `impl`. |
| `trait T { type X; }`  | Create an **associated type** {{ book(page="ch19-03-advanced-traits.html#specifying-placeholder-types-in-trait-definitions-with-associated-types") }} {{ ref(page="items/associated-items.html#associated-types") }} `X` for trait `T`. |
| `where T: S`  | Introduce type constraints for generics. |
| `fn f(x: impl T)`  | Trait bound,"**impl traits**" {{ book(page="ch10-02-traits.html#trait-bounds") }}, same {{todo()}} as `x: T`. |

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
| `_` | Unnamed variable binding, e.g., <code>\|x, _\| {}</code>.|
| `_x` | Variable binding explicitly marked as unused. |
| `1_234_567` | Numeric separator for visual clarity. |
| `1u8` | Type specifier for **numeric literals** {{ ex(page="types/literals.html#literals") }} {{ ref(page="tokens.html#number-literals") }}  (also `i8`, `u16`, ...). |
| `r#foo` | A **raw identifier** {{ book(page="appendix-01-keywords.html?highlight=raw,iten#raw-identifiers") }} {{ ex(page="compatibility/raw_identifiers.html?highlight=raw,iden#raw-identifiers") }} for edition compatibility. |
| `x;` | **Statement** {{ ref(page="statements.html")}} terminator, _c_. **expressions** {{ ex(page="expression.html") }} {{ ref(page="expressions.html")}} |

</div>




### Common Operators

Rust supports all common operators you would expect to find in a language (`+`, `*`, `%`, `=`, `==`...).
Since they behave no differently in Rust we do not list them here.
For some of them Rust also support **operator overloading**. {{ std(page="std/ops/index.html")}}




## Invisible Sugar

If something works that "shouldn't work now that you think about it", it might be due to one of these.


| Name | Description |
|--------| -----------|
| **Coercions** {{ nom(page="coercions.html") }} | 'Weaken' types to match signature, e.g., `&mut T` to `&T`.  |
| **Deref** {{ nom(page="vec-deref.html#deref") }} | [Deref](https://doc.rust-lang.org/std/ops/trait.Deref.html) `x: T` until `*x`, `**x`, ... compatible with some target `S`. |
| **Prelude** {{ std(page="std/prelude/index.html") }} | Automatic import of basic types.
| **Reborrow** | Since `x: &mut T` can't be copied; move new `&mut *x` instead. |
| **Lifetime Elision** {{ book(page="ch10-03-lifetime-syntax.html#lifetime-elision") }} {{ nom(page="lifetime-elision.html#lifetime-elision") }} {{ ref(page="lifetime-elision.html?highlight=lifetime,el#lifetime-elision") }} | Automatically annotate `f(x: &T)` to `f(x: &'a T)`.|
| **Method Resolution** {{ ref(page="expressions/method-call-expr.html") }} | Deref or borrow `x` until `x.f()` works. |


## Expressions vs. Statements


## Data Layout

Primitive types:

| Kind | 1 byte |  2 byte |  4 byte |  8 byte |  16 byte |
|---|---|---|---|---|---|---|---|
|**Signed**| `u8` |  `u16` |  `u32` |  `u64` |  `u128` |
|**Unsigned**| `i8` |  `i16` |  `i32` |  `i64` |  `i128` |
|**Float**|      |        |  `f32` |  `f64` |         |
|**Boolean**| `true`, `false` |        |  |   |         |

{{ tablesep() }}

Advanced types:

| Type | Bytes |  Description |
|--- |---|---|
|`()` | 0 | Unit types (also `struct S;`, `!`, ...) take up no memory. |
|`T`| `mem::xxx(T)` | If `x: T` moved might produce additional runtime drop flag. |
|`&T`| word<sup>*</sup> | References are plain pointers. |
|`&'a T`| word<sup>*</sup> | Same as `&T`, lifetimes disappear in assembly (contrasting move). |
|`&[T]`| 2 x word<sup>*</sup> | A slice is represented as `(ptr, len)`. |

&nbsp; &nbsp; <sup>*</sup> whatever word size is on machine, usually 4 or 8 bytes.

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

## More Cheats

These are other great visual guides and tables.

{{ tool(src="/link_containers.png", title="Containers", url="https://docs.google.com/presentation/d/1q-c7UAyrUlM-eZyTo1pd8SZ0qwA_wYxmPZVOQkoDmH4/edit") }}
{{ tool(src="/link_railroad.png", title="Macro Railroad", url="https://github.com/lukaslueg/macro_railroad") }}
{{ tool(src="/link_lifetimes.png", title="Lifetimes", url="https://rufflewind.com/img/rust-move-copy-borrow.png") }}

| Cheat Sheet | Description |
|--------| -----------|
| [Rust Learning⭐](https://github.com/ctjhoa/rust-learning) | Probably the best collection of links about learning Rust.  |
| [String Conversions](https://docs.google.com/spreadsheets/d/19vSPL6z2d50JlyzwxariaYD6EU2QQUQqIDOGbiGQC7Y/pubhtml?gid=0&single=true) | How to get type of string from another. |
| [API Guidelines Checklist](https://rust-lang-nursery.github.io/api-guidelines/checklist.html) | How to design your own APIs. |
| [Periodic Table of Types](http://cosmic.mearie.org/2014/01/periodic-table-of-rust-types) | How various types and references correlate. |
| [Futures](https://rufflewind.com/img/rust-futures-cheatsheet.html) | How to construct and work with futures. |

</div>

<!-- {{ tool(src="/link_godbolt.png", title="Compiler Explorer", url="https://godbolt.org/") }} -->

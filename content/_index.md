+++
weight = 1
sort_by = "weight"
template = "index.html"
+++

<img id="logo" src="/logo.png"></img>
<div class="title">Rust Language Cheat Sheet</div>
<div class="subtitle">{{ date() }}</div>



> Contains clickable links to
> **The Book** {{ book(page="") }},
> **Rust by Example** {{ ex(page="") }},
> **Std Docs** {{ std(page="std") }},
> **Nomicon** {{ nom(page="") }},
> **Reference** {{ ref(page="") }}.
> Furthermore, entries are marked as
> largely **deprecated** {{ deprecated() }},
> have a **minimum edition** {{ edition(ed="'18") }},
> or are **bad** {{ edition(ed="⚡") }}.



### Data Structures

Define data types and memory locations, and use them.

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `struct S {}` | Define a **struct**, {{ book(page="ch05-00-structs.html") }} {{ ex(page="custom_types/structs.html") }} {{ std(page="std/keyword.struct.html") }} {{ ref(page="expressions/struct-expr.html") }} with named fields. |
| {{ tab() }} `struct S` `()` | Define "tupled" struct with numbered fields `.0`, `.1`, ... |
| {{ tab() }} `struct S;` | Define zero sized unit struct. |
| `enum E {}` | Define an **enum** {{ book(page="ch06-01-defining-an-enum.html") }} {{ ex(page="custom_types/enum.html#enums") }} {{ ref(page="items/enumerations.html") }} , _c_. [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type), [tagged unions](https://en.wikipedia.org/wiki/Tagged_union). |
| {{ tab() }}  `enum E { A, C {} }` | Define variants of enum; can be unit- `A`, tuple- `B` `()` and struct-like `C{}`. |
| {{ tab() }}  `enum E { A = 1 }` | If variants are only unit-like, allow discriminant values, e.g., for FFI. |
| `union U {}` | Unsafe C-like **union**  {{ ref(page="items/unions.html") }} for FFI compatibility. |
| `static X: T = T();`  | **Global variable** {{ book(page="ch19-01-unsafe-rust.html#accessing-or-modifying-a-mutable-static-variable") }} {{ ex(page="custom_types/constants.html#constants") }} {{ ref(page="items/static-items.html#static-items") }}  with `'static` lifetime, single memory location. |
| `const X: T = T();`  | Define inlineable **constant**, {{ book(page="ch03-01-variables-and-mutability.html#differences-between-variables-and-constants") }} {{ ex(page="custom_types/constants.html") }} {{ ref(page="items/constant-items.html") }}. Inlined values are mutable!!! |
| `let x: T;`  | Allocate `T` bytes on stack bound as `x`. Assignable once, not mutable. |
| `let mut x: T;`  | Like `let`, but allow for mutability and mutable borrow. |
| {{ tab() }} `x = y` | Copy bytes at `y` to bytes at `x` if `T: Copy`. Compiler might optimize. |
| {{ tab() }} `x = y` | Same, but also invalidate `y` if `T` not `Copy`. Compiler might optimize. |

</div>

{{ tablesep() }}

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S { x: y }` | Create `struct S {}` or `use`'ed `enum E::S {}` with field `x` set to `y`. |
| `S { x }` | Same, but use local variable `x` for field `x`. |
| `S { ..s }` | Fill remaining fields from `s`, esp. useful with [Default](https://doc.rust-lang.org/std/default/trait.Default.html). |
| `S { 0: x }` | Like `S` `(x)` below, but set field `.0` with struct syntax.  |
| `S` `(x)` | Create `struct S` `(T)` or `use`'ed `enum E::S` `()` with field `.0` set to `x`. |
| `S` | If `S` is unit `struct S;` or `use`'ed `enum E::S` create value of `S`. |
| `E::C { x: y }` | Create enum variant `C`. Other methods above also work. |
| `()` | Empty tuple, both literal and type, aka **unit** {{ std(page="std/primitive.unit.html") }} |
| `(x)` | Parenthesized expression. |
| `(x,)` | Single-element **tuple** expression. {{ ex(page="primitives/tuples.html") }} {{ std(page="std/primitive.tuple.html") }} {{ ref(page="expressions/tuple-expr.html") }} |
| `(S,)` | Single-element tuple type. |
| `[S]` | Array of unspecified length, i.e., **slice**. {{ std(page="std/primitive.slice.html") }}  {{ ex(page="primitives/array.html") }}  {{ ref(page="types.html#array-and-slice-types") }} Can't live on stack. |
| `[S; n]` | **Array type** {{ ex(page="primitives/array.html") }}  {{ std(page="std/primitive.array.html") }} with `n` elements of type `S`. |
| `[x; n]` | Array with `n` copies of `x`. {{ ref(page="expressions/array-expr.html") }} |
| `[x, y]` | Array with given elements. |
| `x[0]` | Collection indexing. Overloadable [Index](https://doc.rust-lang.org/std/ops/trait.Index.html), [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html) |
| `x[..]` | Collection slice-like indexing via [RangeFull](https://doc.rust-lang.org/std/ops/struct.RangeFull.html), _c_. slices.  |
| `x[a..]` | Collection slice-like indexing via [RangeFrom](https://doc.rust-lang.org/std/ops/struct.RangeFrom.html). |
| `x[..b]` | Collection slice-like indexing [RangeTo](https://doc.rust-lang.org/std/ops/struct.RangeTo.html). |
| `x[a..b]` | Collection slice-like indexing via [Range](https://doc.rust-lang.org/std/ops/struct.Range.html). |
| `a..b` | Right-exclusive **range** {{ ref(page="expressions/range-expr.html") }} creation, also seen as `..`, `a..`, `..b`.  |
| `a..=b` | Inclusive range creation, also seen as `..=b`. |
| `x.i` | Member **access**. {{ ref(page="expressions/field-expr.html") }} |
| `x.0` | Tuple access |

</div>

### References & Pointers

Granting access to un-owned memory. Also see section on Generics & Constraints.


<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `&S` | Shared **reference** {{ book(page="ch04-02-references-and-borrowing.html") }} {{ std(page="std/primitive.reference.html") }} {{ nom(page="references.html")}} {{ ref(page="types.html#pointer-types")}} (space for holding _any_ `&s`). |
| {{ tab() }} `&[S]` | Special slice reference that contains address _and_ length (like `&str`). |
| {{ tab() }} `&dyn S` | Special **trait object** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} reference that contains addr. of _data_ and _vtable_. |
| {{ tab() }} `&mut S` | Exclusive reference to allow mutability (also `&mut [S]`, `&mut dyn S`, ...) |
| `*const S` | Immutable **raw pointer type** {{ book(page="ch19-01-unsafe-rust.html#dereferencing-a-raw-pointer") }} {{ std(page="std/primitive.pointer.html") }} {{ ref(page="types.html#raw-pointers-const-and-mut") }}, like `&S` but w/o compile safety. |
| `*mut S` | Mutable raw pointer type, like `&mut S` but w/o compile safety. |
| `&s` | Shared **borrow** {{ book(page="ch04-02-references-and-borrowing.html") }} {{ ex(page="scope/borrow.html") }} {{ std(page="std/borrow/trait.Borrow.html") }} (on low level, address of _this_ `s`, like `0x1234`). |
| `&mut s` | Exclusive borrow that allows **mutability**. {{ ex(page="scope/borrow/mut.html") }} |
| `ref s` | **Bind by reference**. {{ book(page="ch18-03-pattern-syntax.html#legacy-patterns-ref-and-ref-mut") }} {{ ex(page="scope/borrow/ref.html") }} {{ deprecated() }}|
| `*s` | **Dereference**.  {{ book(page="ch15-02-deref.html") }} {{ std(page="std/ops/trait.Deref.html") }} {{ nom(page="vec-deref.html") }} |
| `'a`  | A **lifetime parameter**, {{ book(page="ch10-00-generics.html") }} {{ ex(page="scope/lifetime.html")}} {{ nom(page="lifetimes.html") }} {{ ref(page="items/generics.html#type-and-lifetime-parameters")}}, duration of a flow in static analysis. |
| {{ tab() }}  `&'a S`  | Place for an address of a `S`. Only accepts addr. living `'a` or longer. |
| {{ tab() }}  `&'a mut S`  | Same, but allow content of address to be changed. |
| {{ tab() }}  `S<'a>`  | Signals `S` will contain address with lifetime `'a`. Creator of `S` decides `'a`. |
| {{ tab() }}  `fn f<'a>(t: &'a T)`  | Same, for function. Caller decides `'a`. |
| `'static`  | Special lifetime lasting the entire program execution. |

</div>


### Functions & Behavior

Define units of code and their abstractions.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `trait T {}`  | Define a **trait**. {{ book(page="ch10-02-traits.html") }} {{ ex(page="trait.html") }} {{ ref(page="items/traits.html") }} |
| `trait T : R {}` | `T` is subtrait of **supertrait** {{ ref(page="items/traits.html#supertraits") }} `R`. Any `S` must `impl R` before it can `impl T`. |
| `impl S {}`  | **Implementation** {{ ref(page="items/implementations.html") }} of functionality for a type `S`. |
| `impl T for S {}`  | Implement trait `T` for type `S`. |
| `impl !T for S {}` | Disable an automatically derived **auto trait** {{ nom(page="send-and-sync.html") }} {{ ref(page="special-types-and-traits.html#auto-traits") }}. |
| `fn f() {}`  | Definition of a **function** {{ book(page="ch03-03-how-functions-work.html") }}  {{ ex(page="fn.html") }} {{ ref(page="items/functions.html") }}; or associated function if inside `impl`. |
| {{ tab() }} `fn f() -> T {}`  | Same, returning a value of type T. |
| {{ tab() }} `fn f(&self) {}`  | Define a method as part of an `impl`. |
| `const fn f() {}`  | Constant `fn` for compile time compilations, e.g., `const X: u32 = f(Y)`. {{ edition(ed="'18") }}|
| `fn() -> T`  | **Function pointers**, {{ book(page="ch19-05-advanced-functions-and-closures.html#function-pointers") }} {{ std(page="std/primitive.fn.html") }} {{ ref(page="types.html#function-pointer-types") }} don't confuse with trait [Fn](https://doc.rust-lang.org/std/ops/trait.Fn.html). |
| <code>\|\| {} </code> | A **closure** {{ book(page="ch13-01-closures.html") }} {{ ex(page="fn/closures.html") }} {{ ref(page="expressions/closure-expr.html")}} that borrows its captures. |
| {{ tab() }} <code>\|x\| {}</code> | Closure with a bound parameter `x`. |
| {{ tab() }} <code>\|x\| x + x</code> | Closure without block expression.  |
| {{ tab() }} <code>move \|x\| x + y </code> | Closure taking ownership of its captures. |
| {{ tab() }} <code> return \|\| true </code> | Closures may sometimes look like logical ORs (here: return a closure). |
| `f()` | Invoke callable `f` (e.g., a function, closure, function pointer, `Fn`, ...). |
| `x.f()` | Call member function, requires `f` takes `self`, `&self`, ... as first argument. |
| {{ tab() }} `X::f(x)` | Same as `x.f()`. Unless `impl Copy for X {}`, `f` can only be called once. |
| {{ tab() }} `X::f(&x)` | Same as `x.f()`. |
| {{ tab() }} `X::f(&mut x)` | Same as `x.f()`. |
| {{ tab() }} `S::f(&x)` | Same as `x.f()` if `X` derefs to `S` (i.e., `x.f()` finds methods of `S`). |
| {{ tab() }} `T::f(&x)` | Same as `x.f()` if `X impl T` (i.e., `x.f()` finds methods of `T` if in scope). |
| `X::f()` | Call associated function, e.g., `X::new()`. |
| {{ tab() }} `<X as T>::f()` | Call `T::f()` implemented for `X`. |
| `unsafe {}` | Allows programmer to summon segfaults; **unsafe code**. {{ book(page="ch19-01-unsafe-rust.html?highlight=unsafe#unsafe-superpowers") }} {{ ex(page="unsafe.html#unsafe-operations") }} {{ nom(page="meet-safe-and-unsafe.html") }} {{ ref(page="unsafe-blocks.html#unsafe-blocks") }} |

</div>


### Control Flow

Control execution within a function.

<div class="cheats">

| Sigil | Explanation |
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
| `return x`  | Early return from function. More idiomatic way is to end with expression. |
| `x?` | If `x` is [Err](https://doc.rust-lang.org/std/result/enum.Result.html#variant.Err) or [None](https://doc.rust-lang.org/std/option/enum.Option.html#variant.None), **return and propagate**. {{ book(page="ch09-02-recoverable-errors-with-result.html#propagating-errors") }} {{ ex(page="error/result/enter_question_mark.html") }} {{ std(page="std/result/index.html#the-question-mark-operator-") }} {{ ref(page="expressions/operator-expr.html#the-question-mark-operator")}} |

</div>



### Organizing Code

Segment projects into smaller units and minimize dependencies.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `mod m {}`  | Define a **module**. {{ book(page="ch07-02-modules-and-use-to-control-scope-and-privacy.html") }} {{ ex(page="mod.html#modules") }} {{ ref(page="items/modules.html#modules") }} |
| `a::b` | Namespace **path** {{ ex(page="mod/use.html") }} {{ ref(page="paths.html")}} to element `b` within `a` (`mod`, `enum`, ...). |
| {{ tab() }} `::x` | Search `x` relative to crate root. {{ deprecated() }} |
| {{ tab() }} `crate::x` | Search `x` relative to crate root. {{ edition(ed="'18") }} |
| {{ tab() }} `self::x`  | Search `x` relative to current module. |
| {{ tab() }} `super::x`  | Search `x` relative to parent module. |
| `use a::b;`  | **Use** {{ ex(page="mod/use.html#the-use-declaration") }} {{ ref(page="items/use-declarations.html") }}  `b` directly in this scope without requiring `a` anymore. |
| `use a::{b, c};` | Same, but bring `b` and `c` into scope. |
| `use a::*;`  | Bring everything from `a` into scope and reexport. |
| `pub use a::b;`  | Bring `a::b` into scope and reexport from here. |
| `pub T`  | "Public if parent path public" **visibility** {{ book(page="ch07-02-modules-and-use-to-control-scope-and-privacy.html") }} for `T`. |
| {{ tab() }} `pub(crate) T` | Visible at most in current crate. |
| {{ tab() }} `pub(self) T`  | Visible at most in current module. |
| {{ tab() }} `pub(super) T`  | Visible at most in parent. |
| {{ tab() }} `pub(in a::b) T`  | Visible at most in `a::b`. |
| `extern crate x`; | Declare dependency on external **crate** {{ book(page="ch02-00-guessing-game-tutorial.html#using-a-crate-to-get-more-functionality") }} {{ ex(page="crates/link.html#extern-crate") }} {{ ref(page="items/extern-crates.html#extern-crate-declarations") }} {{ deprecated() }} ; just `use x::f` in {{ edition(ed="'18") }}.  |
| `extern "C" fn`  | External dependency for **FFI**. {{ book(page="ch19-01-unsafe-rust.html#using-extern-functions-to-call-external-code") }} {{ ex(page="std_misc/ffi.html#foreign-function-interface") }} {{ nom(page="ffi.html#calling-foreign-functions") }} {{ ref(page="items/external-blocks.html#external-blocks") }} |

</div>



### Type Aliases and Casts

Short-hand names of types, and methods to convert one type to another.

<div class="cheats">

| Sigil | Explanation |
|---------|-------------|
| `type T = S;`  | Create a **type alias** {{ book(page="ch19-04-advanced-types.html#creating-type-synonyms-with-type-aliases") }} {{ ref(page="items/type-aliases.html?highlight=alias#type-aliases") }}, i.e., another name for `S`. |
| `Self`  | Type alias for **implementing type** {{ ref(page="types.html#self-types") }}, e.g. `fn new() -> Self`. |
| `self`  | Method subject in `fn f(self) {}`, same as `fn f(self: Self) {}`. |
|  {{ tab() }}  `&self`  | Same, but refers to self as borrowed, same as `f(self: &Self)`|
|  {{ tab() }}  `&mut self`  | Same, but mutably borrowed, same as `f(self: &mut Self)` |
|  {{ tab() }}  `self: Box<Self>`  | [Arbitrary self type](https://github.com/withoutboats/rfcs/blob/arbitray-receivers/text/0000-century-of-the-self-type.md), add methods to smart pointers (`my_box.f_of_self()`). |
| `S as T`  | **Disambiguate** {{ book(page="ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name") }} {{ ref(page="expressions/call-expr.html#disambiguating-function-calls") }} type `S` as trait `T`. |
| `x as u32`  | Primitive **cast** {{ ex(page="types/cast.html#casting") }} {{ ref(page="expressions/operator-expr.html#type-cast-expressions") }}, may truncate and be a bit surprising. {{ nom(page="casts.html") }} |

</div>



### Code Generation

Constructs expanded before the actual compilation happens.

<div class="cheats">

| Example |  Explanation |
|---------|---------|
| `m!()` |  **Macro** {{book(page="ch19-06-macros.html")}} {{std(page="std/index.html#macros")}} {{ref(page="macros.html")}} invocation, also `m!{}`, `m![]` (depending on macro). |
| `$x:ty`  | Macro capture, also `$x:expr`, `$x:ty`, `$x:path`, ... {{ref(page="macros-by-example.html")}} |
| `$x` |  Macro substitution in **macros by example**. {{book(page="ch19-06-macros.html")}} {{ex(page="macros.html#macro_rules")}} {{ref(page="macros-by-example.html")}}
| `$(x),*` | Macro repetition "zero or more times" in macros by example. |
| {{ tab() }} `$(x),+` | Same, but "one or more times". |
| {{ tab() }} `$(x)<<+` | In fact separators other than `,` are also accepted. Here: `<<`. |
| `$crate` | Special hygiene variable, crate where macros is defined. {{ todo() }} |
| `#[attr]`  | Outer **attribute**. {{ex(page="attribute.html")}} {{ref(page="attributes.html")}}, annotating the following item. |
| `#![attr]` | Inner attribute, annotating the surrounding item. |

</div>




### Pattern Matching

These constructs are found in `match` or `let` expressions.

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
|  `D => {}` | Match anything, bind `D`; ⚡ possibly false friend of `E::D` if `D` not in `use`. |
|  `_ => {}` | Proper wildcard that matches anything / "all the rest". |
|  `[a, 0] => {}` | Match array with any value for `a` and `0` for second. |
|  `(a, 0) => {}` | Match tuple with any value for `a` and `0` for second. |
| `x @ 1 .. 5 => {}` | Bind matched to `x`; **pattern binding** {{ book(page="ch18-03-pattern-syntax.html#a-bindings") }} {{ ex(page="flow_control/match/binding.html#binding") }}.  |
| <code>0 \| 1 => {}</code> | Pattern alternatives (or-patterns). |
| `S { x } if x > 10`  | Pattern match **guards**. {{ book(page="ch18-03-pattern-syntax.html#extra-conditionals-with-match-guards")}} {{ ex(page="flow_control/match/guard.html#guards")}} |

</div>

{{ tablesep() }}

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `let Some(x) = Some(5)`  | Notably, `let` also pattern matches similar to the table above. |
|  {{ tab() }} `let S { x } = s` | Only `x` will be bound to value `s.x`. |
|  {{ tab() }} `let (_, b, _) = abc` | Only `b` will be bound to value `abc.1`. |
|  {{ tab() }} `let (a, ..) = abc` | Ignoring 'the rest' also works. |
|  {{ tab() }} `let Some(x) = get()` | ⚡ Will **not** work if pattern can be 'refuted', use `if let` instead. |
| `if let Some(x) = get()`  | Branch if pattern can actually be assigned {{ ref(page="expressions/if-expr.html#if-let-expressions") }} (e.g., `enum` variant). |
| `fn f(S { x }: S)`  | Function parameters also work like `let`, here `x` bound to `s.x` of `f(s)`.|

</div>

<!-- This is more relevant for let D = ... cases, https://www.reddit.com/r/rust/comments/a1846o/rust_quiz_26_medium_to_hard_rust_questions_with/eaop291/ -->
<!-- |  `D => {}` | Match struct if `D` unit `struct D;`| -->



### Generics & Constraints

Generics combine with many other constructs such as `struct S<T>`, `fn f<T>()`, ...

<div class="cheats">

| Example | Explanation |
|---------|-------------|
| `S<T>`  | A **generic** {{ book(page="ch10-01-syntax.html") }} {{ ex(page="generics.html") }} type with a type parameter (`T` is placeholder name). |
| `S<T: R>`  | Type short hand **trait bound** {{ book(page="ch10-02-traits.html#using-trait-bounds-to-conditionally-implement-methods") }} {{ ex(page="generics/bounds.html") }} specification  (`R` _must_ be trait). |
| {{ tab() }} `T: R + S`  | **Compound type bound** {{ book(page="ch10-02-traits.html#multiple-trait-bounds-with-") }} {{ ex(page="generics/multi_bounds.html") }}, also seen as `T: R + 'a` |
| {{ tab() }} `T: ?Sized`         | Opt out of a pre-defined trait bound Sized. {{ todo() }} |
| {{ tab() }} `T: 'a` | Type **lifetime bound** {{ ex(page="scope/lifetime/lifetime_bounds.html") }}, all references in T must outlive `'a`.  |
| {{ tab() }} `'b: 'a` | Lifetime `'b` must live at least as long as (i.e., _outlives_) `'a` bound. |
| `S<T> where T: R`  | Same as `S<T: R>` but easier for longer bounds. |
| `S<T = R>` | **Default type parameter** {{ book(page="ch19-03-advanced-traits.html#default-generic-type-parameters-and-operator-overloading") }} for associated type.|
| `S<'_>` | Inferred **anonymous lifetime**. {{ book(page="ch19-02-advanced-lifetimes.html#the-anonymous-lifetime") }} |
| `S<_>` | Inferred **anonymous type**. {{ todo() }} |
| `S::<T>` | **Turbofish** {{ std(page="std/iter/trait.Iterator.html#method.collect")}} call site type disambiguation, e.g. `f::<u32>()`. |
| `trait T<X> {}`  | A trait generic over `X`. Can have multiple `impl T for S` (one per `X`). |
| `trait T { type X; }`  | Defines **associated type** {{ book(page="ch19-03-advanced-traits.html#specifying-placeholder-types-in-trait-definitions-with-associated-types") }} {{ ref(page="items/associated-items.html#associated-types") }} `X`. Only one `impl T for S` possible. |
| {{ tab() }} `type X = R;`  | Set associated type within `impl T for S { type X = R; }`. |
| `impl<T> S<T> {}`  | Implement functionality for any `T` in `S<T>`.  |
| `impl S<T> {}`  | Implement functionality for exactly `S<T>` (e.g., `S<u32>`).  |
| `fn f() -> impl T`  | **Existential types** {{ book(page="ch10-02-traits.html#returning-traits") }}, returns an unknown-to-caller `S` that `impl T`. |
| `fn f(x: &impl T)`  | Trait bound,"**impl traits**" {{ book(page="ch10-02-traits.html#trait-bounds") }}, somewhat similar to `fn f<S:T>(x: &S)`. |
| `fn f(x: &dyn T)`  | Marker for **dynamic dispatch** {{ book(page="ch17-02-trait-objects.html#using-trait-objects-that-allow-for-values-of-different-types") }} {{ ref(page="types.html#trait-objects") }}, `f` will not be monomorphized. |
| `for<'a>` | **Higher-rank trait bounds.** {{ nom(page="hrtb.html")}} {{ ref(page="trait-bounds.html#higher-ranked-trait-bounds")}} |

</div>

<!-- These are a bit wonky to explain as they don't work everywhere and are a bit surprising. -->
<!-- | {{ tab() }} `Box<dyn T>`  | Also works with other type parameters, here box with trait object `T`. | -->
<!-- | {{ tab() }} `Box<impl T>`  | Box with an actual implementation of `T`. | -->




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


## Closures

There is a subtrait relationship `Fn` : `FnMut` : `FnOnce`. That means, a closure that
implements `Fn`, also implements `FnMut` and `FnOnce`. Likewise, a closure
that implements `FnMut`, also implements `FnOnce`.

From a call site perspective that means:

| Signature | Function `g` can call ... |  Function `g` accepts ... |
|--------| -----------| -----------|
| `g<F: FnOnce()>(f: F)`  | ... `f()` once. |  `Fn`, `FnMut`, `FnOnce`  |
| `g<F: FnMut()>(mut f: F)`  | ... `f()` multiple times. | `Fn`, `FnMut` |
| `g<F: Fn()>(f: F)`  | ... `f()` multiple times.  | `Fn` |

<div class="footnotes">
    Notice how <b>asking</b> for a <code>Fn</code> closure as a function is
    most restrictive for the caller; but <b>having</b> a <code>Fn</code>
    closure as a caller is most compatible with any function.
</div>



{{ tablesep() }}

From the perspective of someone defining a closure:

| Closure | Implements<sup>*</sup> | Comment |
|--------| -----------| --- |
| <code> \|\| { moved_s; } </code> | `FnOnce` | Caller must give up ownership of `moved_s`. |
| <code> \|\| { &mut s; } </code> | `FnOnce`, `FnMut` | Allows `g()` to change local state. |
| <code> \|\| { &s; } </code> | `FnOnce`, `FnMut`, `Fn` | May not mutate state; can reuse same vars. |

<div class="footnotes">
    <sup>*</sup> Rust <a href="https://doc.rust-lang.org/stable/reference/expressions/closure-expr.html">prefers capturing</a> by reference
    (resulting in the most "compatible" <code>Fn</code> closures from a caller perspective), but can be
    forced to capture its environment by copy or move via the
    <code>move || {}</code> syntax.
</div>

{{ tablesep() }}

That gives the following advantages and disadvantages:

| Requiring | Advantage | Disadvantage |
|--------| -----------| -----------|
| `F: FnOnce`  | <span class="good">Easy to satisfy as caller.</span> | <span class="bad">Single use only, `g()` may call `f()` just once.</span> |
| `F: FnMut`  | <span class="good">Allows `g()` to change caller state.</span> | <span class="bad">Caller may not reuse captures during `g()`.</span> |
| `F: Fn`  | <span class="good">Many can exist at same time.</span> | <span class="bad">Hardest to produce for caller.</span> |







## Idiomatic Rust

If you are used to programming Java or C, consider these.

<div class="cheats">

| Idiom | Code |
|--------| ---- |
| **Think in Expressions** | `x = if x { a } else { b };` |
|  | `x = loop { break 5 };`  |
|  | `fn f() -> u32 { 0 }`  |
| **Think in Iterators** | `(1..10).map(f).collect()` |
|  | <code>names.iter().filter(\|x\| x.starts_with("A"))</code> |
| **Handle Absence with `?`** | `x = try_something()?;` |
|  | `get_option()?.run()?` |
| **Use Strong Types** | `enum E { Invalid, Valid { ... } }` over `ERROR_INVALID = -1` |
|  | `enum E { Visible, Hidden }` over `visible: bool` |
|  | `struct Charge(f32)` over `f32` |
| **Provide Builders** | `Car::new("X").hp(5).run();` |
| **Split Implementations** | Generic types `S<T>` can have a separate `impl` per `T`. |
|   | Rust doesn't have OO, but with separate `impl` you can get specialization. |
| **Unsafe** | Avoid `unsafe {}`, often safer, faster solution without it. Exception: FFI. |
| **Implement Traits** | `#[derive(Debug, Copy, ...)]` and custom `impl` where needed.|
| **Tooling** | With [**clippy**](https://github.com/rust-lang/rust-clippy) you can improve your code quality. |
|  | Formatting with [**rustfmt**](https://github.com/rust-lang/rustfmt) helps others to read your code. |
|  | Annotate your APIs with doc comments that can show up on [**docs.rs**](https://docs.rs). |
|  | Add **doc tests** {{ book(page="ch14-02-publishing-to-crates-io.html") }} (` ``` my_api::f() ``` `) to ensure docs match code. |
|  | Add **unit tests** {{ book(page="ch11-01-writing-tests.html") }} (`#[test]`) to ensure your code works. |
|  | Follow the [**API Guidelines**](https://rust-lang-nursery.github.io/api-guidelines/) to make your API feel Rustic. |

<!-- |  | Add benchmarks (`#[bench]`) to ensure your code is fast. | -->


</div>



<div class="cheats">


## A Guide to Reading Lifetimes

Lifetimes can be overwhelming at times. Here is a simplified guide on how to read and interpret constructs containing lifetimes if you are familiar with C.

> **Note**:
> This section is work in progress.
> For the time being, use with a grain of salt.
> Feedback very welcome!

| Construct | How to read |
|--------| -----------|
| `let s: S = S(0)`  | A location that is `S`-sized, named `s`, and contains the value `S(0)`.|
|   | If declared with `let`, that location lives on the stack. |
|   | Generally, `s` can mean _location of `s`_, and _value within `s`_. |
|   | As a location, `s = S(1)` means, assign value `S(1)` to location `s`. |
|   | As a value, `f(s)` means call `f` with value inside of `s`. |
|   | To explicitly talk about its location (address) we do `&s`. |
|   | To explicitly talk about a location that can hold such a location we do `&S`. |
| `&'a S`  | A `&S` is a **location that can hold an address** (i.e., reference). |
|   | Any address stored in here must be that of a valid `S`. |
|   | Any address stored must _live_ at least for (_outlive_) duration `'a`. |
|   | That means during `'a` memory targeted by `&S` can't be invalidated.  |
|   | Also, this `&S` must be stopped being used before `'a` ends. |
|   | Duration of `'a` is purely compile time view, based on static analysis. |
| `&S`  | Sometimes `'a` might be elided (or can't be specified) but it still exists. |
|   | Within methods bodies, lifetimes are determined automatically. |
|   | Within signatures, lifetimes may be 'elided' (annotated automatically). |
|  `&s` | This will produce the **actual address of location `s`**, called 'borrow'. |
|   | The moment `&s` is produced, location `s` is put into a **borrowed state**. |
|   | Checking if in borrowed state is based on compile-time analysis. |
|   | This analysis is based on all possible address propagation paths. |
|   | As long as **any** `&s` could be around, `s` cannot be altered directly. |
|   | For example, in `let a = &s; let b = a;`, also `b` needs to go. |
|   | Borrowing of `s` stops once last `&s` is last used, not when `&s` dropped. |
| `&mut s` | Same, but will produce a mutable borrow. |
|   | A `&mut` will allow the *owner of the borrow* (address) to change `s` content. |
|   | This reiterates that not the value in `s`, but `s` location is borrowed. |
| `S<'a> {}` | Signals that `S` will hold an address (i.e., reference). |
|  | `'a` will be determined automatically by the user of this struct. |
|  | `'a` will be chosen as small as possible. |
| `f<'a>(x: &'a T)`  | Signals this function will accept an address (i.e., reference). |
| {{ tab() }} {{ tab() }} {{ tab() }} {{ tab() }} `-> &'a S` | ... and that it returns one. |
|   | `'a` will be determined automatically by the caller. |
|   | `'a` will be chosen as small as possible. |
|   | `'a` will be picked so that it **satisfies input and output** at call site. |
|   | `'a` is mix of where `x` comes from and `f(x)` goes. |
|   | **In addition, propagate borrow state** according to lifetime names! |
|   | So while result address with `'a` is used, input address with `'a` is locked.  |
|   | Here: while `s` from `let s = f(&x)` is around, `x` counts as 'borrowed'. |

{{ tablesep() }}

</div>


## Tooling

Some commands and tools that are good to know.


| Command | Description |
|--------| ---- |
| `cargo init` | Create a new project for the latest edition. |
| `cargo build` | Build the project in debug mode (`--release` for all optimization). |
| `cargo check` | Check if project would compile (much faster). |
| `cargo rustc -- -Zunpretty=X` | Show more desugared Rust code, in particular with X being: |
|  | `expanded` Show with expanded macros, ... |
| `rustup docs` | Open offline Rust documentation, good on a plane! |


{{ tablesep() }}


These are 3rd party tools and need to be installed with `cargo install cargo-[tool]` first.
They often require unstable and are subject to break.

<div class="cheats">


| Command | Description |
|--------| ---- |
| `cargo asm` | Show generated assembly instructions for code. |

</div>



<!--

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
 -->


<!-- Don't render this section for printing, won't be helpful -->
<div class="noprint">



## More Cheats

These are other great visual guides and tables.

{{ tool(src="/link_containers.png", title="Containers", url="https://docs.google.com/presentation/d/1q-c7UAyrUlM-eZyTo1pd8SZ0qwA_wYxmPZVOQkoDmH4/edit") }}
{{ tool(src="/link_railroad.png", title="Macro Railroad", url="https://lukaslueg.github.io/macro_railroad_wasm_demo/") }}
{{ tool(src="/link_lifetimes.png", title="Lifetimes", url="https://rufflewind.com/img/rust-move-copy-borrow.png") }}

| Cheat Sheet | Description |
|--------| -----------|
| [Rust Learning⭐](https://github.com/ctjhoa/rust-learning) | Probably the best collection of links about learning Rust.  |
| [String Conversions](https://docs.google.com/spreadsheets/d/19vSPL6z2d50JlyzwxariaYD6EU2QQUQqIDOGbiGQC7Y/pubhtml?gid=0&single=true) | How to get type of string from another. |
| [API Guidelines Checklist](https://rust-lang-nursery.github.io/api-guidelines/checklist.html) | How to design your own APIs. |
| [Periodic Table of Types](http://cosmic.mearie.org/2014/01/periodic-table-of-rust-types) | How various types and references correlate. |
| [Futures](https://rufflewind.com/img/rust-futures-cheatsheet.html) | How to construct and work with futures. |

{{ tablesep() }}

## Meta

> Want this Rust cheat sheet as a PDF download? <a href="javascript:window.print()"><b>Generate PDF</b></a> (or select File > Print – might take 10s so) and then "Save as PDF". It looks great in both Firefox's and Chrome's PDF exports. Alternatively use the <a href="rust_cheat_sheet.pdf"><b>cached PDF</b></a>.

</div>

<footer>Ralf Biedert, {{ year() }} – <a href="https://cheats.rs">cheats.rs</a></footer>

let s1 = Symbol("s1");
console.log(s1); // Symbol(s1)
// console.log(s1 == 1); // false
// console.log(Boolean(s1)); // true
// console.log(String(s1)); // "Symbol(s1)"
console.log(s1 + 1); // TypeError: Cannot convert a Symbol value to a number
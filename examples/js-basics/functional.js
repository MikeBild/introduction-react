function add(a) {
  return (b) => {
    return a + b;
  };
}
const add5 = add(5);
const ten = add5(5);
const ten2 = add5(10);
console.log(ten);
console.log(ten2);

function b(callback) {
  const foo = "foo";
  callback(foo);
}

b((x) => {
  console.log(x);
});

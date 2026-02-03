import BSTree from "./tree.js";
try {
  const testArray = [1, 1, 2, 9, 8, 4, 3, 2, 6, 7, 5, 5, 5, 5];
  const tree = new BSTree(testArray);

  tree.prettyPrint();
} catch (err) {
  console.log(err);
}

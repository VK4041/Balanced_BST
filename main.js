import BSTree from "./tree.js";
try {
  const testArray = [1, 1, 2, 9, 8, 4, 3, 2, 6, 7, 5, 5, 5, 5];
  const tree = new BSTree(testArray);

  // tree.prettyPrint();
  function display(value) {
    console.log(`Callback on value: ${value}`);
  }
  console.log("\nInOrder");
  tree.inOrderForEach(display);
  console.log("\nPreOrder");
  tree.preOrderForEach(display);
  console.log("\nPostOrder");
  tree.postOrderForEach(display);
} catch (err) {
  console.log(err);
}

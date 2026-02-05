import BSTree from "./tree.js";
try {
  function getRandomArray() {
    const randomLength = Math.floor(Math.random() * 100); //Limitnig array size between [0,100] elements
    const randomArray = [];
    for (let i = randomLength; i > 0; i--) {
      randomArray.push(Math.floor(Math.random() * 100)); //Node value between [0,100)
    }
    return randomArray;
  }
  const displayValue = (value) => console.log(value);
  const testArray = getRandomArray();
  const tree = new BSTree(testArray);
  tree.insert(400);
  tree.insert(300);
  tree.insert(1000);
  tree.insert(Infinity);
  tree.prettyPrint();
  tree.isBalanced()
    ? console.log("Tree is balanced")
    : console.log("Tree is unbalanced\n");
  tree.reBalance();
  tree.prettyPrint();
  tree.inOrderForEach(displayValue);
} catch (err) {
  console.log(err);
}

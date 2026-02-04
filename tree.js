//Class for balanced BST
import Node from "./node.js";
export default class BSTree {
  constructor(array) {
    //Array needs to be sorted and must not have duplicates
    array = [...new Set(array)];
    array.sort((a, b) => a - b);
    this.root = this.buildTree(array);
  }
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.leftChild = this.buildTree(array, start, mid - 1);
    root.rightChild = this.buildTree(array, mid + 1, end);

    return root;
  }
  insert(value, root = this.root) {
    //No duplicate, don't insert
    if (root.value === value) return;
    if (value < root.value) {
      if (!root.leftChild) {
        root.leftChild = new Node(value);
        return;
      }
      this.insert(value, root.leftChild);
    } else {
      if (!root.rightChild) {
        root.rightChild = new Node(value);
        return;
      }
      this.insert(value, root.rightChild);
    }
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true,
      );
    }
  }
  inorderPred(root) {
    if (root === null) return null;
    if (root.rightChild === null) return root;
    return this.inorderPred(root.rightChild);
  }
  inorderSucc(root) {
    if (root === null) return null;
    if (root.leftChild === null) return root;
    return this.inorderSucc(root.leftChild);
  }
  delete(value, root = this.root) {
    if (!value) {
      console.log("BST Unchanged: No value given to delete");
      return;
    }
    if (root === null) {
      console.log(`BST Unchanged: Node (${value}) not found`);
      return null;
    }
    //Traversal
    if (value < root.value) {
      root.leftChild = this.delete(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.delete(value, root.rightChild);
    } else {
      //Node to delete is found
      if (!root.leftChild && !root.rightChild) {
        //leaf node
        return null; //makes the parent link null
      }
      //select inorder predecessor or inorder successor based on heights of left/right child
      if (this.height(root.leftChild) > this.height(root.rightChild)) {
        //Take predecessor
        let pred = this.inorderPred(root.leftChild);
        root.value = pred.value;
        root.leftChild = this.delete(pred.value, root.leftChild);
      } else {
        //take successor
        let succ = this.inorderSucc(root.rightChild);
        root.value = succ.value;
        root.rightChild = this.delete(succ.value, root.rightChild);
      }
    }
    //Return current node to previous call to continue recursion
    return root;
  }
  includes(value) {
    return this.searchNode(value) ? true : false;
  }
  searchNode(value, root = this.root) {
    if (root === null) return null;
    if (value < root.value) return this.searchNode(value, root.leftChild);
    else if (value > root.value) return this.searchNode(value, root.rightChild);
    else return root;
  }
  calculateHeight(node) {
    if (node === null) return -1;
    let leftHeight = this.calculateHeight(node.leftChild);
    let rightHeight = this.calculateHeight(node.rightChild);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  height(value) {
    const node = this.searchNode(value);
    if (!node) return undefined;
    return this.calculateHeight(node);
  }
  depth(value, root = this.root, count = 0) {
    if (root === null) return undefined;
    if (value < root.value) {
      return this.depth(value, root.leftChild, count + 1);
    } else if (value > root.value) {
      return this.depth(value, root.rightChild, count + 1);
    } else {
      return count;
    }
  }
  //BFS
  levelOrderForEachIter(callback, root = this.root) {
    if (!callback) throw new Error("A callback must be provided!");
    if (root === null) return;
    const Q = [root];
    while (Q.length !== 0) {
      let seen = Q.shift();
      callback(seen.value);
      if (seen.leftChild) Q.push(seen.leftChild);
      if (seen.rightChild) Q.push(seen.rightChild);
    }
  }
  levelOrderForEachRecur(callback, Q = [this.root]) {
    if (!callback) throw new Error("A callback must be provided!");
    if (this.root === null) return;
    if (Q.length === 0) return;

    const seen = Q.shift();
    callback(seen.value);

    if (seen.leftChild) Q.push(seen.leftChild);
    if (seen.rightChild) Q.push(seen.rightChild);

    this.levelOrderForEachRecur(callback, Q);
  }
  //DFS
  inOrderForEach(callback, root = this.root) {
    if (root === null) return;
    if (!callback) throw new Error("A callback must be provided!");
    this.inOrderForEach(callback, root.leftChild);
    callback(root.value);
    this.inOrderForEach(callback, root.rightChild);
  }
  preOrderForEach(callback, root = this.root) {
    if (root === null) return;
    if (!callback) throw new Error("A callback must be provided!");
    callback(root.value);
    this.preOrderForEach(callback, root.leftChild);
    this.preOrderForEach(callback, root.rightChild);
  }
  postOrderForEach(callback, root = this.root) {
    if (root === null) return;
    if (!callback) throw new Error("A callback must be provided!");
    this.postOrderForEach(callback, root.leftChild);
    this.postOrderForEach(callback, root.rightChild);
    callback(root.value);
  }
}

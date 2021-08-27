// 二叉树节点类
class BinaryNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// 二叉树类
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // 插入
    insert(key) {
        let newNode = new BinaryNode(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        // 插入node与当前node进行对比
        // 小于，向左查找
        if (newNode.key < node.key) {
            if(node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
        // 大于 向右查找
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 前序遍历
    preOrderTraversal(handler) {
        this.preOrderTraversalNode(this.root, handler);
    }

    preOrderTraversalNode(node, handler) {
        if (node !== null) {
            handler(node.key);
            this.preOrderTraversalNode(node.left, handler);
            this.preOrderTraversalNode(node.right, handler);
        }
    }

    // 中序遍历
    midOrderTraversal(handler) {
        this.midOrderTraversalNode(this.root, handler);
    }
    midOrderTraversalNode(node, handler) {
        if (node !== null) {
            this.midOrderTraversalNode(node.left, handler);
            handler(node.key);
            this.midOrderTraversalNode(node.right, handler);
        }
    }

    // 后序遍历
    postOrderTraversal(handler) {
        this.postOrderTraversalNode(this.root, handler);
    }
    postOrderTraversalNode(node, handler) {
        if (node !== null) {
            this.postOrderTraversalNode(node.left, handler);
            this.postOrderTraversalNode(node.right, handler);
            handler(node.key);
        }
    }

    min() {
        let current = this.root;

        while(current.left !== null) {
            current = current.left;
        }

        return current;
    }

    max() {
        let current = this.root;
        while(current.right !== null) {
            current = current.right;
        }

        return current;
    }

    // 查找节点
    search(key) {
        return this.searchNode(this.root, new BinaryNode(key));
    }

    searchNode(node, searchNode) {
        if (node === null) return null;

        if (searchNode.key < node.key) {
            return this.searchNode(node.left, searchNode);
        } else if (searchNode.key > node.key) {
            return this.searchNode(node.right, searchNode);
        } else {
            return node;
        }
    }

    // 删除节点
    remove(key) {
        let isLeftChild = true;
        let parentNode = null;
        let current = this.root;

        // 找到要删除的节点
        while(current.key !== key) {
            parentNode = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }
        }

        if (current === null) return false;

        // 被删除的节点没有子节点
        if (current.left === null && current.right === null) {
            if (this.root === current) {
                this.root = null;
            } else if (isLeftChild) {
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }
        } else if(current.right === null) {
        // 要删除的节点有一个左子节点；
            if (this.root === current) {
                this.root = current.left;
            } else if (isLeftChild) {
                parentNode.left = current.left;
            } else {
                parentNode.right = current.left;
            }
        } else if (current.left === null) {
            // 要删除的节点有一个右子节点；
            if (this.root === current) {
                this.root = current.right;
            } else if (isLeftChild) {
                parentNode.left = current.right;
            } else {
                parentNode.right = current.right;
            }
        } else {
            // 要删除的节点有两个子节点

            // 找到后继节点
            let successor = this.getSuccessor(current);
            successor.left = current.left;
            successor.right = current.right;
            console.log(successor === this.root, successor)
            if(successor === this.root) {
                this.root = successor;
            } else if (isLeftChild){
                parentNode.left = successor;
            } else {
                parentNode.right = successor;
            }

        }
        
    }

    getSuccessor(delNode) {
        let current = delNode.right;
        let successor = delNode;
        let successorParent = delNode;
        while(current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }

        successorParent.left = successor.right;

        return successor;
    }
}

var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
// bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
// bst.insert(6);
bst.insert(19);
console.log(bst)

// var preOrderResult = [];
// bst.preOrderTraversal((key) => {
//     preOrderResult.push(key);
// });
// console.log(preOrderResult)

// var midOrderResult = [];
// bst.midOrderTraversal(key => {
//     midOrderResult.push(key);
// });
// console.log(midOrderResult)
// var postOrderResult = [];
// bst.postOrderTraversal(key => {
//     postOrderResult.push(key);
// })
// console.log(postOrderResult);


// console.log(bst.min());
// console.log(bst.max());
// console.log(bst.search(5));
// console.log(bst.search(11));

console.log(bst.remove(15));
var mid = []
bst.midOrderTraversal(key => {
    mid.push(key);
});
console.log(mid)
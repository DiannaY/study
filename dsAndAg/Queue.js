/**
 * 队列的结构
 */

 class Queue {
    constructor(){
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.uhift();
    }

    front() {
        return this.items[0];
    }

    size() {
        return this.items.length;
    }

    toString() {
        let result = '';
        for(let i = 0; i < this.items.length;i ++) {
            result += this.items[i] + ' ';
        }
        return result;
    }
}

// 队列应用
// 优先队列内部的元素类
class QueueElement {
    constructor(element, priority) {
      this.element = element;
      this.priority = priority;
    }
}

/**
 * 栈的封装
 */
 class Stack {
    constructor() {
        // 栈的属性
        this.items = [];
    }
    // 栈的相关操作

    // 入栈
    push(item) {
        return this.items.push(item)
    }

    // 出栈（）
    pop() {
        return this.items.pop();
    }

    // 查看栈顶元素
    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toString() {
        return JSON.stringify(this.items);
    }
}

/**
 * 十进制转二进制
 */

 function dec2bin(decNumber) {
    // 定义栈对象
    let stack = new Stack();

    // 循环操作
    while(decNumber > 0) {
        // 获取余数压入栈内
        stack.push(decNumber % 2);
        // 获取整除后的结构作为下一次运算的结果
        decNumber = Math.floor(decNumber / 2);
    }
    
    let binaryString = '';
    // 3. 从栈中取出数
    while(!stack.isEmpty()) {
        binaryString += stack.pop();
    }

    return binaryString;
}
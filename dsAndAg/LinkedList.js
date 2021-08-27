function Node(data) {
    this.data = data;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.length = 0;
    LinkedList.prototype.append = function(data) {
        var newNode = new Node(data);
        if (this.length === 0) {
            this.head = newNode;
        } else {
            var current = this.head;
            while(current) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length += 1;
    }

    LinkedList.prototype.toString = function() {
        var listString = '';
        var current = this.head;
        while(current) {
            listString += current.data + ' ';
            current = current.next;
        }
        return listString;
    }

    LinkedList.prototype.insert = function(data, position) {
        if (position < 0 || position > this.length) {
            return false;
        }

        var newNode = new Node(data);

        if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            var index = 0;
            var current = this.head;
            var prev = null;
            while(index++ < position) {
                prev = current;
                current = current.next;
            }
            newNode.next = current;
            prev.next = newNode;
        }
        this.length += 1;
    }

    LinkedList.prototype.getData = function(position) {
        if (position < 0 || position >= this.length) return null;

        var current = this.head;
        var index = 0;
        while(index++ < position) {
            current = current.next;
        }

        return current.data;
    }

    LinkedList.prototype.indexOf = function(data) {
        var current = this.head;
        var index = 0;
        while(current) {
            if (data === current.data) {
                return index;
            }
            current = current.next;
            index += 1;
        }
        return -1;
    }

    LinkedList.prototype.update = function(position, newData) {
        if (position < 0 || position >= this.length) return false;

        var current = this.head;
        var index = 0;
        while(index++ < position) {
            current = current.next;
        }
        current.data = newData;
    }
}


function DoublyLinkedList() {
    function Node(data) {
        this.prev = null;
        this.data = data;
        this.next = null;
    }
    this.head = null;
    this.tail = null;
    DoublyLinkedList.prototype.append = function() {

    }
}
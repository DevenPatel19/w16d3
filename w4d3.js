class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Stack {
    constructor() {
        this.top = null;
    }

    isEmpty() {
        if (this.top == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
	 * Adds a new given item to the top of this stack.
	 * - Time: O(1) constant.
	 * - Space: O(1) constant.
	 * @param {any} item The new item to be added to the top.
  
	 */

    push(data) {
        const node = new Node(data);
        if (this.top == null) {
            this.top = node;
        } else {
            node.next = this.top;
            this.top = node;
        }
    }

    /**
     * Removes the top / last item from this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The removed data or undefined if this stack was empty.
     */
    pop() {
        if (this.isEmpty()) {
            return;
        }
        const removedData = this.top.data;
        this.top = this.top.next;
        return removedData;
    }

    /**
     * Retrieves the top / last item from this stack without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The data of top / last item of this stack.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.top.data;
    }

    /**
     * Returns the size of this stack.
     * @returns {number} The length.
     * without .next (push, pop, peek, isEmpty)
     */
    size() {
        // 1. pop everything out
        // 2. put them in a temp stack,
        // 3. put them back
        const tempStack = new Stack();
        let count = 0;
        while (!this.isEmpty()) {
            const tempData = this.pop();
            tempStack.push(tempData);
            count++;
        }
        while (!tempStack.isEmpty()) {
            this.push(tempStack.pop());
        }
        return count;
    }

    printStack() {
        // For learning purpose
        if (this.isEmpty()) {
            console.log("Empty stack");
            return;
        }
        console.log("TOP");
        let runner = this.top;
        while (runner) {
            console.log(runner.data);
            runner = runner.next;
        }
    }
}

/**
 * Class to represent a queue using an array to store the queued items.
 * Follows a FIFO (First In First Out) order where new items are added to the
 * back and items are removed from the front.
 */
class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
    }

    /**
     * Returns whether or not this queue is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return this.front === null;
    }

    /**
     * Retrieves the first item without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    getFront() {
        if (!this.front) return null;
        return this.front;
    }

    /**
     * Adds a new given item to the back of this queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to add to the back.
     * @returns {number} The new size of this queue.
     */
    enqueue(data) {
        const newNode = new Node(data);
        if (!this.rear) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
    }

    /**
     * Removes and returns the first item of this queue.
     * - Time: O(n) linear, due to having to shift all the remaining items to
     *    the left after removing first elem.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    dequeue() {
        if (!this.front) return;
        const temp = this.front;
        this.front = this.front.next;
        return temp.data;
    }

    /**
     * Check if the target value exists in the queue using the basic queue operations
     * @returns {Boolean }
     */
    contains(targetVal) {
        var q2 = new Queue();
        var foundVal = false;

        while (this.front) {
            if (this.front.data == targetVal) {
                foundVal = true;
            }
            q2.enqueue(this.dequeue());
        }

        while (q2.front) {
            this.enqueue(q2.dequeue());
        }
        return foundVal;
    }

    printQueue() {
        //for learning puspose
        console.log("Front: " + this.front.data);
        var runner = this.front;
        while (runner) {
            console.log(runner.data);
            runner = runner.next;
        }
        console.log("Rear: " + this.rear.data);
    }
}

/**
 * Compares 2 queues to see if they are equal.
 * Avoid indexing the queue items directly via bracket notation, use the
 * queue methods instead for practice.
 * Use no extra array or objects.
 * The queues should be returned to their original order when done.
 * - Time: O(?).
 * - Space: O(?).
 * @param {Queue} q1 q2 The queues to be compared
 * @returns {boolean} Whether all the items of the two queues are equal and
 *    in the same order.
 */
function compareQueue(q1, q2) {
    if (q1.isEmpty() && q2.isEmpty()) {
        return true;
    }

    while (!q1.isEmpty() && !q2.isEmpty()) {
        if (q1.dequeue() !== q2.dequeue()) {
            return false;
        }
    }

    // Restore the original order of the queues
    while (!q1.isEmpty()) {
        q2.enqueue(q1.dequeue());
    }
    while (!q2.isEmpty()) {
        q1.enqueue(q2.dequeue());
    }

    return true;
}

/**
 * Determines if the queue is a palindrome (same items forward and backwards).
 * Avoid indexing queue items directly via bracket notation, instead use the
 * queue methods for practice.
 * Use only 1 stack as additional storage, no other arrays or objects.
 * The queue should be returned to its original order when done.
 * - Time: O(?).
 * - Space: O(?).
 * @returns {boolean}
 */
function isPalindrome(q) {
    const stack = new Stack();

    // Push queue items onto the stack
    while (!q.isEmpty()) {
        stack.push(q.dequeue());
    }

    // Create a new queue from the stack
    const reversedQueue = new Queue();
    while (!stack.isEmpty()) {
        reversedQueue.enqueue(stack.pop());
    }

    let isPalindrome = true;
    while (!q.isEmpty() && !reversedQueue.isEmpty()) {
        if (q.dequeue() !== reversedQueue.dequeue()) {
            isPalindrome = false;
            break;
        }
    }

    // Restore the original order of the queue
    while (!reversedQueue.isEmpty()) {
        q.enqueue(reversedQueue.dequeue());
    }

    return isPalindrome;
}

var test1 = new Queue();
test1.enqueue("a");
test1.enqueue("b");
test1.enqueue("c");
test1.enqueue("d");
test1.printQueue();

var test2 = new Queue();
test2.enqueue("a");
test2.enqueue("b");
test2.enqueue("c");
test2.enqueue("d");

var test3 = new Queue();
test3.enqueue("a");
test3.enqueue("b");
test3.enqueue("c");
test3.enqueue("b");
test3.enqueue("a");

console.log(compareQueue(test1, test3) + " expected:false"); // expected: false
console.log(compareQueue(test1, test2) + " expected:true"); // expected: true

// console.log(isPalindrome(test2)); // expected : false
// console.log(isPalindrome(test3)); // expected : true

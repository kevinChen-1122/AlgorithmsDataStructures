// 雙向鏈結串列
class DoublyLinkedList {
    /**
     * @constructor head 起始位置
     * @constructor tail 最後位置
     * @constructor length 長度
     */
    constructor() {
        this.head = new Node(null)
        this.tail = new Node(null)
        this.head.next = this.tail
        this.tail.previous = this.head
        this.length = 0
    }

    /**
     * 從尾部增加一筆資料
     * @param {*} data
     */
    append(data) {
        let newNode = new Node(data)
        let lastNode = this.tail.previous
        newNode.previous = lastNode
        newNode.next = this.tail
        lastNode.next = newNode
        this.tail.previous = newNode
        this.length += 1
    }


    /**
     * 插入一筆資料
     * @param {number} index 位置
     * @param {*} data 資料
     */
    insert(index, data) {
        let newNode = new Node(data)
        let prevNode = this.getNode(index - 1)
        newNode.previous = prevNode
        newNode.next = prevNode.next
        prevNode.next = newNode
        newNode.next.previous = newNode
        this.length += 1
    }

    /**
     * 更新一筆資料
     * @param {number} index 位置
     * @param {*} data 更新資料
     */
    update(index, data) {
        let node = this.getNode(index)
        if (node) {
            node.data = data
        }
    }

    /**
     * 刪除一筆資料
     * @param {number} index 位置
     */
    delete(index) {
        let nodeToDelete = this.getNode(index)
        if (nodeToDelete) {
            const prevNode = nodeToDelete.previous
            const nextNode = nodeToDelete.next
            prevNode.next = nextNode
            nextNode.previous = prevNode
        }
    }

    /**
     * 反轉資料
     */
    reverse() {
        let current = this.head
        let temp
        while (current !== null) {
            temp = current.next
            current.next = current.previous
            current.previous = temp
            current = temp
        }
        temp = this.head
        this.head = this.tail
        this.tail = temp
    }

    /**
     * 取得指定位置節點
     * @param {number} index 位置
     * @returns {Node|null} Node 節點
     */
    getNode(index) {
        let current
        if (index < 0) {
            current = this.head
            index = 0
        } else {
            current = this.head.next
        }
        for (let i = 0; i < index && current !== this.tail; i++) {
            current = current.next
        }
        return current
    }

    /**
     * 顯示資料
     */
    display() {
        let current = this.head.next
        while (current !== this.tail) {
            console.log(current.data)
            current = current.next
        }
    }

}

// 節點
class Node {
    /**
     * @constructor next 下一個位置
     * @constructor previous 前一個位置
     * @param {*} data 資料
     */
    constructor(data) {
        this.next = null
        this.previous = null
        this.data = data
    }
}
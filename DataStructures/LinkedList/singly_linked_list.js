// 單向鏈結串列
class SinglyLinkedList {
    /**
     * @constructor head 起始位置
     * @constructor length 長度
     */
    constructor() {
        this.head = null
        this.length = 0
    }

    /**
     * 確認是空的
     * @returns {boolean}
     */
    isEmpty() {
        return this.length === 0
    }

    /**
     * 從尾部增加一筆資料
     * @param {*} data
     */
    append(data) {
        let newNode = new Node(data)
        if (this.isEmpty()) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next != null) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
    }

    /**
     * 插入一筆資料
     * @param {number} index 位置
     * @param {*} data 資料
     */
    insert(index, data) {
        let newNode = new Node(data)
        if (index === 0) {
            newNode.next = this.head
            this.head = newNode
            this.length += 1
        } else {
            let previous = this.getNode(index)
            if (previous !== null) {
                newNode.next = previous.next
                previous.next = newNode
                this.length += 1
            } else {
                this.append(data)
            }
        }
    }

    /**
     * 更新一筆資料
     * @param {*} data 更新資料
     * @param {number} index 資料位置
     */
    update(index, data) {
        let updateNode = this.getNode(index)
        if (updateNode !== null) {
            updateNode.data = data
        }
    }

    /**
     * 刪除一筆資料
     * @param {number} index 位置
     */
    delete(index) {
        if (index >= 0 && index <= this.length) {
            let previous = this.getNode(index - 1)
            let current = this.getNode(index)
            if (previous !== null && current.next !== null) {
                previous.next = current.next
            } else if (previous === null) {
                this.head = current.next
            } else {
                previous.next = null
            }
            this.length -= 1
        }
    }

    /**
     * 反轉資料
     * @param {Node} node 節點
     * @returns {*}
     */
    reverse(node = this.head) {
        if (!node || !node.next) {
            return node
        }
        let tmp = this.reverse(node.next)
        node.next.next = node
        node.next = null
        return tmp
    }

    /**
     * 取得指定位置節點
     * @param {number} index 位置
     * @returns {Node|null} Node 節點
     */
    getNode(index) {
        if (index < 0 || index > this.length) {
            return null
        }
        let current = this.head
        let currentIndex = 1
        while (currentIndex < index) {
            currentIndex += 1
            current = current.next
        }
        return current
    }

    /**
     * 顯示資料
     */
    display() {
        let current = this.head
        while (current.next !== null) {
            console.log(current.data)
            current = current.next
        }
    }

}

// 節點
class Node {
    /**
     * @constructor next 下一個位置
     * @param {*} data 資料
     */
    constructor(data) {
        this.next = null
        this.data = data
    }
}
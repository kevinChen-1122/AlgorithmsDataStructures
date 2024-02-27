// 循環鏈結串列
class CircularLinkedList {
    constructor() {
        this.head = null
    }

    isEmpty() {
        return this.head === null
    }

    /**
     * 從尾部增加一筆資料
     * @param data
     */
    append(data) {
        const newNode = new Node(data)
        if (this.isEmpty()) {
            this.head = newNode
            newNode.next = this.head
        } else {
            let current = this.head
            while (current.next !== this.head) {
                current = current.next
            }
            current.next = newNode
            newNode.next = this.head
        }
    }

    /**
     * 插入一筆資料
     * @param {number} index 位置
     * @param {*} data 資料
     */
    insert(index, data) {
        let newNode = new Node(data)
        if (this.isEmpty()) {
            this.head = newNode
            newNode.next = this.head
        } else if (index === 0) {
            let current = this.head
            while (current.next !== this.head) {
                current = current.next
            }
            newNode.next = this.head
            this.head = newNode
            current.next = newNode
        } else {
            let current = this.head
            let previous = null
            for (let currentIndex = 0; currentIndex < index; currentIndex++) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode
        }
    }

    /**
     * 更新一筆資料
     * @param {number} index 位置
     * @param {*} data 更新資料
     */
    update(index, data) {
        if (this.isEmpty()) {
            return
        }
        let current = this.head
        let currentIndex = 0
        while (current !== this.head) {
            if (currentIndex === index) {
                current.data = data
                return
            }
            current = current.next
            currentIndex++
        }
    }

    /**
     * 刪除一筆資料
     * @param {number} index 位置
     */
    delete(index) {
        if (this.isEmpty()) {
            return
        }
        let current = this.head
        let previous = null
        let currentIndex = 0
        while (current !== this.head) {
            if (currentIndex === index) {
                if (currentIndex === 0) {
                    let tail = this.head
                    while (tail.next !== this.head) {
                        tail = tail.next
                    }
                    this.head = current.next
                    tail.next = this.head
                } else {
                    previous.next = current.next
                }
                return
            }
            previous = current
            current = current.next
            currentIndex++
        }
    }

    /**
     * 反轉資料
     */
    reverse() {
        if (this.isEmpty()) {
            return
        }
        let current = this.head
        let previous = null
        let nextNode = null
        while (current !== this.head) {
            nextNode = current.next
            current.next = previous
            previous = current
            current = nextNode
        }
        this.head = previous
    }

    /**
     * 顯示資料
     */
    display() {
        if (this.isEmpty()) {
            return
        }
        let current = this.head
        while (current !== this.head) {
            console.log(current.data)
            current = current.next
        }
    }
}

// 節點
class Node {
    /**
     * @constructor next 下一個位置
     * @param {*} data
     */
    constructor(data) {
        this.data = data
        this.next = null
    }
}
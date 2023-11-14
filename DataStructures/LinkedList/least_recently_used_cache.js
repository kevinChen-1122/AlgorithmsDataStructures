// 最近最少使用快取
class LeastRecentlyUsedCache {
    /**
     * @param {number} capacity 快取儲存數量上限
     */
    constructor(capacity = 2) {
        this.capacity = capacity
        this.hashMap = {}
        this.count = 0
        this.head = new Node()
        this.tail = new Node()
        this.head.next = this.tail
        this.tail.previous = this.head
    }

    setCapacity(capacity) {
        this.capacity = capacity
    }

    /**
     * 取得內容
     * @param {*} key 鍵值
     * @returns {-1|*}
     */
    get(key) {
        if (key in this.hashMap) {
            let node = this.hashMap[key]
            this.moveToHead(node)
            return node.value
        }
        return -1
    }

    /**
     * 儲存內容
     * @param {*} key 鍵值
     * @param {*} value 內容
     */
    put(key, value) {
        if (key in this.hashMap) {
            let node = this.hashMap[key]
            node.value = value
            this.moveToHead(node)
        } else {
            let newNode = new Node(key, value)
            this.hashMap[key] = newNode
            this.addNode(newNode)
            this.count++
            if (this.count > this.capacity) {
                let tail = this.popTail()
                delete this.hashMap[tail.key]
                this.count--
            }
        }
    }

    addNode(node) {
        node.previous = this.head
        node.next = this.head.next
        this.head.next.previous = node
        this.head.next = node
    }

    removeNode(node) {
        node.previous.next = node.next
        node.next.previous = node.previous
    }

    moveToHead(node) {
        this.removeNode(node)
        this.addNode(node)
    }

    popTail() {
        let res = this.tail.previous
        this.removeNode(res)
        return res
    }
}

class Node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.previous = null
        this.next = null
    }
}
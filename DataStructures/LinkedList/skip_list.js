// 跳表
class SkipList {
    constructor(maxLevel = 16) {
        this.maxLevel = maxLevel
        this.head = this.createNode(null, null, maxLevel)
        this.level = 0
    }

    createNode(data, level) {
        return new Node(data, level)
    }

    randomLevel() {
        let level = 0
        while (Math.random() < 0.5 && level < this.maxLevel) {
            level++
        }
        return level
    }

    /**
     * 插入一筆資料
     * @param {*} data 資料
     */
    insert(data) {
        let update = new Array(this.maxLevel + 1)
        let current = this.head
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].data < data) {
                current = current.forward[i]
            }
            update[i] = current
        }
        current = current.forward[0]
        if (current && current.data === data) {
            current.data = data;
        } else {
            let newLevel = this.randomLevel()
            if (newLevel > this.level) {
                for (let i = this.level + 1; i <= newLevel; i++) {
                    update[i] = this.head
                }
                this.level = newLevel
            }
            const newNode = this.createNode(data, newLevel)
            for (let i = 0; i <= newLevel; i++) {
                newNode.forward[i] = update[i].forward[i]
                update[i].forward[i] = newNode
            }
        }
    }

    /**
     * 更新一筆資料
     * @param {*} data 舊資料
     * @param {*} newData 更新資料
     */
    update(data, newData) {
        let current = this.head
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].data < data) {
                current = current.forward[i]
            }
        }
        current = current.forward[0]
        if (current && current.data === data) {
            current.data = newData
        }
    }

    /**
     * 刪除一筆資料
     * @param {*} data 刪除資料
     */
    delete(data) {
        let update = new Array(this.maxLevel + 1)
        let current = this.head
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].data < data) {
                current = current.forward[i]
            }
            update[i] = current
        }
        current = current.forward[0]
        if (current && current.data === data) {
            for (let i = 0; i <= this.level; i++) {
                if (update[i].forward[i] !== current) {
                    break
                }
                update[i].forward[i] = current.forward[i]
            }
            while (this.level > 0 && !this.head.forward[this.level]) {
                this.level--
            }
        }
    }

    /**
     * 顯示資料
     */
    display() {
        for (let level = this.level; level >= 0; level--) {
            let current = this.head.forward[level]
            let output = `Level ${level}: `
            while (current) {
                output += `${current.data} -> `
                current = current.forward[level]
            }
            console.log(output + "null")
        }
    }
}

// 節點
class Node {
    constructor(data, level) {
        this.data = data
        this.forward = new Array(level + 1)
    }
}
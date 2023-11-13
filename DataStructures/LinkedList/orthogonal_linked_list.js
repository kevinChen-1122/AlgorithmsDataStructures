// 十字鏈結串列
class OrthogonalLinkedList {
    constructor(rows = 0, columns = 0) {
        this.rows = rows
        this.columns = columns
        this.rowHeaders = new Array(rows)
        this.columnHeaders = new Array(columns)
    }

    /**
     * 插入一筆資料
     * @param {number} row 列
     * @param {number} column 行
     * @param {*} data 資料
     */
    insert(row, column, data) {
        if (row + 1 > this.rows) {
            this.rows = row + 1
        }
        if (column + 1 > this.columns) {
            this.columns = column + 1
        }
        let newNode = new Node(row, column, data)
        this.insertNodeInRow(row, newNode)
        this.insertNodeInColumn(column, newNode)
    }

    insertNodeInRow(row, newNode) {
        if (!this.rowHeaders[row]) {
            this.rowHeaders[row] = newNode
        } else {
            let current = this.rowHeaders[row]
            let prev = null
            while (current && current.column < newNode.column) {
                prev = current
                current = current.rowNext
            }
            if (current && current.column === newNode.column) {
                current.data = newNode.data
            } else {
                newNode.rowNext = current
                if (prev) {
                    prev.rowNext = newNode
                } else {
                    this.rowHeaders[row] = newNode
                }
            }
        }
    }

    insertNodeInColumn(column, newNode) {
        if (!this.columnHeaders[column]) {
            this.columnHeaders[column] = newNode
        } else {
            let current = this.columnHeaders[column]
            let prev = null
            while (current && current.row < newNode.row) {
                prev = current
                current = current.columnNext
            }
            if (current && current.row === newNode.row) {
                current.data = newNode.data
            } else {
                newNode.columnNext = current
                if (prev) {
                    prev.columnNext = newNode
                } else {
                    this.columnHeaders[column] = newNode
                }
            }
        }
    }

    /**
     * 取得一筆資料
     * @param {number} row 列
     * @param {number} column 行
     * @returns {*|null}
     */
    get(row, column) {
        if (row >= this.rows || column >= this.columns) {
            throw new Error("Index out of bounds")
        }
        let current = this.rowHeaders[row]
        while (current && current.column < column) {
            current = current.rowNext
        }
        if (current && current.column === column) {
            return current.data
        } else {
            return null
        }
    }

    /**
     * 刪除一筆資料
     * @param  {number} row 列
     * @param {number} column 行
     */
    delete(row, column) {
        if (row >= this.rows || column >= this.columns) {
            throw new Error("Index out of bounds")
        }
        let current = this.rowHeaders[row]
        let prev = null
        while (current && current.column < column) {
            prev = current
            current = current.rowNext
        }
        if (current && current.column === column) {
            if (prev) {
                prev.rowNext = current.rowNext
            } else {
                this.rowHeaders[row] = current.rowNext
            }
        }
        current = this.columnHeaders[column]
        prev = null
        while (current && current.row < row) {
            prev = current
            current = current.columnNext
        }
        if (current && current.row === row) {
            if (prev) {
                prev.columnNext = current.columnNext
            } else {
                this.columnHeaders[column] = current.columnNext
            }
        }
    }

    /**
     * 顯示資料
     */
    display() {
        for (let i = 0; i < this.rows; i++) {
            let rowStr = ""
            for (let j = 0; j < this.columns; j++) {
                rowStr += this.get(i, j) + " "
            }
            console.log(rowStr)
        }
    }
}

// 節點
class Node {
    constructor(row, column, data) {
        this.row = row
        this.column = column
        this.data = data
        this.rowNext = null
        this.columnNext = null
    }
}
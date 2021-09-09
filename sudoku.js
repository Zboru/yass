class Sudoku {
    constructor(board) {
        this.row = 0;
        this.column = 0;
        this.increment = 1;
        this.board = board;
        this.originalBoard = JSON.parse(JSON.stringify(board));
        this.solveSudoku()
    }

    solveSudoku() {
        let loop = 0;
        while (loop < 300) {
            this.backtrack()
            loop++
        }
        console.log(this.board.join('\n'))
    }

    editableCell(row, column) {
        return this.originalBoard[row][column] === 0
    }

    moveCursor(direction) {
        if (direction === 'forward') {
            if (this.column < 8) {
                this.column++;
            } else {
                this.column = 0;
                if (this.row < 8) {
                    this.row++
                }
            }
            while (!this.editableCell(this.row, this.column)) {
                if (this.column < 8) {
                    this.column++;
                } else {
                    this.column = 0;
                    if (this.row < 8) {
                        this.row++
                    }
                }
            }
        } else {
            if (this.column > 0) {
                this.column--;
            } else {
                this.column = 8;
                this.row--
            }
            while (!this.editableCell(this.row, this.column)) {
                if (this.column > 0) {
                    this.column--;
                } else {
                    this.column = 8;
                }
            }
        }
    }

    backtrack() {
        const cellIsEditable = this.editableCell(this.row, this.column)
        console.log(`Position x:${this.column} y:${this.row} editable state: ${cellIsEditable}`)

        if (cellIsEditable) {
            const previousValue = parseInt(this.board[this.row][this.column])
            const newValue = previousValue + this.increment
            console.log(`Incrementing cell to: ${newValue}`)

            const invalidRow = this.checkRow(this.row, newValue)
            const invalidColumn = this.checkCol(this.column, newValue)
            const invalidBox = this.checkBox(this.row, this.column, newValue);

            console.log(`\tDuplicates in row:     ${invalidRow}`)
            console.log(`\tDuplicates in column:  ${invalidColumn}`)
            console.log(`\tDuplicates in box:     ${invalidBox}`)

            const isUnsafe = invalidRow || invalidColumn || invalidBox

            if (isUnsafe) {
                if (newValue < 9) {
                    this.increment++;
                    console.log(`Value ${newValue} is unsafe`)
                } else {
                    this.moveCursor('backward')
                    this.board[this.row][this.column] = 0;
                    this.increment = 1;
                }
            } else {
                this.board[this.row][this.column] = newValue
                this.increment = 1;
                this.moveCursor('forward')
                console.log("Current value is safe, moving forward")
            }

        }

        // if (this.editableCell(this.row, this.column)) {
        //     if (this.board[this.row][this.column] < 9) {
        //         this.board[this.row][this.column]++
        //         console.log("\tIt is! Incrementing cell up to: " + this.board[this.row][this.column])
        //         const validRows = this.checkRow(this.board[this.row])
        //         console.log("\t\tChecking if current row is valid with new cell value: " + validRows)
        //         const validColumns = this.checkCol(this.column)
        //         const validBox = this.checkBox(this.row, this.column)
        //         console.log("\t\tChecking if current column is valid with new cell value: " + validColumns)
        //         if (validRows && validColumns) {
        //             this.moveCursor('forward')
        //             console.log(`\t\t\tMoving to new position -> x:${this.column} y:${this.row}`)
        //         }
        //     } else {
        //         console.log("It is but it has max value, decrement and moving back!")
        //         this.board[this.row][this.column] = 0;
        //         this.moveCursor('backward')
        //     }
        // } else {
        //     console.log(`Position ${this.row}/${this.column} is not editable, moving forward`)
        //     this.moveCursor('forward')
        // }
    }

    checkRow(rowIndex, number) {
        const rowFilledCells = this.board[rowIndex].filter(cell => cell !== 0);
        return rowFilledCells.includes(number)
    }

    checkCol(columnIndex, number) {
        const column = [];
        this.board.forEach((row) => {
            column.push(row[columnIndex])
        })
        const filledColumnCells = column.filter(cell => cell !== 0);
        return filledColumnCells.includes(number)
    }

    checkBox(row, col, number) {
        const startRow = row - (row % 3)
        const startCol = col - (col % 3)
        let boxFlag = false;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                boxFlag = this.board[startRow + r][startCol + c] === number;
                if (boxFlag) break;
            }
        }
        return boxFlag;
    }

}

new Sudoku([
    [0, 0, 6, 0, 1, 9, 4, 2, 7],
    [0, 2, 0, 7, 0, 0, 9, 0, 0],
    [0, 7, 0, 0, 5, 0, 0, 8, 3],
    [7, 0, 0, 0, 6, 0, 5, 9, 8],
    [0, 0, 8, 9, 0, 0, 0, 0, 0],
    [0, 9, 1, 0, 0, 5, 7, 0, 0],
    [0, 6, 0, 5, 0, 3, 8, 7, 1],
    [0, 0, 0, 0, 0, 0, 3, 0, 9],
    [4, 3, 7, 1, 0, 8, 0, 5, 0],
])

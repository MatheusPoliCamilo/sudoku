//Constante utilizada para a validação do Sudoku
const validator = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Procedimentos realizados quando o documento está totalmente carregado
$(document).ready(() => {

    let boardNumbers = generateBoardNumbers();
    generateBoard(boardNumbers);
    let sudoku = new Sudoku(boardNumbers);
    let validator = new Validator();
    validator.checkBoard(sudoku);

});

class Sudoku {

    constructor(boardNumbers) {

        this.rows = boardNumbers;
        this.columns = this.takeNumbersOfColumns();
        this.blocks = this.takeNumbersOfBlocks();

    }

    //Retorna um array com todas as linhas do Sudoku
    get rows() {

        let rows = [];

        this.row.forEach((row, key) => {

            rows[key] = row;

        });

        return rows;

    }

    //Gera os arrays apenas com as linhas do Sudoku
    set rows(boardNumbers) {

        this.row = [];

        boardNumbers.forEach((row, key) => {

            this.row[key] = row;

        });

    }

    get columns() {

        return [

            this.firstColumn,
            this.secondColumn,
            this.thirdColumn,
            this.fourthColumn,
            this.fifthColumn,
            this.sixthColumn,
            this.seventhColumn,
            this.eighthColumn,
            this.ninthColumn

        ]

    }

    set columns(numbersOfColumns) {

        this.firstColumn = numbersOfColumns[0];
        this.secondColumn = numbersOfColumns[1];
        this.thirdColumn = numbersOfColumns[2];
        this.fourthColumn = numbersOfColumns[3];
        this.fifthColumn = numbersOfColumns[4];
        this.sixthColumn = numbersOfColumns[5];
        this.seventhColumn = numbersOfColumns[6];
        this.eighthColumn = numbersOfColumns[7];
        this.ninthColumn = numbersOfColumns[8];

    }

    get blocks() {

        return [
            this.firstBlock,
            this.secondBlock,
            this.thirdBlock,
            this.fourthBlock,
            this.fifthBlock,
            this.sixthBlock,
            this.seventhBlock,
            this.eighthBlock,
            this.ninthBlock
        ]

    }

    //Cria arrays com os blocos do Sudoku baseado nas linhas da classe do Sudoku
    set blocks(numbersOfBlocks) {

        this.firstBlock = numbersOfBlocks.firstBlock;
        this.secondBlock = numbersOfBlocks.secondBlock;
        this.thirdBlock = numbersOfBlocks.thirdBlock;
        this.fourthBlock = numbersOfBlocks.fourthBlock;
        this.fifthBlock = numbersOfBlocks.fifthBlock;
        this.sixthBlock = numbersOfBlocks.sixthBlock;
        this.seventhBlock = numbersOfBlocks.seventhBlock;
        this.eighthBlock = numbersOfBlocks.eighthBlock;
        this.ninthBlock = numbersOfBlocks.ninthBlock;

    }

    takeNumbersOfColumns() {

        let columns = [[], [], [], [], [], [], [], [], []];

        this.rows.forEach((row) => {

            columns[0].push(row[0]);
            columns[1].push(row[1]);
            columns[2].push(row[2]);
            columns[3].push(row[3]);
            columns[4].push(row[4]);
            columns[5].push(row[5]);
            columns[6].push(row[6]);
            columns[7].push(row[7]);
            columns[8].push(row[8]);

        });

        return columns;

    }

    //Retorna um objeto com os números 3 pedaços do Sudoku, baseado nas linhas informadas, para dividí-los em blocos
    rowsIntoSudokuPieces(rowNumber) {

        return {
            firstPiece: this.rows[rowNumber].slice(0, 3),
            secondPiece: this.rows[rowNumber].slice(3, 6),
            thirdPiece: this.rows[rowNumber].slice(6, 9)
        }

    }

    //Retorna um objeto com os números de cada bloco do Sudoku
    takeNumbersOfBlocks() {

        let firstBlock = [],
            secondBlock = [],
            thirdBlock = [],
            fourthBlock = [],
            fifthBlock = [],
            sixthBlock = [],
            seventhBlock = [],
            eighthBlock = [],
            ninthBlock = [];

        for (let i = 0; i < 9; i++) {


            if (i < 3) {

                firstBlock.push(this.rowsIntoSudokuPieces(i).firstPiece);
                secondBlock.push(this.rowsIntoSudokuPieces(i).secondPiece);
                thirdBlock.push(this.rowsIntoSudokuPieces(i).thirdPiece);
            }

            else if (i < 6) {

                fourthBlock.push(this.rowsIntoSudokuPieces(i).firstPiece);
                fifthBlock.push(this.rowsIntoSudokuPieces(i).secondPiece);
                sixthBlock.push(this.rowsIntoSudokuPieces(i).thirdPiece);

            }

            else {

                seventhBlock.push(this.rowsIntoSudokuPieces(i).firstPiece);
                eighthBlock.push(this.rowsIntoSudokuPieces(i).secondPiece);
                ninthBlock.push(this.rowsIntoSudokuPieces(i).thirdPiece);

            }

        }

        // firstBlock = firstBlock.reduce((accumulator, currentValue) => {
        //         return accumulator.concat(currentValue);
        //     },
        //     []
        // );

        return {
            firstBlock: firstBlock,
            secondBlock: secondBlock,
            thirdBlock: thirdBlock,
            fourthBlock: fourthBlock,
            fifthBlock: fifthBlock,
            sixthBlock: sixthBlock,
            seventhBlock: seventhBlock,
            eighthBlock: eighthBlock,
            ninthBlock: ninthBlock
        }

    }


}

class Validator {

    checkBoard(sudoku) {

        this.checkRows(sudoku.rows);
        this.checkColumns(sudoku.columns);

    }

    checkRows(rows) {

        rows.forEach((row, key) => {

            //Linha sem células vazias
            let rowWithoutEmptyCell = _.without(row, 0);
            //Linha sem células repetidas e sem 0
            let uniqRow = _.without(_.uniq(row), 0);

            if (rowWithoutEmptyCell.length !== uniqRow.length) {

                let values = [];

                row.forEach((rowNumber) => {

                    let wrongNumber = _.find(values, (numberInRowChecker) => {

                        return rowNumber === numberInRowChecker;

                    });

                    if (wrongNumber !== 0 && wrongNumber !== undefined) {

                        //Pega o index do primeiro número incorreto da linha
                        let indexWrong = _.findIndex(row, (rowNumber) => {

                            return rowNumber === wrongNumber;

                        });

                        //Pega o index último número incorreto da linha
                        let secondIndexWrong = _.findLastIndex(row, (rowNumber) => {

                            return rowNumber === wrongNumber;

                        });

                        $($($('tr')[key]).children()[indexWrong]).addClass('error');
                        $($($('tr')[key]).children()[secondIndexWrong]).addClass('error');

                    }

                    values.push(rowNumber);

                });

            }

        });

    }

}

//Gera um array multidimensional com os valores de cada célula do Sudoku
function generateBoardNumbers() {

    return [
        [5, 1, 0, 0, 3, 9, 0, 1, 0],
        [6, 1, 0, 0, 0, 0, 0, 2, 0],
        [8, 4, 0, 0, 1, 0, 3, 0, 0],
        [0, 0, 4, 0, 0, 0, 1, 6, 7],
        [0, 0, 5, 4, 6, 0, 0, 0, 0],
        [7, 6, 2, 1, 0, 8, 0, 0, 0],
        [0, 0, 0, 0, 7, 2, 0, 3, 0],
        [0, 0, 0, 0, 0, 3, 9, 8, 6],
        [3, 5, 6, 9, 0, 0, 0, 0, 0]
    ];

}

//Completa o tabuleiro do Sudoku baseado no array multidimensional informado
function generateBoard(boardNumbers) {

    boardNumbers.forEach((arrayRow, rowNumber) => {

        let boardRow = jQueryElementRow(rowNumber);

        writeOnRow(boardRow, arrayRow);

    });

}

//Retorna o elemento jQuery da linha especificada do tabuleiro
function jQueryElementRow(rowNumber) {

    return $($('tr')[rowNumber]);

}

//Escreve na linha do tabuleiro especificada os números informados
function writeOnRow(boardRow, arrayRow) {

    boardRow.find('td').each((cellNumber, boardCell) => {

        //Armazena o número para escrever na célula do tabuleiro em uma variável de escopo
        let numberToWrite = arrayRow[cellNumber];

        if (numberToWrite === 0) {

            //Não escreve na célula do tabuleiro caso o valor do array multidimensional seja 0, prosseguindo com o loop
            return;

        }

        writeOnCell(boardCell, numberToWrite);

    });

}

//Escreve na célula do tabuleiro especificada o número informado
function writeOnCell(boardCell, numberToWrite) {

    $(boardCell).html(numberToWrite);

}
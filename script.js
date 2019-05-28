//Constante utilizada para a validação do Sudoku
const validator = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Procedimentos realizados quando o documento está totalmente carregado
document.addEventListener("DOMContentLoaded", () => {

    let boardNumbers = generateBoardNumbers();
    generateBoard(boardNumbers);
    let sudoku = new Sudoku(boardNumbers);
    let validator = new Validator();
    validator.checkBoard(sudoku);

    //Recarrega a página ao clicar no botão de "recarregar", resetando o tabuleiro
    document.querySelector('#btn-reload').addEventListener('click', () => {

        location.reload();

    });

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
        this.checkBlocks(sudoku.blocks);

    }

    checkRows(rows) {

        rows.forEach((row, key) => {

            //Linha sem células vazias
            let rowWithoutEmptyCell = _.without(row, 0);
            //Linha sem células repetidas ou vazias
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

    checkColumns(columns) {

        columns.forEach((column, key) => {

            //Coluna sem células vazias
            let columnWithoutEmptyCell = _.without(column, 0);
            //Coluna sem células repetidas ou vazias
            let uniqColumn = _.without(_.uniq(column), 0);

            if (columnWithoutEmptyCell.length !== uniqColumn.length) {

                let values = [];

                column.forEach((columnNumber) => {

                    let wrongNumber = _.find(values, (numberInColumnChecker) => {

                        return columnNumber === numberInColumnChecker;

                    });

                    if (wrongNumber !== 0 && wrongNumber !== undefined) {

                        //Pega o index do primeiro número incorreto da coluna
                        let indexWrong = _.findIndex(column, (columnNumber) => {

                            return columnNumber === wrongNumber;

                        });

                        //Pega o index último número incorreto da linha
                        let secondIndexWrong = _.findLastIndex(column, (columnNumber) => {

                            return columnNumber === wrongNumber;

                        });

                        $($(`table tr > td:nth-child(${key + 1})`)[indexWrong]).addClass('error');
                        $($(`table tr > td:nth-child(${key + 1})`)[secondIndexWrong]).addClass('error');

                    }

                    values.push(columnNumber);

                });

            }

        });

    }

    checkBlocks(blocks) {

        blocks.forEach((block, key) => {

            //Bloco em um único array
            let blockArray = _.flatten(block);

            //Bloco sem células vazias
            let blockWithoutEmptyCell = _.without(blockArray, 0);

            //Bloco sem células vazias ou repetidas
            let uniqBlock = _.without(_.uniq(blockArray), 0);

            if (blockWithoutEmptyCell.length !== uniqBlock.length) {

                let values = [];

                blockArray.forEach((number) => {

                    let wrongNumber = _.find(values, (numberBlock) => {

                        return number === numberBlock;

                    });

                    if (wrongNumber !== 0 && wrongNumber !== undefined) {

                        let indexWrong = _.findIndex(blockArray, (number) => {

                            return number === wrongNumber;

                        });

                        let secondIndexWrong = _.findLastIndex(blockArray, (number) => {

                            return number === wrongNumber;

                        });

                        for (let i = 0; i < 8; i++) {

                            if (key === i) {

                                $($(`.bloco${i}`)[indexWrong]).addClass('error');
                                $($(`.bloco${i}`)[secondIndexWrong]).addClass('error');

                            }

                        }

                    }

                    values.push(number);

                });

            }

        });

    }

}

//Retorna um array com 9 números aleatórios entre 0 e 9
function getRandomArray() {

    return [
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
    ];

}

//Gera um número aleatório com probabilidade, qualquer número que não esteja entre 1 e 9 se torna 0
function getRandomNumber() {

    if (Math.floor((Math.random() * 35)) > 9) {

        return 0;

    }

    return Math.floor((Math.random() * 9));

}

//Gera manualmente um array multidimensional com os valores aleatórios entre 0 e 9 para cada célula do Sudoku
//Valor 0 significa célula vazia no tabuleiro e ele possui probabilidade aumentada
function generateBoardNumbers() {

    return [
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray(),
        [] = getRandomArray()
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
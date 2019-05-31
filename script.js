//Constante utilizada para a validação do Sudoku
const validator = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Procedimentos realizados quando o documento está totalmente carregado
document.addEventListener("DOMContentLoaded", () => {

    let boardNumbers = generateBoardNumbers();
    generateBoard(boardNumbers);
    let sudoku = new Sudoku(boardNumbers);
    let validator = new Validator();
    Validator.checkBoard(sudoku);

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

    //Retorna um array com todas as colunas do Sudoku
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

    //Gera separadamente arrays referentes a cada coluna do Sudoku
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

    //Retorna um array com todos os blocos do Sudoku
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

    //Baseado nas linhas do Sudoku, gera um array multidimensional com as colunas
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
            firstBlock: firstBlock.flat(),
            secondBlock: secondBlock.flat(),
            thirdBlock: thirdBlock.flat(),
            fourthBlock: fourthBlock.flat(),
            fifthBlock: fifthBlock.flat(),
            sixthBlock: sixthBlock.flat(),
            seventhBlock: seventhBlock.flat(),
            eighthBlock: eighthBlock.flat(),
            ninthBlock: ninthBlock.flat()
        }

    }


}

class Validator {

    static checkBoard(sudoku) {

        verifyAndPaintWrongCells(sudoku.rows, 'row');
        verifyAndPaintWrongCells(sudoku.columns, 'column');
        verifyAndPaintWrongCells(sudoku.blocks, 'block');

    }

}

//Verifica quais células do tabuleiro estão com números incorretos e marca elas
function verifyAndPaintWrongCells(arrays, sudokuElement) {

    arrays.forEach((array, key) => {

        if (hasRepeatedNumbers(array)) {

            let values = [];

            array.forEach((number) => {

                let wrongNumber = _.find(values, (arrayNumber) => {

                    return number === arrayNumber;

                });

                if (wrongNumber !== 0 && wrongNumber !== undefined) {

                    let indexWrong = _.findIndex(array, (number) => {

                        return number === wrongNumber;

                    });

                    let secondIndexWrong = _.findLastIndex(array, (number) => {

                        return number === wrongNumber;

                    });

                    switch (sudokuElement) {

                        case 'block':

                            for (let i = 0; i < 8; i++) {

                                if (key === i) {

                                    document.querySelectorAll(`.bloco${i}`)[indexWrong].classList.add('error');
                                    document.querySelectorAll(`.bloco${i}`)[secondIndexWrong].classList.add('error');

                                }

                            }

                            break;

                        case 'column':

                            $($(`table tr > td:nth-child(${key + 1})`)[indexWrong]).addClass('error');
                            $($(`table tr > td:nth-child(${key + 1})`)[secondIndexWrong]).addClass('error');

                            break;

                        case 'row':

                            $($($('tr')[key]).children()[indexWrong]).addClass('error');
                            $($($('tr')[key]).children()[secondIndexWrong]).addClass('error');

                            break;

                        default:

                            break;

                    }

                }

                values.push(number);

            });

        }

    });

}

//Verifica se há números repetidos no array informado
function hasRepeatedNumbers(array) {

    let rowWithoutEmptyCell = _.without(array, 0);
    let uniqRow = _.without(_.uniq(array), 0);

    return rowWithoutEmptyCell.length !== uniqRow.length;

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
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray(),
        getRandomArray()
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
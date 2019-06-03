//Procedimentos realizados quando o documento está totalmente carregado
document.addEventListener("DOMContentLoaded", () => {

    let boardNumbers = generateBoardNumbers();
    generateBoard(boardNumbers);
    let sudoku = new Sudoku(boardNumbers);
    Validator.checkBoard(sudoku);

    //Recarrega a página ao clicar no botão de "recarregar", resetando o tabuleiro
    document.querySelector('#btn-reset').addEventListener('click', () => {

        location.reload();

    });

    //Ao clicar em uma célula digitável, marca ela como selecionada
    document.querySelectorAll('.cell').forEach((cell) => {

        cell.addEventListener('click', () => {

            document.querySelectorAll('.cell').forEach((cell) => {

                cell.classList.remove('selected');

            });

            cell.classList.add('selected');

        });

    });

    //Ao clicar em um dos números de 1 a 9 abaixo do tabuleiro, coloca o valor clicado na célula do sudoku que
    //está selecionada
    document.querySelectorAll('.numbers > div').forEach(function (div) {

        div.addEventListener('click', () => {

            if (document.querySelector('.selected')) {

                document.querySelector('.selected').innerHTML = div.innerHTML;

                let row = document.querySelector('.selected').getAttribute('rowKey');
                let cell = document.querySelector('.selected').getAttribute('cellKey');
                boardNumbers[row][cell] = ~~div.innerHTML;

                document.querySelectorAll('td').forEach(function (cell) {

                    if (cell.classList.contains('error')) {

                        cell.classList.remove('error');

                    }

                });

                sudoku = new Sudoku(boardNumbers);
                Validator.checkBoard(sudoku);

            }

        });

    });

    //Ao clicar no apagador abaixo do tabuleiro, limpa a célula do sudoku que está selecionada
    document.querySelector('#btn-delete').addEventListener('click', () => {

        if (document.querySelector('.selected')) {

            document.querySelector('.selected').innerHTML = '';

            let row = document.querySelector('.selected').getAttribute('rowKey');
            let cell = document.querySelector('.selected').getAttribute('cellKey');
            boardNumbers[row][cell] = 0;

            document.querySelectorAll('td').forEach(function (cell) {

                if (cell.classList.contains('error')) {

                    cell.classList.remove('error');

                }

            });

            sudoku = new Sudoku(boardNumbers);
            Validator.checkBoard(sudoku);

        }

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

        verifyWrongCells(sudoku.rows, 'row');
        verifyWrongCells(sudoku.columns, 'column');
        verifyWrongCells(sudoku.blocks, 'block');

    }

}

//Verifica quais células do tabuleiro estão com números incorretos e marca elas
function verifyWrongCells(arrays, sudokuElement) {

    arrays.forEach((array, key) => {

        if (hasRepeatedNumbers(array)) {

            let values = [];
            let wrongIndexes = [];

            array.forEach((number) => {

                let wrongNumber = _.find(values, (arrayNumber) => {

                    return number === arrayNumber;

                });

                if (wrongNumber !== 0 && wrongNumber !== undefined) {

                    array.forEach(function (number, key) {

                        if (number === wrongNumber) {

                            wrongIndexes.push(key);

                        }

                    });

                    let indexWrong = _.findIndex(array, (number) => {

                        return number === wrongNumber;

                    });

                    let secondIndexWrong = _.findLastIndex(array, (number) => {

                        return number === wrongNumber;

                    });

                    switch (sudokuElement) {

                        case 'block':

                            for (let i = 0; i < 9; i++) {

                                if (key === i) {

                                    paintCells(i, indexWrong, secondIndexWrong, sudokuElement);

                                }

                            }

                            break;

                        case 'column':

                            paintCells(key, indexWrong, secondIndexWrong, sudokuElement);

                            break;

                        case 'row':

                            paintCells(key, indexWrong, secondIndexWrong, sudokuElement);

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

//Altera a cor das células informadas, do elemento (linha, coluna ou bloco) informado
function paintCells(element, firstIndex, secondIndex, elementCase) {

    switch (elementCase) {

        case 'row':

            document.querySelectorAll('tr')[element].children[firstIndex].classList.add('error');
            document.querySelectorAll('tr')[element].children[secondIndex].classList.add('error');

            break;

        case 'column':

            document.querySelectorAll(`table tr > td:nth-child(${element + 1})`)[firstIndex].classList.add('error');
            document.querySelectorAll(`table tr > td:nth-child(${element + 1})`)[secondIndex].classList.add('error');

            break;

        case 'block':

            document.querySelectorAll(`.block${element}`)[firstIndex].classList.add('error');
            document.querySelectorAll(`.block${element}`)[secondIndex].classList.add('error');

            break;

        default:

            break;

    }

}

//Verifica se há números repetidos no array informado
function hasRepeatedNumbers(array) {

    let rowWithoutEmptyCell = _.without(array, 0);
    let uniqRow = _.without(_.uniq(array), 0);

    return rowWithoutEmptyCell.length !== uniqRow.length;

}

//Gera manualmente um array multidimensional com os valores aleatórios entre 0 e 9 para cada célula do Sudoku
//Valor 0 significa célula vazia no tabuleiro
function generateBoardNumbers() {

    return [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9],
    ];

}

//Completa o tabuleiro do Sudoku baseado no array multidimensional informado
function generateBoard(boardNumbers) {

    boardNumbers.forEach((row, rowKey) => {

        document.querySelectorAll('tr')[rowKey].querySelectorAll('td').forEach(function (cell, cellKey) {

            cell.setAttribute('rowKey', rowKey);
            cell.setAttribute('cellKey', cellKey);

            if (row[cellKey] !== 0) {

                cell.innerHTML = row[cellKey];
                cell.classList.add('blocked');

            } else {

                cell.classList.add('cell');

            }

        });

    });

}

//Constante utilizada para a validação do Sudoku
const validator = [1, 2, 3, 4, 5, 6, 7, 8 ,9];

class Sudoku {

    constructor(boardNumbers) {

        this.setRows(boardNumbers);
        this.setColumns(boardNumbers);

    }

    //Gera os arrays apenas com as linhas do Sudoku
    setRows(boardNumbers) {

        this.firstRow = boardNumbers[0];
        this.secondRow = boardNumbers[1];
        this.thirdRow = boardNumbers[2];
        this.fourthRow = boardNumbers[3];
        this.fifthRow = boardNumbers[4];
        this.sixthRow = boardNumbers[5];
        this.seventhRow = boardNumbers[6];
        this.eighthRow = boardNumbers[7];
        this.ninthRow = boardNumbers[8];

    }

    //Gera os arrays apenas com as colunas do Sudoku
    setColumns(boardNumbers) {

        this.firstColumn = boardNumbers[0][0];
        this.secondColumn = boardNumbers[1][0];
        this.thirdColumn = boardNumbers[2][0];
        this.fourthColumn = boardNumbers[3][0];
        this.fifthColumn = boardNumbers[4][0];
        this.sixthColumn = boardNumbers[5][0];
        this.seventhColumn = boardNumbers[6][0];
        this.eighthColumn = boardNumbers[7][0];
        this.ninthColumn = boardNumbers[8][0];

    }

}

//Gera um array multidimensional com os valores de cada célula do Sudoku
function generateBoardNumbers() {

    return [
        [5,0,0,0,3,9,0,1,0],
        [6,1,0,0,0,0,0,2,0],
        [8,4,0,0,1,0,3,0,0],
        [0,0,4,0,0,0,1,6,7],
        [0,0,5,4,6,0,0,0,0],
        [7,6,2,1,0,8,0,0,0],
        [0,0,0,0,7,2,0,3,0],
        [0,0,0,0,0,3,9,8,6],
        [3,5,6,9,0,0,0,0,0]
    ];

}

//Completa o tabuleiro do Sudoku baseado no array multidimensional de números feito pela função generateBoardNumbers()
function generateBoard(boardNumbers) {

    boardNumbers.forEach(function (arrayRow, rowNumber) {

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

    boardRow.find('td').each(function (cellNumber, boardCell) {

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
//Constante utilizada para a validação do Sudoku
const validator = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Procedimentos realizados quando o documento está totalmente carregado
$(document).ready(() => {

    var boardNumbers = generateBoardNumbers();
    generateBoard(boardNumbers);
    var sudoku = new Sudoku(boardNumbers);

});

class Sudoku {

    constructor(boardNumbers) {

        this.rows = boardNumbers;
        this.setColumns();
        //Cria arrays com os blocos do Sudoku baseado nas linhas informadas
        this.setBlocks();

    }

    //Gera os arrays apenas com as linhas do Sudoku
    set rows(boardNumbers) {

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

    setColumns(boardNumbers) {



    }

    //Cria arrays com os blocos do Sudoku baseado nas linhas da classe do Sudoku
    setBlocks() {

        this.firstBlock = takeNumbersOfBlocks(this.rows).firstBlock;
        this.secondBlock = takeNumbersOfBlocks(this.rows).secondBlock;
        this.thirdBlock = takeNumbersOfBlocks(this.rows).thirdBlock;
        this.fourthBlock = takeNumbersOfBlocks(this.rows).fourthBlock;
        this.fifthBlock = takeNumbersOfBlocks(this.rows).fifthBlock;
        this.sixthBlock = takeNumbersOfBlocks(this.rows).sixthBlock;
        this.seventhBlock = takeNumbersOfBlocks(this.rows).seventhBlock;
        this.eighthBlock = takeNumbersOfBlocks(this.rows).eighthBlock;
        this.ninthBlock = takeNumbersOfBlocks(this.rows).ninthBlock;

    }

    get rows() {

        return [
            this.firstRow,
            this.secondRow,
            this.thirdRow,
            this.fourthRow,
            this.fifthRow,
            this.sixthRow,
            this.seventhRow,
            this.eighthRow,
            this.ninthRow
        ]

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

}

//Retorna um objeto com os números de cada bloco do Sudoku
function takeNumbersOfBlocks(rows) {

    let firstBlock = [];
    let secondBlock = [];
    let thirdBlock = [];
    let fourthBlock = [];
    let fifthBlock = [];
    let sixthBlock = [];
    let seventhBlock = [];
    let eighthBlock = [];
    let ninthBlock = [];

    for (let i = 0; i < 9; i++) {

        if (i < 3) {

            firstBlock.push(rowsIntoSudokuPieces(rows[i]).firstPiece);
            secondBlock.push(rowsIntoSudokuPieces(rows[i]).secondPiece);
            thirdBlock.push(rowsIntoSudokuPieces(rows[i]).thirdPiece);

        } else if (i < 6) {

            fourthBlock.push(rowsIntoSudokuPieces(rows[i]).firstPiece);
            fifthBlock.push(rowsIntoSudokuPieces(rows[i]).secondPiece);
            sixthBlock.push(rowsIntoSudokuPieces(rows[i]).thirdPiece);

        } else {

            seventhBlock.push(rowsIntoSudokuPieces(rows[i]).firstPiece);
            eighthBlock.push(rowsIntoSudokuPieces(rows[i]).secondPiece);
            ninthBlock.push(rowsIntoSudokuPieces(rows[i]).thirdPiece);

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


//Retorna um objeto com os 3 pedaços do Sudoku, baseado nas linhas informadas
function rowsIntoSudokuPieces(row) {

    return {
        firstPiece: row.slice(0, 3),
        secondPiece: row.slice(3, 6),
        thirdPiece: row.slice(6, 9)
    }

}

//Gera um array multidimensional com os valores de cada célula do Sudoku
function generateBoardNumbers() {

    return [
        [5, 0, 0, 0, 3, 9, 0, 1, 0],
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
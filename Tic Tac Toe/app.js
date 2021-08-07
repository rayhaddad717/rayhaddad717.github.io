let turnCount = 0;
let gameBox = [[null, null, null], [null, null, null], [null, null, null]];
function cellClicked(cell) {
    console.log("This cell was clicked");

    let cellRow = cell.id.toString().slice(0, 1);
    let cellCol = cell.id.toString().slice(1);
    console.log(cellRow + ' ' + cellCol);
    if (gameBox[cellRow - 1][cellCol - 1] != null) {

        alert("Already taken!");
        return;
    }
    else {
        gameBox[cellRow - 1][cellCol - 1] = "taken";
        turnCount++;
    }
    console.log(cell.id + "was clicked");
    let cellSelected = document.getElementById("turn");
    if (turnCount % 2 === 0) {
        cell.innerText = "O";
        cellSelected.innerText = "X's turn";

    }
    else {
        cell.innerText = "X";
        cellSelected.innerText = "O's turn";

    }
    checkWin();
}
function newGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBox[i][j] = null;
        }
    }
    let answerName = "";
    let answerSelected;
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            answerName = `${i}${j}`;
            answerSelected = document.getElementById(answerName);
            answerSelected.innerText = "";


        }
    }
}
function checkWin() {
    let firstPathStart = document.getElementById("11");
    let secondPathStart = document.getElementById("33");
    let firstPathChoice = firstPathStart.innerText;
    let secondPathChoice = secondPathStart.innerText;
    let thirdPathStart = document.getElementById("21");
    let thirdPathChoice = thirdPathStart.innerText;
    let fourthPathStart = document.getElementById("12");
    let fourthPathChoice = fourthPathStart.innerText;
    let fifthPathStart = document.getElementById("13");
    let fifthPathChoice = fifthPathStart.innerText;
    let won = false;
    if (gameBox[0][0] !== null) {

        if (document.getElementById("21").innerText === firstPathChoice && document.getElementById("31").innerText === firstPathChoice) {
            alert(firstPathChoice + " Won!");
            won = true;
        }
        else if (document.getElementById("12").innerText === firstPathChoice && document.getElementById("13").innerText === firstPathChoice) {
            alert(firstPathChoice + " Won!");
            won = true;


        }
        else if (document.getElementById("22").innerText === firstPathChoice && document.getElementById("33").innerText === firstPathChoice) {
            alert(firstPathChoice + " Won!");
            won = true;


        }

    }
    if (gameBox[2][2] !== null) {

        if (document.getElementById("32").innerText === secondPathChoice && document.getElementById("31").innerText === secondPathChoice) {
            alert(secondPathChoice + " Won!");
            won = true;


        }
        else if (document.getElementById("13").innerText === secondPathChoice && document.getElementById("23").innerText === secondPathChoice) {
            alert(secondPathChoice + " Won!");
            won = true;


        }
    }
    if (gameBox[1][0] !== null) {

        if (document.getElementById("22").innerText === thirdPathChoice && document.getElementById("23").innerText === thirdPathChoice) {
            alert(thirdPathChoice + " Won!");
            won = true;


        }
    }
    if (gameBox[0][1] !== null) {

        if (document.getElementById("22").innerText === fourthPathChoice && document.getElementById("32").innerText === fourthPathChoice) {
            alert(fourthPathChoice + " Won!");
            won = true;
        }
    }
    if (gameBox[0][2] !== null) {

        if (document.getElementById("22").innerText === fifthPathChoice && document.getElementById("31").innerText === fifthPathChoice) {
            alert(fifthPathChoice + " Won!");
            won = true;
        }
    }

    if (!won) {
        return;
    }

}





















// console.log("Hello from our first file");

// for (let age = 0; age < 5; age++) {

//     switch (age) {
//         case 1:
//             console.log("You are 1 years old!");
//             break;
//         case 2:
//             console.log("You are 2 years old!");
//             break;

//         case 4:
//             console.log("You are 4 years old!");
//             break;
//         default:
//             console.log("Default");
//             break;

//     }
// }

// let value = prompt("Enter a value");
// if (value === "hi") {
//     console.log("Hello");
// }
// else if (value == "2") {
//     console.log("2 ok");
// }
// else {
//     console.log("bye");
// }
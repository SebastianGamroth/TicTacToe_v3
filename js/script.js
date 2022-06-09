let fields = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]]
];

let playerO = 'o';
let playerX = 'x';
let round = true;
let index;

let audioField = new Audio('./audio/clickField.mp3');
let audioSuccess = new Audio('./audio/success.mp3');

function choiseField(x, y) {
    if (fields[x][y][1] == playerO || fields[x][y][1] == playerX) {
    }
    else {
        if (round) { index = playerO; }
        else { index = playerX; };

        fields[x][y][1] = index;
        round = !round;

        document.getElementById('field_' + x + y).src = `./img/field_${index}.svg`;
    }
    checkOccupiedFields();
}

function checkOccupiedFields() {
    if (checkWinner() == playerO || checkWinner() == playerX) {
        document.getElementById('winner').innerHTML = ` Der Gewinner ist Player ${checkWinner()}`;
    }
    else{
        audioField.play();
    }
}

function checkWinner() {
    if (fields[0][0][1] == fields[1][1][1] && fields[1][1][1] == fields[2][2][1]) {
        drawWinnerLine('00', '11', '22');
        return fields[0][0][1];
    }
    if (fields[0][2][1] == fields[1][1][1] && fields[1][1][1] == fields[2][0][1]) {
        drawWinnerLine('02', '11', '20');
        return fields[0][2][1];
    }
    for (let i = 0; i < fields.length; i++) {
        if (fields[i][0][1] == fields[i][1][1] && fields[i][1][1] == fields[i][2][1]) {
            drawWinnerLine(i + '0', i + '1', i + '2');
            return fields[i][0][1];
        }

        if (fields[0][i][1] !== i && fields[2][i][1] !== i) {
            let y = i;
            if (fields[0][i][1] == fields[1][i][1] && fields[1][i][1] == fields[2][i][1]) {
                drawWinnerLine('0' + y, '1' + y, '2' + y);
                return fields[1][i][1];
            }
        }
    }
}

function drawWinnerLine(a, b, c) {
    document.getElementById('field_' + a).classList.add('winnerColor');
    document.getElementById('field_' + b).classList.add('winnerColor');
    document.getElementById('field_' + c).classList.add('winnerColor');

    audioSuccess.play();
    document.getElementById('playAgain').classList.remove('d-none');
}

function playAgain() {
    document.getElementById('playAgain').classList.add('d-none');
}

// law ------------------------------------------------------------

function imprint() {
    regulationShow('imprint');
    toggleRegulations('privacy', 'copyright');
}

function privacy() {
    regulationShow('privacy');
    toggleRegulations('imprint', 'copyright');
}

function copyright() {
    regulationShow('copyright');
    toggleRegulations('imprint', 'privacy');
}

function regulationShow(index) {
    document.getElementById(index).classList.remove('d-none');
    document.getElementById('logoBack').classList.remove('d-none');
}

function toggleRegulations(first, second, third) {
    document.getElementById(first).classList.add('d-none');
    document.getElementById(second).classList.add('d-none');
    if (third == 'copyright') { document.getElementById(third).classList.add('d-none'); }
}
async function enviar() {
    var squareNumberInput = document.getElementById('square-number');
    var squareNumber = parseInt(squareNumberInput.value);
    document.getElementById('random-number').innerText = '';

    if (isNaN(squareNumber) || squareNumber < 1 || squareNumber > 3) {
        alert("Escolha o quadrado em que deseja apostar (1, 2 ou 3)");
        return;
    }

    document.getElementById('result').innerText = '';
    var raceTrackWidth = document.querySelector('.race-track').offsetWidth;
    var speeds = [10, 12, 15, 19, 20];
    var promises = [];

    for (var i = 1; i <= 3; i++) {
        var selectedContainer = document.getElementById('carrot-' + i);
        var position = 0;
        var randomIndex = Math.floor(Math.random() * speeds.length);
        var speed = speeds[randomIndex];
        speeds.splice(randomIndex, 1);

        promises.push(moveSquare(selectedContainer, i, speed, raceTrackWidth, squareNumber));
    }

    var winner = await Promise.race(promises);
    if (winner === squareNumber) {
        checkWinner(winner);
    } else {
        document.getElementById('result').innerText = "Que pena! Você apostou no quadrado número " + squareNumber + ", mas o vencedor foi o quadrado " + winner + ".";
    }
}

function moveSquare(selectedContainer, squareId, speed, raceTrackWidth, squareNumber) {
    return new Promise(resolve => {
        var position = 0;
        var animationId = setInterval(function() {
            position += speed;
            selectedContainer.style.transform = 'translateX(' + position + 'px)';

            if (position >= raceTrackWidth - 70) {
                clearInterval(animationId);
                resolve(squareId);
            }
        }, 100);
    });
}

function checkWinner(winner) {
    var resultElement = document.getElementById('result');
    resultElement.innerText = "Parabéns! O quadrado " + winner + " venceu!";
}

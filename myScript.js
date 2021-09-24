// buttons is a node list. It looks and acts much like an array.
const selections = document.querySelectorAll('button.selection');

// we use the .forEach method to iterate through each button
selections.forEach((button) => {

  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    playRound(computerPlay(),button.id);
  });

});

const reset = document.querySelector('button.reset');

const resultDisplay = document.querySelector('div#results-container');
resultDisplay.innerText = ` Current stats: \n
    You have won 0 games. \n
    Computer has won 0 games.`;

reset.addEventListener('click', () => {
    playerWins = computerWins = 0;
    resultDisplay.innerText = ` Current stats: \n
    You have won ${playerWins} games. \n
    Computer has won ${computerWins} games.`;
})



function computerPlay() {
    let number = Math.floor(Math.random() * 3);
    let computerMove;
    switch (number) {
        case 0:
            computerMove = "rock";
            break;
        case 1:
            computerMove = "paper";
            break;
        case 2:
            computerMove = "scissors";
            break;
    }

    return computerMove;
}

function determineRoundWinner(computerSelection, playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    playerWin = 1;
    computerWin = 2;
    draw = 3;
    error = 4;
    if (playerSelection === computerSelection) {
        return [draw,`This round was a draw. You both picked ${ playerSelection}`];
    }

    else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            return [playerWin,`You won gg ${ playerSelection } beats ${ computerSelection }.`];
        }
        else if (computerSelection === 'scissors') {
            return [computerWin,`You lost lmao you suck ${ playerSelection } loses to ${ computerSelection }`];
        }
    }

    else if (playerSelection === 'rock') {
        if (computerSelection === 'scissors') {
            return [playerWin,`You won gg ${ playerSelection } beats ${ computerSelection }.`];
        }
        else if (computerSelection === 'paper') {
            return [computerWin,`You lost lmao you suck ${ playerSelection } loses to ${ computerSelection }`];
        }
    }

    else if (playerSelection === 'scissors') {
        if (computerSelection === 'paper') {
            return [playerWin,`You won gg ${ playerSelection } beats ${ computerSelection }.`];
        }
        else if (computerSelection === 'rock') {
            return [computerWin,`You lost lmao you suck ${ playerSelection } loses to ${ computerSelection }`];
        }
    }
    else {
        return [error,'Invalid Input. Please try again.']
    }


}

function playRound(computerMove, playerMove) {
    newestResult = determineRoundWinner(computerMove,playerMove);
    printStats(newestResult);
}

playerWins = computerWins = 0;
function printStats(newestResult) {
    currentWinnerMessage = newestResult[1];
    const resultDisplay = document.querySelector('div#results-container');
    if ((newestResult[0] === 4) || (newestResult[0] === 3)) {
        resultDisplay.innerHTML = currentWinnerMessage + ` Current stats: \n
        You have won ${playerWins} games. \n
        Computer has won ${computerWins} games.`;
    }

    currentWinner = newestResult[0];
    switch (currentWinner) {
        case 1:
            playerWins += 1;
            break;
        case 2:
            computerWins += 1;
            break;
        case 3:
            break;
    }

    let winningMessage = currentWinnerMessage + ` Current stats: \n
    You have won ${playerWins} games. \n
    Computer has won ${computerWins} games.`;

    if (Math.max(playerWins,computerWins) === 5) {
        winner = playerWins > computerWins ? " \nYou won the series!" : " You lost the series.";
        winningMessage += winner;
        winningMessage += `Press "Reset" to start over, or continue playing!`
    }

    resultDisplay.innerText = winningMessage;
}

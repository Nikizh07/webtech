document.addEventListener('DOMContentLoaded', () => {
    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 5;
    let isGameOver = false;

    const choices = document.querySelectorAll('.choice-btn');
    const playerText = document.getElementById('playerScore');
    const computerText = document.getElementById('computerScore');
    const roundResultText = document.getElementById('roundResult');
    const matchResultText = document.getElementById('matchResult');
    const resetBtn = document.getElementById('resetBtn');

    choices.forEach(button => {
        button.addEventListener('click', (e) => {
            if (isGameOver) return;
            
            const playerSelection = e.target.getAttribute('data-choice');
            const computerSelection = getComputerChoice();
            playRound(playerSelection, computerSelection);
        });
    });

    resetBtn.addEventListener('click', resetGame);

    function getComputerChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    function playRound(player, computer) {
        if (player === computer) {
            roundResultText.textContent = `It's a tie! Both chose ${capitalize(player)}.`;
            return;
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        if (winConditions[player] === computer) {
            playerScore++;
            playerText.textContent = playerScore;
            roundResultText.textContent = `You win! ${capitalize(player)} beats ${capitalize(computer)}.`;
        } else {
            computerScore++;
            computerText.textContent = computerScore;
            roundResultText.textContent = `You lose! ${capitalize(computer)} beats ${capitalize(player)}.`;
        }

        checkWinner();
    }

    function checkWinner() {
        if (playerScore >= winningScore || computerScore >= winningScore) {
            isGameOver = true;
            matchResultText.classList.remove('hidden');
            resetBtn.classList.remove('hidden');
            
            if (playerScore > computerScore) {
                matchResultText.textContent = "🎉 Congratulations, You won the match!";
                matchResultText.style.color = "#98c379";
            } else {
                matchResultText.textContent = "💻 Computer won the match. Better luck next time!";
                matchResultText.style.color = "#e06c75";
            }
        }
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        isGameOver = false;
        
        playerText.textContent = '0';
        computerText.textContent = '0';
        roundResultText.textContent = 'Make your move!';
        matchResultText.classList.add('hidden');
        resetBtn.classList.add('hidden');
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

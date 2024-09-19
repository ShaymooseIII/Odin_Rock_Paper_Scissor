// initialize dictionary for winning combination 
wining_hand ={
    "rock":"scissors",
    "scissors":"paper",
    "paper":"rock"
}

// initialize score
let humanScore = 0;
let computerScore = 0;

// Function to CALCULATE random choice for computer
function getComputerChoice(){
    let num = Math.floor(Math.random() * 3);
    let computer = ""
    switch(num){
        case 0:
            computer = "rock";
            break;
        case 1:
            computer = "scissors";
            break;
        case 2:
            computer = "paper";
    }
    console.log("computer choose " + computer)
    return computer
}

// Function to display user choices
function displayChoices(user,computer){
    //creating the container to display user and computer
    choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container");

    //creating the user and computer content
    userChoice = document.createElement("h3");
    userChoice.setAttribute("id", "user-choice");
    userChoice.textContent= `YOU CHOOSE ${user.toUpperCase()}`; 
    
    computerChoice = document.createElement("h3");
    computerChoice.setAttribute("id", "computer-choice");
    computerChoice.textContent= `COMPUTER CHOOSE ${computer.toUpperCase()}`;    

    //assigning children to parents
    choiceContainer.appendChild(userChoice);
    choiceContainer.appendChild(computerChoice);

    gameContainer.appendChild(choiceContainer);

}

// Function to DETERMINE the two variables with dictionary 
function getWinner(user,computer){
    console.log("waiting");
    if (user === computer){
        winner = "tie"
    }else if(user === wining_hand[computer]){
        winner = "computer"
    }else{
        winner = "user"
    }
    return winner
}
// Display winner
function displayWinner(winner){
    //Creation of the container for round winner
    roundWinnerContainer = document.createElement("div");
    roundWinnerContainer.classList.add("round-winner-container");

    //Creation of the body for round winner
    roundWinnerBody = document.createElement("h3");
    roundWinnerBody.setAttribute("id", "round-winner-body");

    if(winner === "tie"){
        console.log("TIE")
        roundWinnerBody.textContent = "TIE"
    }else{
        console.log(winner+" WON this round");
        roundWinnerBody.textContent = `${winner.toUpperCase()} WON this round`;

    }
        //assigning children to parents 
        roundWinnerContainer.appendChild(roundWinnerBody);
        gameContainer.appendChild(roundWinnerContainer);
}
// tally score 
function increaseScore(winner){
    if(winner === "user"){
        humanScore++;
        return humanScore
    }else if (winner === "computer"){
        computerScore++;
        return computerScore
    }
}

// DISPLAY score
function displayScore(humanScore, computerScore){
    //creation of the score board container
    scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");

    scoreHeader = document.createElement("h2");
    scoreHeader.setAttribute("id", "score-header");
    scoreHeader.textContent = "SCORE"

    //score tally container
    tallyContainer = document.createElement("div");
    tallyContainer.classList.add("tally-container");

    tallyLeft = document.createElement("div");
    tallyLeft.classList.add("tally-left");
    leftHeader = document.createElement("h3");
    leftHeader.setAttribute("id","left-header");
    leftHeader.textContent = "USER";
    leftScore = document.createElement("h3");
    leftScore.setAttribute("id", "left-score");
    leftScore.textContent = `${humanScore}`

    tallyRight = document.createElement("div");
    tallyRight.classList.add("tally-right");
    rightHeader = document.createElement("h3");
    rightHeader.setAttribute("id","right-header");
    rightHeader.textContent = "COMPUTER";
    rightScore = document.createElement("h3");
    rightScore.setAttribute("id", "right-score");
    rightScore.textContent = `${computerScore}`

    //assigning children to parents
    scoreContainer.appendChild(scoreHeader);
    scoreContainer.appendChild(tallyContainer);

    tallyContainer.appendChild(tallyLeft);
    tallyContainer.appendChild(tallyRight);

    tallyLeft.appendChild(leftHeader);
    tallyLeft.appendChild(leftScore);

    tallyRight.appendChild(rightHeader);
    tallyRight.appendChild(rightScore);

    gameContainer.appendChild(scoreContainer);

    console.log("----SCORE----");
    console.log("user: "+ humanScore +"| computer"+ computerScore);

}

// FOR 1 round
function playRound(user){
    computer = getComputerChoice();
    displayChoices(user, computer);
    let round_winner = getWinner(user, computer)
    displayWinner(round_winner);
    increaseScore(round_winner);
    displayScore(humanScore,computerScore)

}
// DETERMINE game winner
function getGameWinner(){
    //creation of the winning container
    winnerContainer = document.createElement("div");
    winnerContainer.classList.add("winner-container");

    //creation of the body in winning container
    gameOver=document.createElement("p");
    gameOver.setAttribute("id","game-over");
    gameOver.textContent = "----GAME OVER----"; winner=document.createElement("p");
    winner.setAttribute("id","winner");

    if(humanScore > computerScore){
        console.log("GAME OVER")
        console.log("----USER WON----")
        winner.textContent = "YOU WON";
    }else{
        console.log("GAME OVER")
        console.log("----COMPUTER WON----")
        winner.textContent = "YOU LOSE";
    }

    winnerContainer.appendChild(gameOver);
    winnerContainer.appendChild(winner);

    gameContainer.appendChild(winnerContainer);
}


// FOR 5 rounds 
function playGame(){
    for(let i = 0; i < 5; i++){
        playRound()
    }
    getGameWinner()
}

// assigning function to Play Game Button
const gameContainer = document.querySelector(".game-container");
const playGamebtn = document.querySelector("#play-game");
playGamebtn.addEventListener("click",()=>{
    // clear game container when a game is started
    while(gameContainer.firstChild){
        gameContainer.removeChild(gameContainer.lastChild);
    }
    //reset score
    humanScore = 0;
    computerScore = 0;

    // creating container for the rock paper scissor buttons
    const optionsBtn = document.createElement("div");
    optionsBtn.classList.add("options-container");

    //creation of the rock paper scissors button
    const rockBtn = document.createElement("button");
    rockBtn.textContent = "Rock";
    const paperBtn = document.createElement("button");
    paperBtn.textContent = "Paper";
    const scissorsBtn = document.createElement("button");
    scissorsBtn.textContent = "scissors";

    //adding all children to proper parent
    optionsBtn.appendChild(rockBtn);
    optionsBtn.appendChild(paperBtn);
    optionsBtn.appendChild(scissorsBtn);

    gameContainer.appendChild(optionsBtn);

    // adding event delegation to the optionsBtn for human choice
    optionsBtn.addEventListener('click', (event)=>{
        //clear previous round 
        while(optionsBtn.nextElementSibling){
            gameContainer.removeChild(optionsBtn.nextElementSibling);
        }
        console.log("clicked");
        //Users choice to be passed into round
        let target = event.target;
        let user = target.textContent.toLowerCase();
        console.log(target.textContent, user);
        //playing of the game
        playRound(user);
        //check to see if someone won
        if(humanScore === 5 || computerScore === 5){
            //Clear game container
            while(gameContainer.firstChild){
                gameContainer.removeChild(gameContainer.lastChild);
            }
                getGameWinner()
        }
        
    });
});
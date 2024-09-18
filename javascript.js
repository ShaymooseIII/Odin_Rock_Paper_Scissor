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
    if(winner === "tie"){
        console.log("TIE")
    }else{
        console.log(winner+" WON this round");
    }
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
    console.log("----SCORE----")
    console.log("user: "+ humanScore +"| computer"+ computerScore)
}

// FOR 1 round
function playRound(user){
    let round_winner = getWinner(user, getComputerChoice())
    displayWinner(round_winner);
    increaseScore(round_winner);
    displayScore(humanScore,computerScore)

}
// DETERMINE game winner
function getGameWinner(){
    if(humanScore === computerScore){
        console.log("GAME OVER")
        console.log("----TIE----")
    } else if(humanScore > computerScore){
        console.log("GAME OVER")
        console.log("----USER WON----")
    }else{
        console.log("GAME OVER")
        console.log("----COMPUTER WON----")
    }
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

        console.log("clicked");
        //Users choice to be passed into round
        let target = event.target;
        let user = target.textContent.toLowerCase();
        console.log(target.textContent, user);
        //check to see if someone won
        if(humanScore === 5 || computerScore === 5){
            getGameWinner()
        }else{
            //playing of the game
            playRound(user);
        }
        
    });
});
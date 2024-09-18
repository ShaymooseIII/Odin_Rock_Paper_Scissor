// initialize dictionary for winning combination 
wining_hand ={
    "rock":"scissors",
    "scissors":"paper",
    "paper":"rock"
}

let humanScore = 0;
let computerScore = 0;

// DISPLAY prompt for user offering choice 
// Take users INPUT and store into variable
function getHumanChoice(){
    user = prompt("Rock, Paper, or Scissors").toLowerCase();
    while((user !== "rock") && (user !== "paper") && (user !=="scissors")){
        user = prompt("Please select Rock, Paper, or Scissors");
        console.log(user)
    }
    console.log("you choose " + user)
    return user
}
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
function playRound(){
    let round_winner = getWinner(getHumanChoice(), getComputerChoice())
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
const body = document.body;
const playGamebtn = document.querySelector("#play-game");
playGamebtn.addEventListener("click",()=>{
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

    body.appendChild(optionsBtn);

    console.log("click")

});
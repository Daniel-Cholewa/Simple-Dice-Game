//Created by:  Daniel Cholewa
//Dec 10th 2017
/* a simple dice game where you roll and hold your score the first player to 50 wins 
rolling a 1 will give the turn to the next player. 2 6s in a row you lose all ponits
*/

//all vars used in the code
var scores, roundScore, activePlayer, maxScore, playerNames, gameOver, prevDiceRoll;
var diceDom = document.querySelector('.dice');

//Resets the game and starts a new game
function newGame() {
    playerNames = ['',''];
    playerNames[0] = prompt('What is the name of player 1?','Player 1');
    playerNames[1] = prompt('What is the name of player 2?','Player 2');
    //maxScore = prompt('How many ponits to you want to play for?');
    maxScore = 50;
    document.getElementById('name-0').textContent = playerNames[0];
    document.getElementById('name-1').textContent = playerNames[1];
    scores = [0,0];
    roundScore = 0;
    prevDiceRoll = 0;
    activePlayer = 0;
    gameOver = true;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('message-0').textContent = 'First to ' + maxScore + ' wins';
    document.getElementById('message-1').textContent = 'First to ' + maxScore + ' wins';
    document.querySelector('.dice').style.display = 'none';
    
    displayHoldRoll('block');
    setCurrent();
}

//Hides or displayes hide / roll button
function displayHoldRoll (el){
    document.querySelector('.btn-roll').style.display = el;
    document.querySelector('.btn-hold').style.display = el;
}

//Sets currents scores to 0
function setCurrent (){
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

//Changes the player
function changePlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDiceRoll = 0;
    setCurrent();
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    diceDom.style.display = 'none';
    
}


//Start of Code
newGame();
 
//the click event for button roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    var dice = Math.floor(Math.random() * 6) + 1;
    
    diceDom.style.display = 'block';
    
    diceDom.src = 'dice-' + dice + '.png';
    
    if (prevDiceRoll === 6 && dice === 6){
        document.getElementById('message-' + activePlayer).textContent = 'You Rolled two 6s - All Ponits Lost!';
        document.getElementById('score-' + activePlayer).textContent = 0;
        scores[activePlayer] = 0;
        changePlayer();
        
    } else {
        
        if (dice !== 1){
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            prevDiceRoll = dice;
        } else {
            document.getElementById('message-' + activePlayer).textContent = 'You Rolled 1 - Next Player!';
            changePlayer();
    }
        
    }
    
});


//The hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= maxScore){
        
        var newG = confirm('Congrats ' + playerNames[activePlayer] + ' You Won the game! with a score of ' + scores[activePlayer] + ' Do you want to play again?');
        
        document.getElementById('message-' + activePlayer).textContent = 'Winner!';
        
        gameOver = false;
        
         if (newG === true){
            newGame();
         } else {
            displayHoldRoll('none');
        }
        
    } else {
          document.getElementById('message-' + activePlayer).textContent = 'You Need ' + (maxScore -scores[activePlayer]) + ' Pts to win' ;
    
          changePlayer();
    }
    
});

//New Game button
document.querySelector('.btn-new').addEventListener('click', function(){
    
if (gameOver){
    
    var newG = confirm('Are you Sure ' + playerNames[activePlayer] + ' You are in the middle of game');
    
     if (newG === true){
        newGame();
    } 
    
} else {
    newGame();
}
    
});

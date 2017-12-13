var scores, roundScore, activePlayer, maxScore, playerNames, gameOver, prevDiceRoll;
var diceDom = document.querySelector('.dice');


function newGame() {
    playerNames = ['',''];
    playerNames[0] = prompt('What is the name of player 1?');
    playerNames[1] = prompt('What is the name of player 2?');
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
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    setCurrent();
}


function setCurrent (){
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

function changePlayer(){
    

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDiceRoll = 0;
    setCurrent();
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    diceDom.style.display = 'none';
    
}

newGame();
setCurrent();
    
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



document.querySelector('.btn-hold').addEventListener('click', function(){
    
    //Add Scores to active player
    
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= maxScore){
        var newG = confirm('Congrats ' + playerNames[activePlayer] + ' You Won the game! with a score of ' + scores[activePlayer] + ' Do you want to play again?');
         document.getElementById('message-' + activePlayer).textContent = 'Winner!';
        gameOver = false;
         if (newG === true){
            newGame();
         } else {
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
        }
        
    } else {
          document.getElementById('message-' + activePlayer).textContent = 'You Need ' + (maxScore -scores[activePlayer]) + ' Pts to win' ;
    
          changePlayer();
    }
    
});

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
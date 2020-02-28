// Variables 
var scores, roundScore, playerTurn, gameplay, sadFace;
var buttonRoll = document.querySelector('.btn-roll');
var buttonHold = document.querySelector('.btn-hold');
var buttonNewGame = document.querySelector('.btn-new');

// Intiallizing start mode
init();

buttonRoll.addEventListener('click', rolling);
buttonHold.addEventListener('click', holding);
buttonNewGame.addEventListener('click', init);

function holding(){
    if(gameplay){
        // Scoring
        scores[playerTurn] += roundScore;
        document.querySelector('#score-'+playerTurn).textContent = scores[playerTurn];
        
        // Winning 
        var inputS = document.querySelector('.final-score').value;
        var winScore;
        (inputS)? winScore = inputS : winScore = 100;
        if(scores[playerTurn] >= winScore){
            document.querySelector('#name-'+playerTurn).textContent = "You Win";
            document.getElementById('dice-1').style.display = "none";
            document.getElementById('dice-2').style.display = "none";
            document.querySelector('.player-'+playerTurn+'-panel').classList.add('winner');
            document.querySelector('.player-'+playerTurn+'-panel').classList.remove('active');
            gameplay = false;
        }else {
            // Turn Players
            nextPlayer();
        }
    }
};

function rolling(){
    document.querySelector('.sadface').style.display = "block";

    if(gameplay){
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;

        var inputFault = document.querySelector('.fault-score').value;
        var faultNum; 
        
        if(inputFault > 0 && inputFault <= 12){
            faultNum = inputFault;
        }else {
            inputFault = 1;
        }

        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-2').style.display = "block";
        document.getElementById('dice-1').src = "dice-"+dice1+".png";
        document.getElementById('dice-2').src = "dice-"+dice2+".png";

        if((dice1 + dice2) != inputFault){
            roundScore += (dice1+dice2);
            document.querySelector('#current-'+playerTurn).textContent = roundScore;
            document.getElementById("losing").classList.remove('sadface-1', 'sadface-2', 'losing');
        }else {
            let faildDice = dice1 == inputFault ? 1 : 2;
            document.getElementById("losing").classList.add(`sadface-${faildDice}`);
            document.querySelector('.sadface').classList.add('losing');
            nextPlayer();
        }
    }
};

function nextPlayer(){
    (playerTurn == 0) ? playerTurn = 1: playerTurn = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.toggle("active");
    document.querySelector('.player-1-panel').classList.toggle("active");
    document.getElementById('dice-1').style.display = "block";
    document.getElementById('dice-2').style.display = "block";   
};

function init(){
    scores = [0, 0];
    playerTurn = 0;
    roundScore = 0;
    gameplay = 1;
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
    // document.getElementById("losing").style.display = ("none");
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector(".fault-score").value = "1";
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.sadface').style.display = "none";
};
// Constant Variables
const play_Game = document.getElementById("play_Game");
const container = document.querySelector('.container');
const play_continer = document.querySelector('.play_continer');
const snake_platform = document.querySelector('.snake_platform');
const score_board = document.querySelector('.score_point');
const OverScore = document.querySelector('.OverScore');

// Game Variables
 let snakeArr = [ {row: 13, col:13} ];
 let direction = {row: 0, col:0};
 let food = {row: 3, col: 3};
 let score = 0;
 let speed = 6;
 let lastcurrTime = 0;

//  For generate random x,y axis
 let a = 2;
 let b= 16;

//  For playing sounds
const Volume = new Audio('./music/move.mp3');
const foodS = new Audio('./music/food.mp3');
const gameover = new Audio('./music/gameover.mp3');


// Function for hitting
function ishit(arr){

    // if sanke eat itself
    for (let i = 1; i < arr.length; i++) {
        if((arr[i].col === arr[0].col ) && (arr[i].row === arr[0].row)) return true
    }

    // if sanke head hit the box 
    if( arr[0].col >= 18 || arr[0].col <=0 )return true;
    if( arr[0].row >= 18 || arr[0].row <=0) return true;     
}

// Function for handle
function handleGame(){

    // If snake hit itself or wall
    if(ishit(snakeArr)){
         
        // Play gameover sound
        gameover.play();
        Volume.pause();
        foodS.pause();

        // Reset the postion
        direction ={ row:0 , col:0};
        snakeArr =[{row:13, col:13}];
        
        container.style.display ='none';
        play_continer.style.display='flex';
        play_Game.textContent = 'Play Again!';
        OverScore.textContent = `Your Score : ${score}`;

    }
     
    // When snake eat food, then change food position and add in snake body
    if(snakeArr[0].col === food.col && snakeArr[0].row === food.row){
       
        foodS.play();
        gameover.pause();
        Volume.pause();

        snakeArr.push({
                 row: snakeArr[0].row + direction.row,
                 col: snakeArr[0].col + direction.col
        });
        food ={
            row: Math.floor(a + (b-a) * Math.random()),
            col: Math.floor( a + (b-a) * Math.random()),
        }
        score+=1;
        score_board.textContent = `${score}`;
    }

    //moving the snake 
    for(let i = snakeArr.length-2 ; i >= 0;i--){
       snakeArr[i+1] ={...snakeArr[i]}; 
    }
    snakeArr[0].row += direction.row;
    snakeArr[0].col += direction.col;


    // Create Snake...
    snake_platform.innerHTML ="";
    snakeArr.forEach((ele,index)=>{
        let snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = ele.row;
        snakeEle.style.gridColumnStart = ele.col;

        if(index == 0){
            snakeEle.classList.add('head');
        }
        else{
            snakeEle.classList.add('snake');
        }
            snake_platform.appendChild(snakeEle);
    });
     
    // Create Food...
    let foodEle = document.createElement('div');
    foodEle.classList.add('food');
    foodEle.style.gridRowStart = food.row;
    foodEle.style.gridColumnStart = food.col;
    snake_platform.appendChild(foodEle);
}

// Control the direction
function getDirection(keyName){

    // continue running snake
    direction ={ row:0 , col:1}
    
    switch(keyName){

        case 'ArrowUp':
            direction.row = -1;
            direction.col = 0;
            Volume.play();
            gameover.pause();
            foodS.pause();
            break;

        case 'ArrowDown':
            direction.row = 1;
            direction.col = 0;
            Volume.play();
            gameover.pause();
            foodS.pause();
            break;

        case 'ArrowLeft':
            direction.row = 0;
            direction.col = -1;
            Volume.play();
            gameover.pause();
            foodS.pause();

            break;

        case 'ArrowRight':
            direction.row = 0;
            direction.col = 1;
            Volume.play();
            gameover.pause();
            foodS.pause();
            break;

        default:
            direction.row = 0;
            direction.col = 0;
            Volume.pause();
            gameover.pause();
            foodS.pause();
            break;
    }
}

// Function for starting 
function startGame(currTime){

    window.requestAnimationFrame(startGame);
    if((currTime - lastcurrTime)/ 1200 < 1/speed) return;
    lastcurrTime = currTime;
    handleGame();
}

// calling function after enter 
window.addEventListener('keydown',(e)=>{
    
    if(e.keyCode === 32){
        // hide & show
        container.style.display ='flex';
        play_continer.style.display='none';

        // reset the scoreBoard
        score = 0;
        score_board.textContent = `${score}`;

        // Call the functions
        window.requestAnimationFrame(startGame);
        window.addEventListener('keydown',(e)=> getDirection(e.key));
    }

});

// calling function after playBTn 
play_Game.addEventListener('click',(e)=>{

    // hide & show
    container.style.display ='flex';
    play_continer.style.display='none';

    // reset the scoreBoard
    score = 0;
    score_board.textContent = `${score}`;

    // Call the functions
    window.requestAnimationFrame(startGame);
    window.addEventListener('keydown',(e)=> getDirection(e.key));
});
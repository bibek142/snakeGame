let inputDir = { x: 0, y: 0 };
const gameOver = new Audio('gameover.mp3');
const foodSound = new Audio('food.mp3');
const turnSound = new Audio('turn.mp3');

let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,
        y: 15
    }
]
let food = { x: 6, y: 7 }



const main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (snake)=>{
    //if snake bumps
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if snake collide into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

const gameEngine = () => {
    //Updating the snake array and food
    //if snake colllide
    if(isCollide(snakeArr)){
        gameOver.play();
        inputDir = {x: 0,y: 0};
        alert("Game Over!! Press any key to play again");
        snakeArr = [{x:13, y:15}];
        score = 0;
        gameScore.innerHTML = "Your Score: " + score;
    }
    //if snake eaten food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if (score > highestScore) {
            highestScore = score;
            localStorage.setItem('highestScore', highestScore);
            updateHighestScore(highestScore);
        }
        gameScore.innerHTML = "Your Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Displaying the snake and food
    //Display Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





const updateHighestScore = (score) => {
    const Hscore = document.querySelector('#Hscore');
    Hscore.innerHTML = "Highest Score: " + score;
}
let highestScore = localStorage.getItem('highestScore') || 0;
updateHighestScore(highestScore);




window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    // const head = document.querySelector('.head');
        
    inputDir = {x:0, y:1};
    turnSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            // head.style.backgroundImage = "url('nsnake.png')";
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            // head.style.backgroundImage = "url('nsnake.png')";
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            // head.style.backgroundImage = "url('nsnaker.png')";
            break;
    
        default:
            break;
    }
    // if(inputDir.x < 0){
    //     head.style.backgroundImage = "url('nsnakel.png')";
    // }
})


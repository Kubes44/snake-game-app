const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
let scoreDisplay = document.getElementById("score")
let squares = []
let currentSnake = [2,1,0]
let directionChange = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    for (let i=0; i < width*width; i++) {
        const square = document.createElement ("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    } 
}
createGrid()
currentSnake.forEach(index => squares[index].classList.add("snake"))

function startGame() {
    //remove snake
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    //remove apple
    appleIndex = 0
    clearInterval(timerId)
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    directionChange = 1
    score = 0
    scoreDisplay.textContent = 0
    intervalTime = 1000
    //generate apple
    generateApples()
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
    //if snake hits right, bottom, left, or top wall, 
    //game ends
        (currentSnake[0] + width >=width*width && directionChange === width) ||
        (currentSnake[0] % width === width-1 && directionChange === 1) ||
        (currentSnake[0] % width === 0 && directionChange === -1) ||
        (currentSnake[0] - width < 0 && directionChange === -width) ||
        squares[currentSnake[0] + directionChange].classList.contains("snake")
    )
    return clearInterval(timerId)

    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + directionChange)
    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple")
        //grow our snake by adding class of snake to it
        squares[tail].classList.add("snake")
        //grow our snake array
        currentSnake.push(tail)
        //generate a new apple
        generateApples()
        //add one to the score
        score++
        //display score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add("snake")
}


function generateApples() {
    do {appleIndex = Math.floor(Math.random() * squares.length)
        //generate a random number
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

function control(e) {
    if (e.key === "ArrowRight") {
        console.log("right pressed")
        directionChange = 1 
    } else if (e.key === "ArrowUp") {
        console.log("ArrowUp")
        directionChange = -width
    } else if (e.key === "ArrowLeft") {
        console.log("ArrowLeft")
        directionChange = -1
    } else if (e.key === "ArrowDown") {
        console.log("ArrowDown")
        directionChange = +width
    }
}

document.addEventListener("keydown", control)
startBtn.addEventListener("click", startGame)

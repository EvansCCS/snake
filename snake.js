// board
var blockSize = 25; // Size of each block on the board
var rows = 20; // Number of rows on the board
var cols = 20; // Number of columns on the board
var board; // Reference to the HTML canvas element
var context; // Context used for drawing on the canvas

// snake head
var snakeX = blockSize * 5; // Initial x-coordinate of the snake head
var snakeY = blockSize * 5; // Initial y-coordinate of the snake head

var velocityX = 0; // Initial velocity along the x-axis
var velocityY = 0; // Initial velocity along the y-axis

var snakeBody = []; // Array to store the positions of the snake's body segments

// food
var foodX; // x-coordinate of the food
var foodY; // y-coordinate of the food

var gameOver = false; // Flag to track if the game is over

// Function to be executed when the window loads
window.onload = function() {
  board = document.getElementById("board"); // Get the canvas element by its ID
  board.height = rows * blockSize; // Set the canvas height based on the number of rows and block size
  board.width = cols * blockSize; // Set the canvas width based on the number of columns and block size
  context = board.getContext("2d"); // Get the 2D rendering context of the canvas

  placeFood(); // Place the initial food on the board
  document.addEventListener("keyup", changeDirection); // Add event listener for keyup events to change snake direction
  setInterval(update, 1000/10); // Set up a repeating function (update) to be called every 100 milliseconds
}

// Function to update the game state and redraw the board
function update() {
  if (gameOver) {
    return; // If the game is over, exit the function
  }

  context.fillStyle="black"; // Set the fill color to black
  context.fillRect(0, 0, board.width, board.height); // Draw a black rectangle covering the entire canvas

  context.fillStyle="red"; // Set the fill color to red
  context.fillRect(foodX, foodY, blockSize, blockSize); // Draw the food on the board

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]); // If the snake eats the food, add a new segment to its body and place new food
    placeFood();
  }

  // Update the positions of the snake body segments
  for (let i = snakeBody.length-1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle="lime"; // Set the fill color to lime (green)
  snakeX += velocityX * blockSize; // Update the x-coordinate of the snake head based on its velocity
  snakeY += velocityY * blockSize; // Update the y-coordinate of the snake head based on its velocity
  context.fillRect(snakeX, snakeY, blockSize, blockSize); // Draw the snake head on the board

  // Draw each segment of the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  
  // Check for game over conditions
  if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
    gameOver = true;
    alert("Game over, reload page to try again"); // Display an alert when the game is over due to hitting the walls
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game over, reload page to try again"); // Display an alert when the game is over due to colliding with the snake's body
    }
  }
}

// Function to handle changes in snake direction based on key presses
function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1; // Change the velocity to move upward if the up arrow key is pressed and the snake is not moving downward
  }
  else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1; // Change the velocity to move downward if the down arrow key is pressed and the snake is not moving upward
  }
  else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0; // Change the velocity to move leftward if the left arrow key is pressed and the snake is not moving rightward
  }
  else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0; // Change the velocity to move rightward if the right arrow key is pressed and the snake is not moving leftward
  }
}

// Function to place the food at a random position on the board
function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize; // Generate a random x-coordinate for the food
  foodY = Math.floor(Math.random() * rows) * blockSize; // Generate a random y-coordinate for the food
}
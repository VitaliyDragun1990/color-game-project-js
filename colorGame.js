let numbOfSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

init();

function init() {
    // set up mode buttons event listeners
    setUpModeButtons();
    // set up color squares click event listeners
    setUpSquares();
    // reset button click event listener
    resetButton.addEventListener('click', function () {
        reset();
    });
    // reset game state
    reset();
}

function setUpModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numbOfSquares = 3 : numbOfSquares = 6;
            reset();
        });
    }
}

function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add click listeners
        squares[i].addEventListener('click', function () {
            // grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct';
                resetButton.textContent = 'Play Again?';
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = '#232323';
                messageDisplay.textContent = 'Try Again';
            }
        });
    }
}

function reset() {
    // generate new set of random colors
    colors = generateRandomColors(numbOfSquares);
    // pick random color from set
    pickedColor = pickColor();
    // change colorDisplay (h1 text) to match pickedColor
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = 'New Colors';
    // remove message
    messageDisplay.textContent = '';
    // reassign color for every square in the grid
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else  {
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = 'steelblue';
}

function changeColors(color) {
    // loop through all squares
    for (let i = 0; i < squares.length; i++) {
        // change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}
window.addEventListener('load', init);

// GLOBALS

// AVAILABLE LEVELS
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// TO CHANGE LEVEL
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM ELEMENTS
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'bissy',
  'raja',
  'naji',
  'cat',
  'kitty',
  'moneer',
  'meagan'
];

// INITIALIZE GAME
function init() {
  // SHOW NUMBER OF SECONDS IN UI
  seconds.innerHTML = currentLevel;
  // LOAD WORD
  showWord(words);
  // START MATCHIN USER INPUT TO WORD
  wordInput.addEventListener('input', startMatch);
  // CALL COUNTDOWN EVERY SECOND USING SETINTERVAL
  setInterval(countDown, 1000);
  // CHECK GAME STATUS
  setInterval(checkStatus, 50);
}

// START MATCH
function startMatch() {
  if(matchWords()) {
    isPlaying =  true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // IF SCORE IS NEGATIVE 1
  if(score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// MATCH CURRENTWORD TO USER INPUT
function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'gg... YOU WIN!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// PICK AND SHOW WORD FROM WORDS ARRAY
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  
  currentWord.innerHTML = words[randIndex];
}

// COUNTDOWN FUNCTION
function countDown() {
  // MAKE SURE TIME HAS NOT RUN OUT
  if(time > 0) {
    // DECREMENT TIME
    time--;
  } else if(time === 0) {
    // GAME OVER
    isPlaying = false;
  }
  // SHOW TIME
  timeDisplay.innerHTML = time;
}

// CHECK GAME STATUS
function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'gg... GAME OVER';
    score = -1;
  }
}

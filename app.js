const wordList = [
  'hangman',
  'javascript',
  'programming',
  'computer',
  'internet',
];
let word = '';
let guessedWord = [];
let attempts = 6;

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('userInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const remainingLivesDisplay = document.getElementById('remainingLives');
const usedCharactersDisplay = document.getElementById('usedCharacters');
let usedCharacters = [];
const newGameButton = document.getElementById('newGameButton');

initializeGame();

function initializeGame() {
  word = chooseRandomWord();
  guessedWord = new Array(word.length).fill('_');
  displayWord();

  userInput.value = '';
  guessButton.disabled = false;
  message.textContent = '';
  attempts = 6;
}

function chooseRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function displayWord() {
  wordDisplay.textContent = guessedWord.join(' ');
}

function checkLetter(letter) {
  if (usedCharacters.includes(letter)) {
    message.textContent = "You've already guessed that letter.";
  } else {
    usedCharacters.push(letter);
    usedCharactersDisplay.textContent = usedCharacters.join(', ');

    if (word.includes(letter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          guessedWord[i] = letter;
        }
      }
      displayWord();
    } else {
      attempts--;
      remainingLivesDisplay.textContent = attempts;
    }

    if (guessedWord.join('') === word) {
      message.textContent = "You win! The word was '" + word + "'.";
      endGame();
    } else if (attempts === 0) {
      message.textContent = "You lose! The word was '" + word + "'.";
      endGame();
    }
  }
}

function endGame() {
  guessButton.disabled = true;
  newGameButton.style.display = 'block';
}

function startNewGame() {
  usedCharacters = [];
  usedCharactersDisplay.textContent = '';
  remainingLivesDisplay.textContent = 6;
  initializeGame();
  newGameButton.style.display = 'none';
  guessButton.disabled = false;
}

guessButton.addEventListener('click', () => {
  const letter = userInput.value.toLowerCase();

  if (letter.length === 1 && /^[a-z]$/.test(letter)) {
    checkLetter(letter);
  } else {
    message.textContent = 'Please enter a valid single letter.';
  }

  userInput.value = '';
});

newGameButton.addEventListener('click', startNewGame);

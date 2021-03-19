//Variables ......
const qwerty = document.getElementById('qwerty');
// const phrase = document.getElementById('phrase');

const buttonReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul');
const title = document.querySelector('.title');

let lives = document.querySelectorAll('.tries img');
let missed = 0;

//Button EventListener/funcion .....
buttonReset.addEventListener("click", () => {
  missed = 0;
  let chosen = document.querySelectorAll('.chosen');
  for (let i = 0; i < chosen.length; i++) {
    chosen[i].removeAttribute('disabled');
    chosen[i].classList.remove('chosen');
  }
//MAking LiveHeart img reappear....
  for (let i = 0; i < lives.length; i++) {
    lives[i].src="images/liveHeart.png"
}
  ul.innerHTML = '';
  const gamePhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(gamePhrase);
  overlay.style.display = "none";
});


// Phrases Array ......

const phrases = [
  "When nothing is going right go left",
  "Dont look back youre not going that way",
  "Love conquers all",
  "Better late than never",
  "I licked it so its mine"
];

  //Function for selecting a random phrase from the array and splitting it to letters...
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split('');
}


//Displaying the array onto the browser...
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('LI');
    const letter = document.createTextNode(`${arr[i]}`);
    if (arr[i] === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
    }
    li.appendChild(letter);
    ul.appendChild(li);
  }
}
// phrase.styles.transition = 'all 2s';

//Check if chosen letter matches letters in the phrase...
function checkLetter(button) {
  let letterCheck = document.querySelectorAll('li');
  let match = null;

  for (let i =0; i < letterCheck.length; i++) {
    if (button.textContent.toLowerCase() === letterCheck[i].textContent.toLowerCase()) {
      letterCheck[i].classList.add('show');
      letterCheck[i].style.backgroundColor = "#dbc8e8";
      letterCheck[i].style.transition = '2s';
      match = letterCheck[i].textContent;
    }
}
return match;
}
//Adding EventListener for missed guesses...
qwerty.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    event.target.classList.add('chosen');
    event.target.disabled = true;
    let pressedLetter = checkLetter(event.target);
    if(pressedLetter ===  null) {
      lives[missed].src="images/lostHeart.png";
      missed++;
    }
    checkWin();
  }
});

//Function to check if player wins or loses...
function checkWin () {
  let letters = document.querySelectorAll('.letter');
  let show = document.querySelectorAll('.show')

  if (letters.length === show.length) {
      overlay.className = 'win';
      overlay.firstChild.textContent = 'YOU WON!';
      title.textContent = 'Congratulations!!!';
      overlay.style.display = 'flex';
      buttonReset.textContent = 'Replay Game';
  } else if (missed >= 5) {
      overlay.className = 'lose';
      overlay.firstChild.textContent = 'YOU LOST!';
      title.textContent = 'Sorry, maybe next time..'
      buttonReset.textContent = 'Try Again';
      overlay.style.display = 'flex';
  }
}

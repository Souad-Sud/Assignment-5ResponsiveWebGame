const countDown = document.querySelector(".countdown");
let startMinutes = 1;
let time = startMinutes * 60;
let countDownInterval;
let gameStarted = false;
let matchCard = 0;
let cardOne, cardTwo;
let disabledDeck = false;
const cards = document.querySelectorAll(".card");

let wins = 0;
let losses = 0;
const winCountDisplay = document.getElementById("winCount");
const lossCountDisplay = document.getElementById("lossCount");
const message = document.querySelector(".congrat-message");
const restartIcon = document.querySelector(".rest-icon"); 

function shuffleCard() {
    matchCard = 0;
    cardOne = cardTwo = "";
    disabledDeck = false;
    let array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    array.sort(() => Math.random() - 0.5); 

    cards.forEach((card, i) => {
        card.classList.remove("flipped", "shake");
        let imageTag = card.querySelector(".back-view img");
        imageTag.src = `./img/img-${array[i]}.jpeg`;
        card.addEventListener("click", flipCard); 
    });

    time = startMinutes * 60;
    countDown.innerHTML = "1:00";
    gameStarted = false;

    //If want to update wins and losses to 0 without clicking on the button restartIcon uncommon this line down
    // wins = 0;
    // losses = 0;
    // winCountDisplay.textContent = wins;
    // lossCountDisplay.textContent = losses;

    message.textContent = "";
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        countDownInterval = setInterval(updateCountdown, 1000);
        
        message.textContent = "";
    }
}

function updateCountdown() {
    if (time <= 0) {
        clearInterval(countDownInterval);
        countDown.innerHTML = "00:00";
        
        losses++;
        lossCountDisplay.textContent = losses;
        
        message.textContent = "😢 Time is up! You lost! Try again!";
        
        setTimeout(() => {
            shuffleCard(); 
        }, 2000);
        
        return;
    }
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countDown.innerHTML = `${minutes}:${seconds}`;
    time--;
}

function flipCard(e) {
    startTimer();
    let clickedCard = e.target.closest(".card");
    if (!clickedCard || clickedCard === cardOne || disabledDeck) return;

    clickedCard.classList.add("flipped");
    if (!cardOne) {
        cardOne = clickedCard;
        return;
    }

    cardTwo = clickedCard;
    disabledDeck = true;
    let cardOneImage = cardOne.querySelector("img").src;
    let cardTwoImage = cardTwo.querySelector("img").src;
    matchCards(cardOneImage, cardTwoImage);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchCard++;
        if (matchCard === 8) {
            setTimeout(() => {
                message.textContent = "Congratulations! You won!";
                clearInterval(countDownInterval);
                
                wins++;
                winCountDisplay.textContent = wins; 
                setTimeout(() => {
                    shuffleCard();
                }, 2000);
                
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disabledDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.remove("flipped");
            cardTwo.classList.remove("flipped");
            cardOne = cardTwo = "";
            disabledDeck = false;
        }, 1000);
    }
}

restartIcon.addEventListener("click", () => {
    clearInterval(countDownInterval); 
    shuffleCard(); 
    wins = 0;
    losses = 0;
    winCountDisplay.textContent = wins;
    lossCountDisplay.textContent = losses;

    message.textContent = ""; 
});


shuffleCard();
let restarBtn = document.querySelectorAll(".btn");
let imageRest = document.querySelector(".rest-icon");

let wins = 0;
let loss = 0;


restarBtn.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("chang-image")
    })
})

let audio = document.querySelector(".audio");
let playAudio = document.getElementById("audio");
let soundMuted = document.querySelector(".sound-muted")

audio.addEventListener("click", () =>{
    if(playAudio.paused) {

        playAudio.play();
    }else {
        audio.classList.toggle("muted");
        soundMuted.classList.toggle("muted")
        playAudio.muted = !playAudio.muted;
    }
})

let restartBtn = document.querySelector(".btn")
restartBtn.addEventListener("click" , () => {
    window.location.reload();
    return false;
    
})

const countDown = document.querySelector(".countdown");
let startMinutes = 1;
let time = startMinutes * 60 ;
const countDownInterval = setInterval(unpdateCountdown, 1000);
function restartGame(){
    time = startMinutes * 60;
    countDown.innerHTML = "1:00"
    matchCard =0;
    shuffleCard();
    clearInterval(countDownInterval);
    countDownInterval = setInterval(unpdateCountdown, 1000)
}

function unpdateCountdown() {
    if(time <= 0){
        loss++
        displWins()
        clearInterval(countDownInterval);
        countDown.innerHTML = "00:00";
        countDown.innerHTML = "time is up!";
        // setTimeout(() => {
        //     restartGame();
        // }, 1000);
        shuffleCard();
        let message = document.querySelector(".congrat-message");
        message.textContent = "OOOps You lost the game, try again!!!";

        return;
    }
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countDown.innerHTML = `${minutes}: ${seconds} `;
    time--;
    
}

const cards = document.querySelectorAll(".card");
let matchCard = 0;
let cardOne, cardTwo;
let disabledDeck = false;

function flipCard(e) {
       let clickedCard = e.target;
    if(clickedCard != cardOne && !disabledDeck) {

        clickedCard.classList.add("flipped");
        if(!cardOne) {
            return(cardOne = clickedCard)
        }       
        cardTwo = clickedCard;
        disabledDeck = true;
        let cardOneImage = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImage, cardTwoImg);
        
    }
}

const displWins = () => {
    document.getElementById("winCount").textContent = wins;
    document.getElementById("lossCount").textContent = loss;
}

function matchCards(img1, img2) {
   if(img1 === img2) {
    matchCard++; 
    if(matchCard == 8) {
        wins++
        displWins();
        setTimeout(() => {
            let message = document.querySelector(".congrat-message");
            message.textContent = "congratulation you finished level One";
            clearInterval(countDownInterval);
            countDown.innerHTML = "00:00";
           
            shuffleCard();
            
        }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return  (disabledDeck = false);
   }
   setTimeout(() => {

       cardOne.classList.add("shake");
       cardTwo.classList.add("shake");
   }, 400);

   setTimeout(() => {
    cardOne.classList.remove("shake", "flipped");
    cardTwo.classList.remove("shake", "flipped");
    cardOne = cardTwo = "" ;
    disabledDeck = false;
   }, 1200);

}

function shuffleCard(){
  
    matchCard = 0;
    cardOne = cardTwo = "";
    disabledDeck = false;
    let array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    array.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) =>{
    card.classList.remove("flipped", "shake");
        // if(i > 7 ) {
        //     i -= 8
        // }
         
        let imagTag = card.querySelector(".back-view img");      
        imagTag.src = `./img/img-${array[i]}.jpeg`;  
        card.addEventListener("click", flipCard);
    })
    time = startMinutes * 60;
    countDown.innerHTML = "1:00"
}

shuffleCard();
cards.forEach((card)=> {
    //card.classList.add("flipped")

  card.addEventListener("click", flipCard);

})

let restarBtn = document.querySelectorAll(".btn");
let imageRest = document.querySelector(".rest-icon");

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
const startMinutes = 2;
let time = startMinutes * 60 ;
const countDownInterval = setInterval(unpdateCountdown, 1000);


function unpdateCountdown() {
    if(time <= 0){
        clearInterval(countDownInterval);
        countDown.innerHTML = "00:00";
        countDown.innerHTML = "time is up";
        window.location.reload();

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

function matchCards(img1, img2) {
   if(img1 === img2) {
    matchCard++; 
    if(matchCard == 8){
        setTimeout(() => {
            let message = document.querySelector(".congrat-message");
            message.textContent = "congratulation you finished level One";
           
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

    let array = [1, 2, 3, 4, 5, 6, 7, 8];
    array.sort(() => (Math.random() > 0.5 ? 1 : -1));
    cards.forEach((card, i) =>{
    card.classList.remove("flipped", "shake");
        if(i > 7 ) {
            i -= 8
        }
         
        let imagTag = card.querySelector(".back-view img");      
        imagTag.src = `./img/img-${array[i]}.jpeg`;  
        card.addEventListener("click", flipCard);
    })
}

shuffleCard();
cards.forEach((card)=> {
    //card.classList.add("flipped")

  card.addEventListener("click", flipCard);

})
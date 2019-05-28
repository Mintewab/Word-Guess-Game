var letterSpans = new Array();
var lettersTrack = new Array();
var wordRight = "BCBCD";
var wordWorking = "text";
var letterTry = "P";
var tries = 7;
var wins = 0;
var loses = 0;
var lettersUsed = "";
var ctx = 0;
var A = new Array();
var i = 0, i2 = 0, i7 = 0;
var t = "X";

// runs when the body loads
function prettyUpPage() {
    A = document.getElementsByTagName("div");
    for (i = 0; i < A.length && 1 == 1; i += 1) {
        A[i].style.cssText += "; border: 1px solid #009999; padding: 3px; margin: 3px;background:rgb(32, 26, 51, 0.6)";
    }

    letterSpans = document.getElementsByTagName("span");
    for (i = 0; i < letterSpans.length && 1 == 1; i += 1) {
        letterSpans[i].style.cssText += ";border: 1px solid #006666; padding: 3px; margin: 3px; cursor: pointer; color: #cc6600;";
    }

    document.getElementById("displayHungDude").style.cssText += "; border: 1px solid #cc6600; padding: 2px; margin: 2px;";
    ctx = document.getElementById("displayHungDude").getContext("2d");
    gameStart();
}

function gameStart() {
    tries = 7;
    lettersUsed = "";
    t = "Pizza,Pepperoni,Mushrooms,Ham,Peppers,Onions,Olives,Bacon,Sausage,Garlic,Pineapple,Jalapenos,Tomatoes,Artichokes,Meatballs,Anchovies,Basil,Pepperponcini,Pesto,Cheese,Crust";
    t = t.toUpperCase();

    //pick a random # from 0 to 20, interger
    i = Math.floor(Math.random() * 21);
    wordRight = t.split(",")[i];
    wordWorking = "";
    t = "";

    //if Onions, loop starts wordWorking to exactly 6 "_" and t to "_ _ _ _ _ _ "
    //if Ham, the loop starts wordWorking to exactly 3 "_" and t to "_ _ _ "
    for (i = 0; i < wordRight.length; i++) {
        wordWorking += "_";
        t += "_ ";
    }

    document.getElementById("wordDisplay").innerHTML = "Your Word: " + t;

    // letters to be choosen only one time
    for (i = 0; i < 26; i++) {
        lettersTrack[i] = 1;
    }
    redrawHungDude();
    document.getElementById("Info").innerHTML = "You have 7 tries left";
    document.getElementById("Info2").innerHTML = "Press any key to get started!";
    document.getElementById("Info3").innerHTML = wins + " wins and " + loses + " loses";
}


function KeyTheyPressed() {
    t = event.key;
    t = t.toUpperCase();
    LetterClick(t);
}

function LetterClick(letterTry) {
    i7 = letterTry.charCodeAt(0) - 65;
    //when I already chose this letter, it display alert, and exit this function
    if (lettersTrack[i7] < 1) {
        alert("You aleady tried letter " + letterTry + " ... Try another!");
        return;
    }
    lettersTrack[i7] = 0;

    if (wordRight.indexOf(letterTry) < 0) {

        letterSpans[i7].style.cssText += ";border: 3px solid #BB0000; color: #BB0000;";
        tries--;
        lettersUsed = lettersUsed + letterTry + " ";
        redrawHungDude();
    } else {
        letterSpans[i7].style.cssText += ";border: 3px solid #00FF00; color: #00FF00;";
    }

    t = "";

    for (i = 0; i < wordRight.length; i++) {
        if (wordRight.charAt(i) == letterTry) {
            t += letterTry
        } else { t += wordWorking.charAt(i) }
    }

    wordWorking = t;

    t = "";
    for (i = 0; i < wordRight.length; i++) {
        t += wordWorking.charAt(i);
        t += " ";
    }

    document.getElementById("wordDisplay").innerHTML = "Your Word: " + t;
    t = "You have " + tries + " tries left.";

    if (tries < 1) {
        t = "You are a LOSER!!! (the word you were looking for was " + wordRight + ")";
        loses++;
    }

    if (wordWorking.indexOf("_") < 0) {
        t = "You WIN!!!";
        wins++;
    }

    document.getElementById("Info").innerHTML = t;
    document.getElementById("Info2").innerHTML = "You have used the following letters: " + lettersUsed;
    if (tries < 1 || wordWorking.indexOf("_") < 0) { prettyUpPage() }
}


function redrawHungDude() {
    //set some basic parameters
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    //background
    ctx.fillStyle = "rgb(0, 153, 153)";
    ctx.fillRect(20, 20, 360, 360);

    //gallows base
    ctx.strokeStyle = "RGB(0,0,0)";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(40, 360);
    ctx.lineTo(80, 320);
    ctx.lineTo(320, 320);
    ctx.lineTo(360, 360);
    ctx.stroke();

    //gallows
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(150, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 90);
    ctx.stroke();

    if (tries < 7) {
        //head
        ctx.fillStyle = "RGB(0,0,200)";
        ctx.beginPath();
        ctx.arc(250, 100, 30, 2 * Math.PI, 0);
        ctx.fill();
    }

    if (tries < 6) {
        //body
        ctx.strokeStyle = "RGB(0,0,200)";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(250, 130);
        ctx.lineTo(250, 230);
        ctx.stroke();
    }

    if (tries < 5) {
        //left leg
        ctx.beginPath();
        ctx.moveTo(200, 280);
        ctx.lineTo(250, 230);
        ctx.stroke();
    }

    if (tries < 4) {
        //right leg
        ctx.beginPath();
        ctx.moveTo(300, 280);
        ctx.lineTo(250, 230);
        ctx.stroke();
    }

    if (tries < 3) {
        //left arm
        ctx.beginPath();
        ctx.moveTo(200, 120);
        ctx.lineTo(250, 170);
        ctx.stroke();
    }

    if (tries < 2) {
        //right arm
        ctx.beginPath();
        ctx.moveTo(300, 120);
        ctx.lineTo(250, 170);
        ctx.stroke();
    }
}


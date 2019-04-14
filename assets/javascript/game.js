
// declare global variables .....index of 0 to 25 = A to Z ....1=available to choose, 0=already choosen 
var letterSpans = new Array();
var lettersTrack = new Array();

var wordRight = "BCBCD";
var wordWorking = "text";
var letterTry = "P";

var tries = 7;

var wins = 0;
var loses = 0;
var lettersUsed = "";


var A = new Array();
var i = 0, i7 = 0;
var t = "X";

//Function runs when as body loads
function PrettyUpPage() {
    A = document.getElementsByTagName("div");

    for (i = 0; i < A.length && 1 == 1; i += 1) {

        A[i].style.cssText += "; border: 1px solid #CCCC00; padding: 3px; margin: 3px;";
    }
    letterSpans = document.getElementsByTagName("span");

    for (i = 0; i < letterSpans.length && 1 == 1; i += 1) {

        letterSpans[i].style.cssText += ";border: 1px solid #0000CC; padding: 3px; margin: 3px; cursor: pointer; color: #CCCCCC;";
    }
    GameStart();
}

function GameStart() {

    tries = 7;
    lettersUsed = "";
    t = "Pizza,Pepperoni,Mushrooms,Ham,Peppers,Onions,Olives,Bacon,Sausage,Garlic,Pineapple,Jalapenos,Tomatoes,Artichokes,Meatballs,Anchovies,Basil,Pepperponcini,Pesto,Cheese,Crust";
    t = t.toUpperCase();
    //pick a random # from 0 to 20, interge
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
    // needs to display in the html
    document.getElementById("WordDisplay").innerHTML = "Your Word: " + t;
    // letters to be choosen only one time
    for (i = 0; i < 26; i++) {

        lettersTrack[i] = 1;
    }
    document.getElementById("Info").innerHTML = "You have 7 tries left";

    document.getElementById("Info2").innerHTML = "Press any key to get started!";

    document.getElementById("Info3").innerHTML = wins + " wins and " + loses + " loses";
}
// event created for Key pressed t=thekeytheypressed
function KeyTheyPressed() {


    t = event.key;
    t = t.toUpperCase();

    LetterClick(t);
}
function LetterClick(letterTry) {

    //the charCode of "A" is 65, but I want to set i7 to 0 if A was clicked
    //the charCode of "B" is 66, but I want to set i7 to 1 if B was clicked, and so on....
    i7 = letterTry.charCodeAt(0) - 65;

    //when I already chose this letter, it display alert, and exit this function
    if (lettersTrack[i7] < 1) {

        alert("You aleady tried letter " + letterTry + " ... Try another!");
        return;
    }
    //mark the selected letter as chosen so I dont repet
    lettersTrack[i7] = 0;
    // when I click letter ....the little box changes color :red for correct and red for wrong
    // it tracks how many tries we have left as well
    if (wordRight.indexOf(letterTry) < 0) {

        letterSpans[i7].style.cssText += ";border: 3px solid #BB0000; color: #BB0000;";
        tries--;
        lettersUsed = lettersUsed + letterTry + " ";
    }
    else {

        letterSpans[i7].style.cssText += ";border: 3px solid #00FF00; color: #00FF00;";
    }
    // replaces "_" with the letter 
    t = "";
    for (i = 0; i < wordRight.length; i++) {

        if (wordRight.charAt(i) == letterTry) {

            t += letterTry
        }
        else { t += wordWorking.charAt(i) }
    }

    wordWorking = t;
    t = "";

    for (i = 0; i < wordRight.length; i++) {

        t += wordWorking.charAt(i);
        t += " ";
    }
    document.getElementById("WordDisplay").innerHTML = "Your Word: " + t;

    t = "You have " + tries + " tries left.";

    //I lost
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

    if (tries < 1 || wordWorking.indexOf("_") < 0) { PrettyUpPage() }


}


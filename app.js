// GLOBAL VARIABLES //
var score = 0;
var highscore;
var userInput = [];
var userLower = [];
var userSubmit;
var character;
var counter;
var seconds;
var temp;
var userSplit;
var split;
var people;
var characters = 'http://swapi.co/api/people/' + randNum(); + '/' ;
var films;
// ONLOAD RELEASE THE FORCE //
window.onload = function(){
  // startGame();
  hideFunction();
  submitListener();
  startGame();
}
// HIDE FUNCTION HIDING DIV TAG //
function hideFunction(){
  $("#gameBoard").toggle("show");
}
// START GAME BUTTON FUNCTION STARTS TIMER //
function startButton(){
  hideFunction();
}

// START GAME FUNCTION GET REQUEST TO API //
function startGame(){
  $.get(characters)
    .done(function(data){
      people = data.name;
      console.log(people);
      films = data.films;
      gender = data.gender;
      hairColor = data.hair_color;
      skinColor = data.skin_color;
      characterSelector();
      logArray();
      // countdown();
      document.getElementById("userText").focus();
    })
    .fail(function(){
      $("#messages").setMessage("Click New Character!");
      console.log("No Data");
    });
}
function shake () {
  $("#messages").addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass("animated shake");
  });
}
// CHECK FOR WINNER FUNCTION //
function checkWinner () {
  if(character === userLower){
    setMessage("CONGRATS YOU GUESSSED CORRECTLY!");
    $("td").addClass("correct");
    document.getElementById('countdown').remove();
    // score++;
    // scoreBoard();
  } else {
    shake();
    setTimeout(function(){
      setMessage("Guess Again!");
    }, 2000);
  }
}
// CREATES RANDOM NUMBER TO BE USED FOR API //
function randNum (){
  var x =  Math.random();
  var y =  Math.ceil(x * 100);
  if (y > 88) {
    return 1;
  } else {
    return y;
  }
}
// GRAB PLAYER OBJECT AND SPLICE LETTER //
function characterSelector (){
  split = people.toUpperCase().split('');
  character = people.toUpperCase();
  console.log(split);
}
// ADDING TABLE CELLS TO BOARD //
function addCell(letter,i){
  var row = document.querySelectorAll("tr");
  var newCell = document.createElement("td");
  newCell.textContent = letter;
  row[0].appendChild(newCell);
  if (letter === "é" || letter === "-") {
    newCell.setAttribute("class", "correct");
  }
  if (letter === " ") {
    newCell.setAttribute("id", "space");
  }
  else {
    newCell.setAttribute("id", "pos" + i);
    shake();
    //setMessage("You Guessed a Correct Letter!");
  }
}
// LOOPS THROUGH SPLIT ARRAY CREATES TEMPARR AND CALLS ADDCELL //
function logArray(tempArr){
  for (var i = 0 ; i < split.length ; i++){
    if(split.length > 12){
      reset();
    } else {
      addCell(split[i], i);
    }
  }
};
// // PULL TEXT FROM INPUT CLASS 'FORM-CONTROL' //
function userSubmit(){
  userInput = document.getElementById("userText").value;
  userLower = userInput.toUpperCase();
  userSplit = userInput.toUpperCase().split('');
  console.log(userSplit);
  compareAnswer();
  checkWinner();
}
// FUNCTION THAT COMPARES USER ARRAY AND SPLIT ARRAY //
function compareAnswer(){
  // Add if statement if user guesses full word - before starting for loop
  for(var i = 0; i < split.length; i++){
    if(userLower === split[i]){
      document.getElementById('pos'+i).className="correct";
      shake();
      setMessage("You Guessed a Correct Letter!");
    } else {
      console.log("nope");
    }
  }
  userInput = [];
}
// RESET BOARD //
function reset(){
  document.location.reload(true);
}
// MESSAGES //
function setMessage(msg) {
	document.getElementById('messages').innerText = msg;
}
// ORIGINAL HINT MESS //
function hintMessage(){
  if (films == "http://swapi.co/api/films/1/"){
    return films = "Episode 1 "
    chintButtonClicked();
  } else if (films == "http://swapi.co/api/films/2/"){
    return films = "Episode 2 "
    hintButtonClicked();
  } else if (films == "http://swapi.co/api/films/3/"){
    return films = "Episode 3 "
    hintButtonClicked();
  } else if (films == "http://swapi.co/api/films/4/"){
    return films = "Episode 4 "
    hintButtonClicked();
  } else if (films == "http://swapi.co/api/films/5/"){
    return films = "Episode 5 "
    hintButtonClicked();
  } else if (films == "http://swapi.co/api/films/6/"){
    return films = "Episode 6 "
    hintButtonClicked();
  } else if (films == "http://swapi.co/api/films/7/"){
    return films = "Episode 7 "
    hintButtonClicked();
  } else {
    films = "multiple movies!";
  }
  hintButtonClicked();
}
//FUNCTION TO SET SCOREBOARD USING LOCAL STORAGE //
function scoreBoard (){
  highscore = localStorage.getItem("highscore");
  if(highscore !== null){
    if(score>highscore){
      localStorage.setItem("highscore", score);
    }
  } else {
      localStorage.setItem("highscore", score);
  }
}
// HINT MESSAGE FUNCTION //
function hintButtonClicked(){
  setMessage("Character features - gender: " + gender + " - hair-color: " + hairColor + " - skin-color: " + skinColor + " - starred in: " + films);
}
// TIMER FUNCTION //
function countdown() {
    seconds = document.getElementById('countdown').innerHTML;
    seconds = parseInt(seconds, 10);
    if (seconds == 20) {
      document.getElementById('pos1').className = "correct";
    }
    if (seconds == 8) {
      document.getElementById('pos2').className = "correct";
    }
    if (seconds == 1) {
      temp = document.getElementById('countdown');
      temp.innerHTML = "TIME IS UP!";
      shake();
      $("td").addClass("correct");
      setMessage("You didn't guess in time! GAME OVER!")
      return;
    }
    seconds--;
    temp = document.getElementById('countdown');
    temp.innerHTML = seconds;
    countingDown = setTimeout(countdown, 1000);
  }
// LISTENS FOR ENTER TO SUBMIT ANSWER //
function submitListener() {
    document.getElementById("userText").addEventListener("keydown", function(e){
      if(e.keyCode == 13){
        userSubmit();
      }
    }, false);
}

// BUTTONS //

// SHOW GUESSED LETTERS //

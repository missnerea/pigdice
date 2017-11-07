// Bussiness logic
var playersArray = []
var turnRollArray = []

function Player(playerName, score) {
  this.playerName= playerName;
  this.score = score;
  playersArray.push(this);
}


Array.prototype.sum = function() {
  return this.reduce(function(a,b) {return a + b});
}



// UI logic
$(document).ready(function() {
  // Player name submit button
  $("form#playerNameForm").submit(function(event) {
    event.preventDefault();
    // debugger;
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();
    var player1 = new Player(player1Name, 0);
    var player2 = new Player(player2Name, 0);
    $("#player1Display").text(playersArray[0].playerName + "'s turn").show();
    showNamesAndScores();
    $("form").hide();
    $(".gameStuff").show();
  });

  $("#diceRoll").click(function(event) {
    event.preventDefault();
    $("#rollResult").show();
    $(".showTurnTotal").show();
    var randomRoll = (1 + Math.floor(Math.random() * 6));
    $("#rollResult").text(randomRoll);
    if (randomRoll >= 2) {
      turnRollArray.push(randomRoll);
      $("#turnTotal").text(turnRollArray.sum());
    } else {
      rollOneChangePlayers();
    }
  });

// player 1
  $("#endTurnBtn").click(function(event){
    changePlayers();
    if (playersArray[0].score >= 100){
      alert(playersArray[0].playerName + " wins!!");
      document.location.reload(true);
    } else if (playersArray[1].score >= 100) {
      alert(playersArray[1].playerName + " wins!!");
      document.location.reload(true);
  }
  });

  function showNamesAndScores() {
    $("#playerOneName").text(playersArray[0].playerName);
    $("#playerTwoName").text(playersArray[1].playerName);
    $("#playerOneTotalScore").text(playersArray[0].score);
    $("#playerTwoTotalScore").text(playersArray[1].score);
  }

  function rollOneChangePlayers() {
      if ($("#player1Display").is(":visible")) {
        turnRollArray = [0];
        $("#turnTotal").text(turnRollArray);
        setTimeout(function() { alert("YOU ROLLED A 1- NO POINTS!!"); }, 50 );
        setTimeout(function() {$("#player2Display").text(playersArray[1].playerName + "'s turn").show();}, 100 );
        $("#player1Display").hide();
        showNamesAndScores();
          }
      else if ($("#player2Display").is(":visible")){
        turnRollArray = [0];
        $("#turnTotal").text(turnRollArray);
        setTimeout(function() { alert("YOU ROLLED A 1- NO POINTS!!"); }, 50 );
        setTimeout(function() {$("#player1Display").text(playersArray[0].playerName + "'s turn").show();}, 100 );
        $("#player2Display").hide();
        showNamesAndScores();
      }
    }

  function changePlayers() {
    if ($("#player1Display").is(":visible")) {
      playersArray[0].score = (playersArray[0].score += turnRollArray.sum());
      alert("Congrats, " + playersArray[0].playerName + ", you got " + turnRollArray.sum() +  " points!");
      turnRollArray = [0];
      $("#turnTotal").text(turnRollArray)
      $("#player1Display").hide();
      $("#player2Display").text(playersArray[1].playerName + "'s turn").show();
      console.log(playersArray[0].score);
      showNamesAndScores();
    } else {
      alert("Congrats, " + playersArray[1].playerName + ", you got " + turnRollArray.sum() +  " points!");
      playersArray[1].score = (playersArray[1].score += turnRollArray.sum());
      turnRollArray = [0];
      $("#turnTotal").text(turnRollArray)
      $("#player2Display").hide();
      $("#player1Display").text(playersArray[0].playerName + "'s turn").show();
      showNamesAndScores();
      console.log(playersArray[1].score);
      }
    }

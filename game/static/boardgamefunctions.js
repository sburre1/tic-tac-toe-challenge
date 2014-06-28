/* 
 * Board Configuration Variables
 */
var corners = [1, 3, 7, 9];
var sides = [4, 5, 6];
var center = [5];
var winningMoves = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9],[1,5,9], [3,5,7]];

// Configure the board grid
var square1 = new gridSquare(1, "corner", 45, 90, false, "-1");	
var square2 = new gridSquare(2, "side", 175, 90, false, "-1");
var square3 = new gridSquare(3, "corner", 310, 90, false, "-1");
var square4 = new gridSquare(4, "side", 45, 225, false, "-1");
var square5 = new gridSquare(5, "center", 175, 225, false, "-1");
var square6 = new gridSquare(6, "side", 310, 225, false, "-1");
var square7 = new gridSquare(7, "corner", 45, 360, false, "-1");
var square8 = new gridSquare(8, "side", 175, 360, false, "-1");
var square9 = new gridSquare(9, "corner", 310, 360, false, "-1");

/*
 * Function: debug()
 * Purpose: to print log statements to 
 * debug JavaScript code.
 */

function debug(message) {
	try {
		console.log(message);
	} catch (exception) {
		return;
	}
}

/*
 * Function: getPlayerLetter()
 * Purpose: prompts the user to enter either X or O
 * for their game piece on the board.
 * 
 * If the user does not enter a correct letter, default player game
 * piece to X.
 */
function getPlayerLetter() {
	var letter = prompt("Do you want to be player X or player O?", "X or O").toUpperCase();
	
	if (letter != "X")
	{
		if (letter != "O")
		{
			alert("You didn't enter a correct letter, You will be Player X.");
			letter = "X";
		}
	}
	
	return letter;
}

/*
 * Function: showOrHideButton()
 * Purpose: used to show and hide a 
 * button when it doesn't need to be displayed
 * on the GUI.
 * Parameters:
 * btnID - the id for the button
 * action - either "hide" or "show"
 * 
 */
function showOrHideButton(btnID, action) {
	debug("showOrHideButton");
	if (action == "hide")
	{
		document.getElementById(btnID).classList.add('hide');
		debug(document.getElementById('startGameBtn').classList);
	} else 
	{
		document.getElementById(btnID).classList.remove('hide');
		debug(document.getElementById('startGameBtn').classList);
	}
}

/*
 * Function: getPosition()
 * Purpose: Gets the position of the user's mouse clicks
 * so that I can determine which Grid spot he selected
 * 
 * Return:
 * x - x coordinate 
 * y - y coordinate
 * 
 */
function getPosition(canvas, evt) {
	debug("getPosition");
	var board = canvas.getBoundingClientRect()
	var x = new Number();
	var y = new Number();
	
	x = evt.clientX - board.left;
	y = evt.clientY - board.top;
	
	return {x: x, y: y};
}

/*
 * Function: gridSquare()
 * Purpose: Creates the grid square objects for each
 * square on the board.
 * 
 * configures the gridSquare Object
 * to the center (x,y) coordinate location which will
 * be needed when we draw the letter 'X' or 'O' on
 * the board.
 * 
 */
function gridSquare(number, type, x, y, chosen, chosenBy) {
	var number = number;
	var type = type;
	var x = x;
	var y = y;
	var chosen = chosen; // has the square been taken?
	var chosenBy = chosenBy; // who took it (X or O)?
	
	this.getNumber = function() {
		return number;
	}
	
	this.getType = function() {
		return type;
	}
	
	this.getX = function() {
		return x;
	}
	
	this.getY = function() {
		return y;
	}
	
	this.getChosen = function() {
		return chosen;
	}
	
	this.getChosenBy = function() {
		return chosenBy;
	}
	
	this.getObjectInfo = function() {
		var gridSquare = {number: number, type: type, x: x, y: y, chosen: chosen, chosenBy: chosenBy};
		return gridSquare;
	}
	
	this.setChosenAndChosenBy = function(newVal, who) {
		chosen = newVal;	
		chosenBy = who;
	}
}

/* 
 * Function: whichGridSpotChosen()
 * Purpose: Determines which spot the 
 * player chose
 * 
 * Returns: gridSquare Object - contains information
 * about the chosen board square, type (corner, side, center), 
 * and center (x,y) coordinate pair where the 'X' or 'O' should be drawn.
 * 
 * Board Grid Information:
 * corners: 1, 3, 7, 9 
 * sides: 4, 2, 8, 6
 * center: 5
 */
function whichGridSpotChosen(mousePos) {
	var gridSquare = {number:0, type:'unknown', x:0, y:0};
	
	// configuration of the drawn grid (vertical lines, horizontal lines)
	var verticalL1 = 133.0;
	var horizontalL1 = 133.0;
	var verticalL2 = 266.0;
	var horizontalL2 = 266.0;
	
	if(mousePos.x < verticalL1 && mousePos.y < horizontalL1){
		gridSquare = square1.getObjectInfo();
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y < horizontalL1)
	{
		gridSquare = square2.getObjectInfo();
	} else if (mousePos.x > verticalL2 && mousePos.y < horizontalL1)
	{
		gridSquare = square3.getObjectInfo();
	} else if (mousePos.x < verticalL1 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare = square4.getObjectInfo();
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare = square5.getObjectInfo();
	} else if (mousePos.x > verticalL2 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare = square6.getObjectInfo();
	} else if (mousePos.x < verticalL1 && mousePos.y > horizontalL2)
	{
		gridSquare = square7.getObjectInfo();
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y > horizontalL2)
	{
		gridSquare = square8.getObjectInfo();
	} else if (mousePos.x > verticalL2 && mousePos.y > horizontalL2)
	{
		gridSquare = square9.getObjectInfo();
	}
	
	return gridSquare;
}

/* 
 * Function: drawLetter
 * Purpose: Will draw either 'X' or 'O'
 * on the board at the x,y location specified.
 */
function drawLetter(x, y, letter) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	context.font = "70px arial";
	context.fillStyle = "#FFFFFF";
	context.fillText(letter, x, y); 
}

/*
 * Function: playersMove()
 * Purpose: Listens for the player's click on 
 * the canvas + determines which grid square
 * the player chose + places the 'X' or 'O' on
 * the board.
 * 
 */
function playersMove(letter){
	debug("players move");
	// listen for click on grid
	var theCanvas = document.getElementById('canvas');
		
	canvas.addEventListener('click', function(evt) {
		// get the x,y coordinates of the 
		// player's mouse click
		var mousePos = getPosition(canvas, evt);
		
		// find out which Grid spot was chosen.		
		var gridSquare = whichGridSpotChosen(mousePos);		
		debug("Grid chosen: " + gridSquare.number);		
		
		debug("place players move on board.");
		
		// call the isFree() function so that we 
		// configure chosen and chosenBy settings on object.
		isFree(gridSquare.number, letter); 	
		
		// place players game piece on center of square.	
		drawLetter(gridSquare.x, gridSquare.y, letter);
		
	}); 	
}

/*
 * Function: computersMove()
 * Purpose: Makes the computers move 
 */
function computersMove(computer_letter) {
	debug("computers move.");
	
	// ToDo: See is there a move the computer can make 
	// that will win the game?
	
	// ToDo: See if there is a move that the player will take 
	// that will cause the computer to lose?
	
	// Is a corner space free? 
	for (var i = 0; i < corners.length; i++)
	{
		debug("checking corner: " + corners[i]);
		var result = isFree(corners[i], computer_letter);
		// Traverse through the corners till we find one that's free.
		if (result != false) {
			//debug("corner space: " + corners[i] + " is free.");
			drawLetter(result.x, result.y, computer_letter);			
		}
		break; // we already found a space to take.		
	}
	
	// ToDo: If no corners are free, check for center.
	
	// ToDo: Check for side spaces.
}

/*
 * Function: isFree()
 * Purpose: Determines if the space is free
 * If it is free, sets the object info
 * chosen to 'True' and the chosenBy to either
 * 'X' or 'O' depending on who chose the space.
 * 
 */

function isFree(number, letter) {
	if(number == 1){
		if (square1.getChosen() == false)
		{
			// then this spot is not taken
			free = square1.getObjectInfo();
			square1.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	} else if (number == 2)
	{
		if (square2.getChosen() == false)
		{
			// then this spot is not taken
			free = square2.getObjectInfo();
			square2.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	} else if (number == 3)
	{
		if (square3.getChosen() == false)
		{
			// then this spot is not taken
			free = square3.getObjectInfo();
			square3.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	} else if (number == 4)
	{
		if (square4.getChosen() == false)
		{
			// then this spot is not taken
			free = square4.getObjectInfo();
			square4.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}else if (number == 5)
	{
		if (square5.getChosen() == false)
		{
			// then this spot is not taken
			free = square5.getObjectInfo();
			square5.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}else if (number == 6)
	{
		if (square6.getChosen() == false)
		{
			// then this spot is not taken
			free = square6.getObjectInfo();
			square6.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}else if (number == 7)
	{
		if (square7.getChosen() == false)
		{
			// then this spot is not taken
			free = square7.getObjectInfo();
			square7.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}else if (number == 8)
	{
		if (square8.getChosen() == false)
		{
			// then this spot is not taken
			free = square8.getObjectInfo();
			square8.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}else if (number == 9)
	{
		if (square9.getChosen() == false)
		{
			// then this spot is not taken
			free = square9.getObjectInfo();
			square9.setChosenAndChosenBy(true, letter);
		} else {
			free = false;
		}
	}	
	return free;
}

/*
 * Function: whoGoesFirst()
 * Purpose: Randomly decide if computer or player
 * goes first
 * 
 * Return: first - either 'computer' or 'player'
 */
function whoGoesFirst() {
	// setting this to player for now.
	var choices = ['player', 'computer'];
	var chosen = choices[Math.floor(Math.random() * choices.length)];

	return chosen;
}

/*
 * Function: startGame()
 * Purpose: driver function
 */
function startGame() {
	debug("In start Game: " + square1.getNumber());
	debug("In start Game (2): " + square2.getNumber());
	// hide the start game button
	showOrHideButton('startGameBtn', 'hide');
	
	// prompt the user to see if he wants to be X or O?
	var player_letter = getPlayerLetter();
	var computer_letter;
	
	// set the computer letter to the opposite of 
	// what the player chose.
	if(player_letter == 'X')
	{
		computer_letter = 'O';
	} else {
		computer_letter = 'X';
	}
	
	// display the information for the player to see on the home page.
	document.getElementById('playerLetter').innerHTML = "You are Player: " + player_letter;
	
	
	// Todo: Randomly choose who goes first
	debug("Choose who goes first");
	var firstPlayer = whoGoesFirst();
	
	// if player goes first, his move.
	if (firstPlayer == 'player'){
		document.getElementById('whosTurn').innerHTML = "Who's Turn: YOUR TURN";
		playersMove(player_letter);
	} else
	{
		document.getElementById('whosTurn').innerHTML = "Who's Turn: COMPUTER TURN";
		debug("Computer's Turn");
		computersMove(computer_letter);
	}
}

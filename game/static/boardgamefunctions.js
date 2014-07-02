/* 
 * Board Configuration Variables
 */
var corners = [1, 3, 7, 9];
var sides = [2, 4, 6, 8];
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

// Keep track of current game information
var win = 'false';
var movesLeft = 10;
var player_letter;
var computer_letter;
var p_moves = [];
var c_moves = [];

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
	if (action == "hide")
	{
		document.getElementById(btnID).classList.add('hide');
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
 * the canvas; Driver function for player's move.
 * 
 */
function playersMove(){
	debug("players move");	
	movesLeft--;
	
	debug("Moves Left: " + movesLeft);
	
	// listen for click on canvas
	var theCanvas = document.getElementById('canvas');		
	canvas.addEventListener('click', on_canvas_click, false);
}

/*
 * Function: removeFromArray()
 * Pupurpose: Removes the selected square number
 * from the array (sides, corners, center) so that
 * we keep track of which squares are still available.
 */
function removeFromArray(number, type) {
	if(type == "corner") {
		corners.splice(corners.indexOf(number), 1);
	} else if(type == "side") {
		sides.splice(sides.indexOf(number), 1);
	} else if (type == 'center') {
		center.splice(center.indexOf(number), 1);
	}
}

/*
 * Function: on_canvas_click()
 * Purpose: Finds out which grid square
 * the player chose + places the 'X' or 'O' on
 * the board. Updates the configuration variables 
 * for keeping track of the player's move.
 */
function on_canvas_click(evt){
	// get the x,y coordinates of the 
	// player's mouse click
	var mousePos = getPosition(canvas, evt);
	
	// find out which Grid spot was chosen.		
	var gridSquare = whichGridSpotChosen(mousePos);		
	debug("Grid chosen: " + gridSquare.number);	
	
	// keep track of what moves the player makes.
	if(p_moves.indexOf(gridSquare.number) == -1){
		p_moves.push(gridSquare.number);	
	}
		
	removeFromArray(gridSquare.number, gridSquare.type);
	
	// update grid so that we keep track of which player took which spot.
	makeChangesInGridTracker(gridSquare.number, player_letter);
	
	// call the isFree() function so that we 
	// configure chosen and chosenBy settings on object.
	isFree(gridSquare.number, player_letter); 	
	
	// place players game piece on center of square.	
	drawLetter(gridSquare.x, gridSquare.y, player_letter);
	
	if(checkForWinner(player_letter) == true)
	{
		alert("YOU WIN!!");
		
	  	var context = canvas.getContext('2d');
	
	  	// Reset canvas & reload page.
  		context.clear();
		
	}
	
	if(win == 'false' && movesLeft == 0)
	{
		alert("TIE!");
		var context = canvas.getContext('2d');
	
	  	// Reset canvas & reload page.
  		context.clear();
		
	}
	
	// Should the computer have another turn?
	if(win == 'false' && movesLeft > 0) {
		// no one has won yet, computer's turn.
		computersMove();
	}		
	
}

/*
 * Function: makeChangesInGridTracker
 * Purpose: edits the winningMoves array to
 * keep track of what player took which spot.
 * 
 * Used later to compare to see if there is a winner
 */
function makeChangesInGridTracker(number, letter) {
	for (var count = 0; count < winningMoves.length; count++)
		{
			debug(winningMoves[count]);
			var index = winningMoves[count].indexOf(number);
			if (index >= 0) {
				winningMoves[count][index] = letter;
			}
		}	
}

/*
 * Function: checkForWinner()
 * Purpose: checks to see if there is a winner.
 * Returns: true if a winner is found.
 */
function checkForWinner(letter) {
	var re;
	
	// define the regular expression that signifies whether
	// we have a winner or not.
	if (letter == 'X'){
		re = /X,X,X/;
	} else
	{
		re = /O,O,O/;	
	}
	
	for (var count = 0; count < winningMoves.length; count++) {
		var str = winningMoves[count].join();
		if(str.match(re) != null ) {
			// we found a winner
			win = true;
			break;			
		}			
	}
	
	return win;
}

/*
 * Function: makeComputerMove()
 * Purpose: Makes computer's final move 
 * Draws the letter on the chosen square.
 * 
 */
function makeComputerMove(squareNum) {
	var result = isFree(squareNum, computer_letter);
			
	drawLetter(result.x, result.y, computer_letter);
	
	c_moves.push(squareNum);
	
	removeFromArray(squareNum, result.type);
	
	makeChangesInGridTracker(squareNum, computer_letter);
}

/* 
 * Function: determineBestMove()
 * Purpose: determines the best move for the computer to take.
 */
function determineBestMove() {
	debug("determineBestMove");
	var takenTurn = false;
	
	// Is there a move the computer can make that will win the game?
	if(c_moves.length >= 2 && takenTurn == false) {
		var re;
		// Define regular expressions for 
		// looking for a win.
		if (computer_letter == 'X')
		{
			var reg1 = /X,\d,X/;
			var reg2 = /\d,X,X/;
			var reg3 = /X,X,\d/;
		} else {
			var reg1 = /O,\d,O/;
			var reg2 = /\d,O,O/;
			var reg3 = /O,O,\d/;
		}
		
		for (var count = 0; count < winningMoves.length; count++) {
			var str = winningMoves[count].join();
			
			if(str.match(reg1) != null || str.match(reg2) != null || str.match(reg3) != null)
			{
				for(var i = 0; i < 3; i++) {
					if(typeof(winningMoves[count][i]) == 'number') {
						makeComputerMove(winningMoves[count][i]);
						takenTurn = true;						
					}
				}		
			} 
		}
	} 
	
	// Is there a move that the player will make that 
	// will cause the computer to lose?
	if(p_moves.length >= 2 && takenTurn == false) {
		// Regular expression that signifies that player will win on next turn.
		// i.e. X, 2, X ==> means player just needs to take square 2 and he wins.
		if (computer_letter == 'O') {
			var reg1 = /X,\d,X/;
			var reg2 = /\d,X,X/;
			var reg3 = /X,X,\d/;
		} else {
			var reg1 = /O,\d,O/;
			var reg2 = /\d,O,O/;
			var reg3 = /O,O,\d/;
		}	
		
		for (var count = 0; count < winningMoves.length; count++)
		{
			var str = winningMoves[count].join();
			
			if(str.match(reg1) != null || str.match(reg2) != null || str.match(reg3) != null)
			{
				for(var i = 0; i < 3; i++) {
					if(typeof(winningMoves[count][i]) == 'number') {
						makeComputerMove(winningMoves[count][i]);
						takenTurn = true;						
					}
				}				
				break;
			}			
		}		
	} 
	
	// Take a random corner space since computer hasn't made any moves yet.
	// Choose a random corner that player did not take.
	if(c_moves.length == 0 && p_moves.length == 1 && takenTurn == false)
	{ 
		var chosenCorner = corners[Math.floor(Math.random() * corners.length)];			
		var result = isFree(chosenCorner, computer_letter);
			
		drawLetter(result.x, result.y, computer_letter);
		takenTurn = true;
		
		// Remove the taken space from the 'corners' array.	
		corners.splice(corners.indexOf(chosenCorner), 1);
			
		// keep track of the computer's moves.
		c_moves.push(chosenCorner);
		
		makeChangesInGridTracker(chosenCorner, computer_letter);
	}
	
	// is there a corner space free?	
	if (corners.length > 0 && takenTurn == false){

		var chosenCorner = corners[Math.floor(Math.random() * corners.length)];				
		makeComputerMove(chosenCorner);
		takenTurn = true;		
	}
	
	// is the center spot available?
	if(corners.length == 0 && center.length > 0 && takenTurn == false) {
		makeComputerMove(center[0]);
		takenTurn = true;
	}
	
	// Is a side space available?
	if(corners.length == 0 && sides.length > 0 && takenTurn == false)
	{
		var side = sides[Math.floor(Math.random() * sides.length)];	
		makeComputerMove(side);
		takenTurn = true;
	}

}

/*
 * Function: clear
 * Purpose: clears the canvas and reloads the page.
 */
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }     
    
    ticTacToeApp();
    location.reload();      
};

/*
 * Function: computersMove()
 * Purpose: Makes the computers move 
 */
function computersMove() {
	debug("computers move.");
	movesLeft--;
	
	determineBestMove();
	
	if(win == 'false' && movesLeft > 0) {
		// no one has won yet, computer's turn.
		playersMove();
	}
		
	// check for win.
	if(checkForWinner(computer_letter) == true) {
		alert("COMPUTER WINS!");
		
		// reset board.
		var canvas = document.getElementById('canvas');
	  	var context = canvas.getContext('2d');
	
	  	// do some drawing
  		context.clear();
	}
	
	if(win == 'false' && movesLeft == 0)
	{
		alert("TIE!");
		
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
	
	  	// Reset canvas & reload page.
  		context.clear();
		
	}
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
			free = {x:0, y:0};
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
	// hide the start game button
	showOrHideButton('startGameBtn', 'hide');
	
	// prompt the user to see if he wants to be X or O?
	player_letter = getPlayerLetter();	
	
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
	var firstPlayer = whoGoesFirst();
	
	// if player goes first, his move.
	if (firstPlayer == 'player'){
		playersMove();
	} else
	{
		computersMove();
	}
}

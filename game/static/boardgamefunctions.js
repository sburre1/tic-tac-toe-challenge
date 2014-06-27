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
 * Function: whichGridSpotChosen()
 * Purpose: Determines which spot the 
 * player chose & configures the gridSquare Obj.
 * to the center (x,y) coordinate location which will
 * be needed when we draw the letter 'X' or 'O' on
 * the board.
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
	debug("whichGridSpotChosen()");
	var gridSquare = {number:0, type:'unknown', x:0, y:0};
	
	// configuration of the drawn grid (vertical lines, horizontal lines)
	var verticalL1 = 133.0;
	var horizontalL1 = 133.0;
	var verticalL2 = 266.0;
	var horizontalL2 = 266.0;
	
	if(mousePos.x < verticalL1 && mousePos.y < horizontalL1){
		gridSquare.number = 1;
		gridSquare.type = "corner";
		gridSquare.x = 45;
		gridSquare.y = 90;		
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y < horizontalL1)
	{
		gridSquare.number = 2;
		gridSquare.type = "side";
		gridSquare.x = 175;
		gridSquare.y = 90;		
	} else if (mousePos.x > verticalL2 && mousePos.y < horizontalL1)
	{
		gridSquare.number = 3;
		gridSquare.type = "corner";
		gridSquare.x = 310;
		gridSquare.y = 90;	
	} else if (mousePos.x < verticalL1 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare.number = 4;
		gridSquare.type = "side";
		gridSquare.x = 45;
		gridSquare.y = 225;	
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare.number = 5;
		gridSquare.type = 'center';
		gridSquare.x = '175';
		gridSquare.y = '225'; 
	} else if (mousePos.x > verticalL2 && mousePos.y > horizontalL1 && mousePos.y < horizontalL2)
	{
		gridSquare.number = 6;
		gridSquare.type = 'side';
		gridSquare.x = '310';
		gridSquare.y = '225'; 
	} else if (mousePos.x < verticalL1 && mousePos.y > horizontalL2)
	{
		gridSquare.number = 7;
		gridSquare.type = 'corner';
		gridSquare.x = '45';
		gridSquare.y = '360'; 
	} else if (mousePos.x > verticalL1 && mousePos.x < verticalL2 && mousePos.y > horizontalL2)
	{
		gridSquare.number = 8;
		gridSquare.type = 'side';
		gridSquare.x = '175';
		gridSquare.y = '360'; 
	} else if (mousePos.x > verticalL2 && mousePos.y > horizontalL2)
	{
		gridSquare.number = 9;
		gridSquare.type = 'corner';
		gridSquare.x = '310';
		gridSquare.y = '360'; 
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
		
		// place players game piece on center of square.
		debug("place players move on board.");		
		drawLetter(gridSquare.x, gridSquare.y, letter);
	}); 	
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
	var player_letter = getPlayerLetter();
	
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
	}


}

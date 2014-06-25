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
 * Function: startGame()
 * Purpose: driver function
 */
function startGame() {
	// hide the start game button
	showOrHideButton('startGameBtn', 'hide');
	
	// prompt the user to see if he wants to be
	// player_x or player_o
	var player_letter = getPlayerLetter();
	debug("Player Letter: " + player_letter);
	document.getElementById('playerLetter').innerHTML = "You are Player: " + player_letter;
}

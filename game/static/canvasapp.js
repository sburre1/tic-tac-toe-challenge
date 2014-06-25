window.addEventListener("load", eventWindowLoaded, false);

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

function eventWindowLoaded() {
	ticTacToeApp();
}

/*
 * Function: canvasSupport()
 * Purpose: Used to test whether Canvas is supported in web browsers
 * Reference: http://modernizr.com/
 */
function canvasSupport() {
	return Modernizr.canvas;
}

/*
 * Function: ticTacToeApp()
 * Purpose: contains all the functions and related variables
 * for creating the tic-tac-toe board grid.
 */
function ticTacToeApp() {
	if(!canvasSupport()) {
		return;
	} else {
		var gameCanvas = document.getElementById("canvas");
		var context = gameCanvas.getContext("2d");
	}
	
	drawGameBoard();
	
	/*
	 * Function: drawGameBoard()
	 * Purpose: draw the tic-tac-toe board grid
	 */	
	 function drawGameBoard(){
	 	// create the background
	 	context.fillStyle = '#aaaaaa';
	 	context.fillRect(0,0, 400, 400);
	 	
	 	// create vertical lines
	 	drawLine(133, 400, 'vertical');
	 	drawLine(266, 400, 'vertical');
	 	
	 	// create horizontal lines
	 	drawLine(133, 400, 'horizontal');
	 	drawLine(266, 400, 'horizontal');
	 }
	 
	 /*
	  * Function: drawLine() 
	  * Purpose: draw the horizontal and vertical lines
	  * on the board game grid
	  * Parameters:
	  * position - Where on the grid to draw the line
	  * length - how long to draw the line
	  * lineType - either vertical or horizontal
	  *  
	  */
	 function drawLine(position, length, lineType) {
	 	context.strokeStyle = '#000000';
	 	context.lineWidth = 2;
	 	context.lineCap = 'square';
	 	context.beginPath();
	 	
	 	if(lineType == 'vertical') {
	 		context.moveTo(position, 0);
	 		context.lineTo(position, length);
	 	} else { 
	 		// lineType is horizontal
	 		context.moveTo(0, position);
	 		context.lineTo(length, position);
	 	}
	 	context.stroke();
	 	context.closePath();
	 }
}

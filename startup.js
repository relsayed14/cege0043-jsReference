// code to process the html files 
function loadW3HTML(){
	w3.includeHTML();
}

//wait for document to load, then start tracking user
function startup() {
	document.addEventListener('DOMContentLoaded', function() {
		trackAndCircle();
	}, false);
}

function questionStartup() {
	alert("Welcome to the Questions App!");
	document.addEventListener('DOMContentLoaded', function() {
		// console.log('before port.')
		getPort(); // obtain port number 
		// console.log('before loading html.')
		loadW3HTML(); // add HTML functionality
		// console.log('startup function on.')
		// getLocation(); // track the user's location
	},false);
}

function quizStartup() {
	alert("Welcome to the Quiz App!");
	document.addEventListener('DOMContentLoaded', function() {
		getPort(); // obtain port number 
		loadW3HTML(); // add HTML functionality
		trackLocation(); // track the user's location
		setTimeout(function(){ loadQuizPoints(true); getAllAnswers(); }, 1000);  // to make sure that the port number is obtained before loading the quiz points

	},false);
}
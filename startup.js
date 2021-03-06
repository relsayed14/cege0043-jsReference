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
	getPort(); // obtain port number 
	document.addEventListener('DOMContentLoaded', function() {
		
		loadW3HTML(); // add HTML functionality
	},false);
}

function quizStartup() {
	alert("Welcome to the Quiz App!");
	getPort(); // obtain port number 
	setTimeout(function(){ 
			getAllAnswers(function (){
				// function to execute after getAllAnswers has been executed
				parseAllAnswers();
		       loadQuizPoints(true);

			}); 
			
	}, 1000); // to make sure that the port number is obtained before loading the answers
	setTimeout(function(){ 
			// loadQuizPoints(true);
			trackLocation(); // track the user's location
	 }, 2000); // to make sure that the port number is obtained before loading the quiz points

}

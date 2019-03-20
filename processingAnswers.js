var allAnswers;


// function to get all answers that user has already answered
function currentUserAnsweredQs () {

}

// upload user answers to the database
function getAllAnswers() {
	quizClient = new XMLHttpRequest();
	
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/allAnswers"; //get url with non-hardcoded port number
	quizClient.open("GET", url);
	quizClient.onreadystatechange = printAllAnswers;
	try {
		quizClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}

	quizClient.send();
}



function printAllAnswers(){
if (quizClient.readyState == 4) {
		allAnswers = JSON.parse(quizClient.responseText);
	}
}	
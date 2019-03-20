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
		allAnswers = JSON.parse(quizClient.responseText).rows;
		console.log(allAnswers);
	}
}	


// to check if user has already answered the question
function checkRepeatQuestion(question_id){
	for(var i = 0 ; i < allAnswers.length ; i++){
		// if the port id has been found on the database on the same question
		if(allAnswers[i].question_id == question_id && allAnswers[i].port_id == httpPortNumber){
			// display the chosen and the correct answers to the user
			return {'answer_selected': allAnswers[i].answer_selected, 'correct_answer': allAnswers[i].correct_answer};
		}
	}
	return -1; //flag to detect if question has not been solved 
}










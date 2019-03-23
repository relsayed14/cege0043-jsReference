var allAnswers;
var isAnswered = {}; // object to check if a question is answered correctly
var quizClient;
// upload user answers to the database
function getAllAnswers(readyFunction) {
	quizClient = new XMLHttpRequest();
	
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/allAnswers"; //get url with non-hardcoded port number
	quizClient.open("GET", url);
	quizClient.onreadystatechange = readyFunction;
	try {
		quizClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}

	quizClient.send();
}



function parseAllAnswers(){
if (quizClient.readyState == 4) {
		allAnswers = JSON.parse(quizClient.responseText).rows;
		for(var i = 0 ; i < allAnswers.length ; i++){
			if(allAnswers[i].port_id == httpPortNumber && allAnswers[i].question_id){
				isAnswered[allAnswers[i].question_id] = true;
			}
		}
		console.log(isAnswered);
		return true;
	}
	return false;

}	








// global variable to hold the request
var client;

var postString;

// uploading the answers
function uploadQuestion() {
	// extract question title
	try {

	var question_title = document.getElementById("question_title").value;
	postString = "question_title=" + question_title;

	// extract question text
	var question_text = document.getElementById("question_text").value;
	postString = postString + "&question_text=" + question_text;

	// extract answer choices
	var answer_1 = document.getElementById("answer_1").value;
	postString = postString + "&answer_1=" + answer_1;

	var answer_2 = document.getElementById("answer_2").value;
	postString = postString + "&answer_2=" + answer_2; 

	var answer_3 = document.getElementById("answer_3").value;
	postString = postString + "&answer_3=" + answer_3;

	var answer_4 = document.getElementById("answer_4").value;
	postString = postString + "&answer_4=" + answer_4;

	// check if any of the above fields has not been entered (in case the browser does not work with 'required')
	if(question_title.trim() == "" || question_text.trim() ==  "" || answer_1.trim() == "" ||  answer_2.trim() ==  "" || answer_3.trim() ==  "" || answer_4.trim() ==  "") {
		return;
	}

	// extract correct answer
	var correct_answer = document.getElementById("correct_answer").value;
	// to validate the input for the correct choice - must be either 1,2,3 or 4
	if (correct_answer != '1' && correct_answer != '2' && correct_answer != '3' && correct_answer != '4') {
		alert("Invalid choice number, Please enter a number between 1 and 4.");
		return;
	}
	postString = postString + "&correct_answer=" + correct_answer;

	var pointLat = sessionStorage.getItem("quizPointLat");
	var pointLng = sessionStorage.getItem("quizPointLng");


	console.log("PNT", pointLat + " " + pointLng);
	postString = postString + "&latitude=" + pointLat + "&longitude=" + pointLng;


	// close the popup automatically
	mymap.closePopup();
	processQuestion(postString);
}
	// code adopted from https://www.w3schools.com/js/js_errors.asp
	catch (err) {
		alert(err);
	}

}


//function to make a request
function processQuestion(postString) {
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
	client.open('POST', url, true);
	//notify the server of the data type
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = questionUploaded;
	client.send(postString);
}

//create the code to wait for the response from the data server
//and process the response once received
function questionUploaded() {
	//this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// change the DIV to show the response
		alert(client.responseText);
		loadQuestionPoints();
	}
}
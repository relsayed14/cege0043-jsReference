// global variable to process AJAX request to obtain quiz points stored in database
var client; 
var quizPoints;

// global variable to hold quiz points set by Questions App - should be added and/ or removed as desired
var quizlayer; 
var showAnswers = false;

// AJAX request function to load quizpoints onto the map
function loadQuizPoints(showAnswer){
	showAnswers = showAnswer;
	client = new XMLHttpRequest();

	// parameters needed to send request to server
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getQuizPoints/" + httpPortNumber; 
	
	//send GET request to server
	client.open("GET", url, true); 
	// notify server of content type
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.onreadystatechange = processQuizPoints; // once request is received by server
	client.send();
}

// AJAX response function to process the quiz points
function processQuizPoints(){
	if (client.readyState < 4){
		console.log('Processing quiz points...');
	}
	// if response has been successfully received by server
	else if (client.readyState == 4) { 
		// if successful
		if (client.status > 199 && client.status < 300) {
			quizPoints = client.responseText;
			console.log(quizPoints);
			
			if(showAnswers){
			loadQuizLayer(quizPoints);
			}else{
		 	loadQuizLayerNoAnswer(quizPoints);

			}
		}
	}
}


function loadQuizLayerNoAnswer(quizPoints){
// convert from text xformat to JSON
var quizPointsJSON = JSON.parse(quizPoints);
console.log('now in loadQuizLayer');
	// load geoJSON quiz points layer using custom markers
	quizlayer = L.geoJSON(quizPointsJSON,
	{
		// use pointToLayer to create the marker
		pointToLayer: function(feature, latlng){
			// when clicked user can choose a quiz point to solve (quiz in an html div)
			// code to take values of the quesiton_title, question_text, choice_1, choice_2, choice_3, choice_4
			// also includes the answer here but hidden

			console.log("at the top ofpoint to layer now.")

			var popupQuizString = "<DIV id='quizPopup'" + feature.properties.id + "><h2>" + feature.properties.question_title + "</h2>";
			popupQuizString = popupQuizString + "<p>" + feature.properties.question_text + "</p>";
			popupQuizString = popupQuizString + "1. "+ feature.properties.answer_1 + "<br>";
			popupQuizString = popupQuizString + "2. " + feature.properties.answer_2 + "<br>";
			popupQuizString = popupQuizString + "3. " + feature.properties.answer_3 + "<br>";
			popupQuizString = popupQuizString + "4. " + feature.properties.answer_4 + "<br><br />";

			return L.marker(latlng, {icon: pinkMarker}).bindPopup(popupQuizString);
		}					
	}).addTo(mymap);

	// change the map zoom so that all the data is shown
	mymap.fitBounds(quizlayer.getBounds());

}


// convert the received quiz points (in text format) into JSON format and add it to the map
function loadQuizLayer(quizPoints){
	// convert from text xformat to JSON
	var quizPointsJSON = JSON.parse(quizPoints);
	console.log('now in loadQuizLayer');
	// load geoJSON quiz points layer using custom markers
	quizlayer = L.geoJSON(quizPointsJSON,
	{
		// use pointToLayer to create the marker
		pointToLayer: function(feature, latlng){
			// when clicked user can choose a quiz point to solve (quiz in an html div)
			// code to take values of the quesiton_title, question_text, choice_1, choice_2, choice_3, choice_4
			// also includes the answer here but hidden

			console.log("at the top of point to layer now.")

			var popupQuizString = "<DIV id='quizPopup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5>";
			popupQuizString = popupQuizString + "<p>" + feature.properties.question_text + "</p>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 1'/>" + feature.properties.answer_1 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 2'/>" + feature.properties.answer_2 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 3'/>" + feature.properties.answer_3 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 4'/>" + feature.properties.answer_4 + "<br><br />";
			popupQuizString = popupQuizString + "<button onclick='dummyFunction(); return false;'> Submit Answer</button>";

			// popupQuizString = popupQuizString + "<button onclick='compareAnswer(" + feature.properties.id + "); return false;'> Submit Answer</button>";
			
			// add the answer as a hidden div
			// code adopted from https://stackoverflow.com/questions/1992114/how-do-you-create-a-hidden-div-that-doesnt-create-a-line-break-or-horizontal-sp
			popupQuizString = popupQuizString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>" + "</div>";

			return L.marker(latlng, {icon: pinkMarker}).bindPopup(popupQuizString);
		}					
	}).addTo(mymap);

	// change the map zoom so that all the data is shown
	mymap.fitBounds(quizlayer.getBounds());
}
	// dummy function to see if quiz submit button is working
	function dummyFunction(){
		alert("Button working!")
	}

	// the function that the submit button calls
	// this function compares the answer the user input to that selected by the Questions App user
	// To do so, will need to compare to the hidden answer div
	function compareAnswer(question_id) {
		var hiddenAnswer = document.getElementById("answer" + question_id).innerHTML;
		var correct_answer = false;
		var chosenAnswer = 0;
		
		// code to go through the possible (4) choices to get what the user selected
		var postString = "&question_id" + question_id;

		for(var i=1; i<5; i++) {
			// if it is the first choice, then the user answer is 1
			if(document.getElementById(question_id + " " + i).checked) {
				userAnswer = 1;
				postString = postString + "&answer_selected=" + i;
			}
			// if the answer is correct (i.e. equal to the hidden answer)
			if ((document.getElementById(question_id + " " + i).checked) && i == hiddenAnswer){
				alert("Good job! You have selected the correct answer.");
				// this means that this is the correct answer, therefore the layer should load the marker as being correct
				correct_answer = true;

				quizlayer.eachLayer(function(layer) {
					if(layer.feature.properties.id == question_id) {
						// use the green marker to denote a correct answer
						return L.marker([layer.getLatLng().lat, layer.getLatLng().lng], {icon: greenMarker}).addTo(mymap);
					}
				})

				postString = postString + "&correct_answer=" + i;
				
			}
		}

			// what to do is answer is incorrect - tell user and show the hidden answer div
			if (correct_answer === false) {
				alert("Sorry! This is incorrect.");
				quizlayer.eachLayer(function(layer) {
					if(layer.feature.properties.id == question_id) {
						// use black markers to denote incorrrect answers for quiz points
						return L.marker([layer.getLatLng().lat, layer.getLatLng().lng], {icon: blackMarker}).addTo(mymap);
					}
				})
			}
			// close the popup after loading the messages
			// code adopted from https://stackoverflow.com/questions/20816173/close-all-popups-with-leaflet-js
			mymap.closePopup();
			// upload the answer to the database 
			uploadAnswer(postString); 
		}

// create custom pink marker
var pinkMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});

// create custom green marker to denote questions anwered correctly
var greenMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'green'
});

// create custom black marker to denote questions anwered incorrectly
var greenMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'black'
});

// globl variable to process AJAX request
var clientQuiz; 

// upload user answers to the database
function uploadAnswer(postString) {
	quizClient = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/uploadAnswer"; //get url with non-hardcoded port number
	//var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/reflectData";
	quizClient.open("POST", url, true); // send to server
	quizClient.onreadystatechange = answerUploaded;
	try {
		quizClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	quizClient.send(postString);
}




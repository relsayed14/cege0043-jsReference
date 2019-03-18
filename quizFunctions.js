// global variable to process AJAX request to obtain quiz points stored in database
var client; 

// global variable to hold quiz points set by Questions App - should be added and/ or removed as desired
var Quizlayer; 

// AJAX request function to load quizpoints onto the map
function loadQuizPoints(){
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
			var quizPoints = client.responseText;
			loadQuizLayer(quizPoints);
		}
	}
}

// convert the received quiz points (in text format) into JSON format and add it to the map
function loadQuizLayer(quizPoints){
	// convert from text format to JSON
	var quizPointsJSON = JSON.parse(quizPoints);
			
	// load geoJSON quiz points layer using custom markers
	Quizlayer = L.geoJSON(quizPointsJSON,
	{
		// use pointToLayer to create the marker
		pointToLayer: function(feature, latlng){
			// when clicked user can choose a quiz point to solve (quiz in an html div)
			// code to take values of the quesiton_title, question_text, choice_1, choice_2, choice_3, choice_4
			// also includes the answer here but hidden

			var popupQuizString = "<DIV id='quizPopup'" + feature.properties.id + "><h2>" + feature.properties.question_title + "</h2>";
			popupQuizString = popupQuizString + "<p>" + feature.properties.question_text + "</p>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 1'/>" + feature.properties.answer_1 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 2'/>" + feature.properties.answer_2 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 3'/>" + feature.properties.answer_3 + "<br>";
			popupQuizString = popupQuizString + "<input type='radio' name='answer' id='" + feature.properties.id + " 4'/>" + feature.properties.answer_4 + "<br><br />";
			popupQuizString = popupQuizString + "<button onclick='dummyFunction(); return false;'> Submit Answer</button>";

			// popupQuizString = popupQuizString + "<button onclick='checkAnswer(" + feature.properties.id + "); return false;'> Submit Answer</button>";
			
			// add the answer as a hidden div
			popupQuizString = popupQuizString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>" + "</div>";
				
			return L.marker(latlng, {icon: pinkMarker}).bindPopup(popupQuizString);
			}					
	}).addTo(mymap);
			
	// change the map zoom so that all the data is shown
	mymap.fitBounds(Quizlayer.getBounds());
}
	// dummy function to see if quiz submit button is working
	function dummyFunction(){
		alert("Button working!")
	}
// create custom pink marker
var pinkMarker = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});

// Add code here to code whether the answer is equal to the correct_answer

var xhrWeeklyQuestions; // define global variable to process AJAX request to get the questions added in the last week
var weeklyQuestionsLayer; // global variable to hold latest quiz points layers for later use

// AJAX request function to load latest questions
function getWeeklyQuestions(){
	xhrWeeklyQuestions = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getWeeklyQuestions/" + httpPortNumber; //get url with non-hardcoded port number
	xhrWeeklyQuestions.open("GET", url, true); // send to server
	xhrWeeklyQuestions.onreadystatechange = processLatestQns;
	try {
		xhrLatestQns.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrLatestQns.send();
}

// AJAX response function
function processWeeklyQuestions(){
	if (xhrWeeklyQuestions.readState < 4){
		console.log('Loading questions created this week ...');
	}
	else if (xhrWeeklyQuestions.readyState === 4) { // 4 = response from server completely loaded
		if (xhrWeeklyQuestions.status > 199 && xhrWeeklyQuestions.status < 300) {
			var weeklyQuestions = xhrWeeklyQuestions.responseText;
			loadWeeklyQuestionsLayer(weeklyQuestions);
		}
	}
}

// convert the received quiz points (which is text) into JSON format and add it to the map
function loadWeeklyQuestionsLayer (weeklyQuestions){
	// convert text to JSON
	var weeklyQuestionsJSON = JSON.parse(weeklyQuestions);
	alert("Adding all the questions added in the last week by all users.");
			
	// load geoJSON quiz points layer using custom markers
	weeklyQuestionsLayer = L.geoJSON(weeklyQuestionsJSON,
	{
		// use point to layer to create the blue points
		pointToLayer: function(feature, latlng){
			// in this case, build an HTML DIV string using values in the data
			var weeklyQuestString = "<DIV id='weeklyQuizPopup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5>";
			weeklyQuestString = weeklyQuestString + "<p>" + feature.properties.question_text + "</p>";
			weeklyQuestString = weeklyQuestString + "1." + feature.properties.answer_1 + "<br>";
			weeklyQuestString = weeklyQuestString + "2. " + feature.properties.answer_2 + "<br>";
			weeklyQuestString = weeklyQuestString + "3. " + feature.properties.answer_3 + "<br>";
			weeklyQuestString = weeklyQuestString + "4. " + feature.properties.answer_3 + "<br>";
			
			// add the answer as a hidden div
    		// code adopted from https://stackoverflow.com/questions/1992114/how-do-you-create-a-hidden-div-that-doesnt-create-a-line-break-or-horizontal-sp
			weeklyQuestString = weeklyQuestString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div> + </div>";
	
			markers[feature.properties.id] = L.marker(latlng, {icon: yellowMarker }).bindPopup(popupQuestString);
    		return markers[feature.properties.id];
			}					
	}).addTo(mymap);
			
	// change the map zoom to show all points
	mymap.fitBounds(weeklyQuestionsLayer.getBounds());
}


// create custom yellow marker
var yellowMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'yellow'
});

function removeWeeklyQuestions(){
	alert("Removing all the questions added in the last week by all users.");
	mymap.removeLayer(weeklyQuestionsLayer);
}


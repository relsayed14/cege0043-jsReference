 // create a custom popup
 var popup = L.popup();
 var initpopup = false;
 var questionDiv;


// global variable to process AJAX request to obtain quiz points stored in database
var questionClient; 
var questionPointsJSON; 


var markers = {}; // array to hold the markers currently on the map

// global variable to hold quiz points set by Questions App - should be added and/ or removed as desired
var questionlayer; 


//create an event detector to wait for the user's click event and then use the popup to show them where 
// they clicked
function onMapClick(e) {

    if (e.latlng) {

        sessionStorage.setItem("quizPointLat", e.latlng.lat);
        sessionStorage.setItem("quizPointLng", e.latlng.lng);

        popup.setLatLng(e.latlng);
        if(!initpopup){
        	initpopup = true;
        	questionDiv = document.getElementById('questionDiv');
        	questionDiv.style.display='block';
        	popup.setContent(questionDiv);
        }else{
        	questionDiv.getElementsByClassName('questionform')[0].reset();
        }
        popup.openOn(mymap);
        
    } 
}

// now add the click event detector to the map
mymap.on('click', onMapClick);


/******************************************************************************************************/

// AJAX request function to load quizpoints onto the map
function loadQuestionPoints(){
    questionClient = new XMLHttpRequest();

    // parameters needed to send request to server
    var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getQuizPoints/" + httpPortNumber; 
    
    //send GET request to server
    questionClient.open("GET", url, true); 
    // notify server of content type
    questionClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    questionClient.onreadystatechange = processQuestionPoints; // once request is received by server
    questionClient.send();
}

// AJAX response function to process the quiz points
function processQuestionPoints(){
    if (questionClient.readyState < 4){
        console.log('Processing question points...');
    }
    // if response has been successfully received by server
    else if (questionClient.readyState == 4) { 
        // if successful
        if (questionClient.status > 199 && questionClient.status < 300) {
            var questionPoints = questionClient.responseText;
            console.log(questionPoints);

            loadQuestionsLayer(questionPoints);

        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////

// only used in Questions App
function loadQuestionsLayer(questionPoints){
// convert from text xformat to JSON
questionPointsJSON = JSON.parse(questionPoints);
console.log('now in loadQuestionsLayer');
    // load geoJSON quiz points layer using custom markers
    questionlayer = L.geoJSON(questionPointsJSON,
    {
        // use pointToLayer to create the marker
        pointToLayer: function(feature, latlng){
            // when clicked user can choose a quiz point to solve (quiz in an html div)
            // code to take values of the quesiton_title, question_text, choice_1, choice_2, choice_3, choice_4
            // also includes the answer here but hidden

            return viewQuestionMarker(feature, latlng);
        }                   
    }).addTo(mymap);

    // change the map zoom so that all the data is shown
    mymap.fitBounds(questionlayer.getBounds());

}


// marker for the question-maker's popup
function viewQuestionMarker(feature, latlng){
    var popupQuestString = "<DIV id='quizPopup'" + feature.properties.id + "><h5>" + feature.properties.question_title + "</h5>";
    popupQuestString = popupQuestString + "<p>" + feature.properties.question_text + "</p>";
    popupQuestString = popupQuestString + "1. "+ feature.properties.answer_1 + "<br>";
    popupQuestString = popupQuestString + "2. " + feature.properties.answer_2 + "<br>";
    popupQuestString = popupQuestString + "3. " + feature.properties.answer_3 + "<br>";
    popupQuestString = popupQuestString + "4. " + feature.properties.answer_4 + "<br>";


    // add the answer as a hidden div
    // code adopted from https://stackoverflow.com/questions/1992114/how-do-you-create-a-hidden-div-that-doesnt-create-a-line-break-or-horizontal-sp
    popupQuestString = popupQuestString + "<div id=answers" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>" + "</div>";


    markers[feature.properties.id] = L.marker(latlng, {icon: pinkMarker }).bindPopup(popupQuestString);

    return markers[feature.properties.id];
        }



// create custom pink marker
var pinkMarker = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

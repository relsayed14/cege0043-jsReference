function addPointLinePoly(){
	alert("This will add a point, line and polygon.");
	
	// add a point
	L.marker([51.524048, -0.139924]).addTo(mymap)
	.bindPopup("<b>This is the Warren Street point.").openPopup();
			
	// add a line
	var myLine = [
    [51.5, -0.07],
    [51.51, -0.08]
	];
	L.polyline(myLine,{color:'green'})
	.addTo(mymap).bindPopup("I am a line.");
	
	// add a circle
	L.circle([51.508, -0.11], 500,{
		color:'red',
		fillColor:'#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");
			
	// add a polygon with 3 end points (i.e. a triangle)
	var myPolygon = L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51,-0.047]
	],{
		color:'red',
		fillColor:'#f03',
		fillOpacity:0.5
	}).addTo(mymap).bindPopup("I am a polygon.");
}




/// EXTRA CODE FROM PRACTICALS ///

/* var client;
var earthquakes;

// create the code to get the Earthquakes data using an XMLHttpRequest
function getEarthquakes(){
	alert("This will get all the earthquakes.");
	client = new XMLHttpRequest();
	client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
	client.onreadystatechange = earthquakeResponse;
	client.send()
}

// create the code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse(){
	// this function listens out for the server to say that the data is ready (i.e. has state 4)
	if (client.readyState == 4) {
		//once daata is ready, process the data
		var earthquakedata = client.responseText;
		loadEarthquakelayer(earthquakedata);
	}
}

// define a global variable to hold the layer so we can use it later on
var earthquakelayer;
		
// convert the received data (which is text) into JSON format and add it to the map
function loadEarthquakelayer(earthquakedata){
	// convert text to JSON
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakes = earthquakejson;
			
	// load geoJSON earthquake layer using custom markers
	earthquakelayer = L.geoJSON(earthquakejson,
	{
		// use point to layer to create the points
		pointToLayer: function(feature, latlng){
			// look at properties of GeoJSON file to see EQ magnitude and use different marker depending on magnitude
			if (feature.properties.mag > 1.75){
				return L.marker(latlng, {icon: redMarker}).bindPopup("<b>"+
				feature.properties.place+"</b>");
			}
					
			else { 
			return L.marker(latlng, {icon: pinkMarker}).bindPopup("<b>"+
				feature.properties.place+"</b>");
			}
		},					
	}).addTo(mymap);
			
	// change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds());
}
 */
/* var xhrFormData; // define global variable to process AJAX request to get formdata
//var allForms;
var formDataLayer; // global variable to hold formdata for later use

// AJAX request function to load formdata
function startFormDataLoad(){
	xhrFormData = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getFormData/" + httpPortNumber; //get url with non-hardcoded port number
	xhrFormData.open("GET", url, true); // send to server
	xhrFormData.onreadystatechange = processFormData;
	try {
		xhrFormData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrFormData.send();
}

// AJAX request function to load London POI data
function getPOIData(){
	xhrFormData = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getGeoJSON/london_poi/geom"; //get url with non-hardcoded port number
	xhrFormData.open("GET", url, true); // send to server
	xhrFormData.onreadystatechange = processFormData;
	try {
		xhrFormData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrFormData.send();
}

// AJAX request function to load London highways data
function getHighwaysData(){
	xhrFormData = new XMLHttpRequest();
	var url = "http://developer.cege.ucl.ac.uk:" + httpPortNumber + "/getGeoJSON/london_highway/geom"; //get url with non-hardcoded port number
	xhrFormData.open("GET", url, true); // send to server
	xhrFormData.onreadystatechange = processFormData;
	try {
		xhrFormData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
		// this only works in internet explorer
	}
	xhrFormData.send();
}

// AJAX response function
function processFormData(){
	if (xhrFormData.readState < 4){
		console.log('Loading...');
	}
	else if (xhrFormData.readyState === 4) { // 4 = response from server completely loaded
		if (xhrFormData.status > 199 && xhrFormData.status < 300) {
			var formData = xhrFormData.responseText;
			loadFormDataLayer(formData);
		}
	}
}

// convert the received data (which is text) into JSON format and add it to the map
function loadFormDataLayer(formData){
	// convert text to JSON
	var formdatajson = JSON.parse(formData);
	//allForms = formdatajson;
			
	// load geoJSON earthquake layer using custom markers
	formDataLayer = L.geoJSON(formdatajson,
	{
		// use point to layer to create the red points
		pointToLayer: function(feature, latlng){
			// in this case, build an HTML DIV string using values in the data
			var htmlString = "<DIV id='popup'" + feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>";
			htmlString = htmlString + "<h3>" + feature.properties.question_text + "</h3><br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 1'/>" + feature.properties.answer_1 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 2'/>" + feature.properties.answer_2 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 3'/>" + feature.properties.answer_3 + "<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + " 4'/>" + feature.properties.answer_4 + "<br>";
			htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + "); return false;'> Submit Answer</button>";
			
			// include hidden element with the answer (in this case answer in the first choice
			// use feature.properties.correct answer for the assignment
			htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
			htmlString = htmlString + "</div>";
			
			return L.marker(latlng, {icon: BlueMarker}).bindPopup(htmlString);
			}					
	}).addTo(mymap);
			
	// change the map zoom so that all the data is shown
	mymap.fitBounds(formDataLayer.getBounds());
	closestFormPoint(); // get popup for closest point in formDataLayer
}
 */
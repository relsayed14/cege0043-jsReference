// code to get the Earthquakes data using an XMLHttpRequest
var client;
var earthquakes;
var busstops;
var mymap;

var earthquakelayer;
var busstoplayer;



// create the code to get the data using the XMLHttpRequest
   	function getData(layername) {
   		client = new XMLHttpRequest();

   		// dependig on the layer name, we get different URLs
   			var url;

        // this should bbe -- if (layername == quizlayer) { ADD WHERE THE QUIZPOINTS GEOJSON FILE IS!! } - how??!!
   			if (layername == "earthquakes") {
   				url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
   			} 
   			if (layername == "busstops") {
   				url = "https://developer.cege.ucl.ac.uk:31072/rev-week2/busstops.geojson"
   			}

   			client.open('GET', url);
   			client.onreadystatechange = dataResponse;
   			client.send();
		}

// code to wait for the response from dta server, and process the response once received
   		function dataResponse() {
   			// this function listens out for the server to say that the data is ready - i.e. has state 4
   			if(client.readyState == 4) {
   				// once data is ready, process the data
   				var geoJSONData = client.responseText;
   				loadLayer(geoJSONData);
   			}
   		}

 //convert the received data from text to JSON format and add to the map
  function loadLayer(geoJSONData) {
   	//which layer did we actually load?
   	if(geoJSONData.indexOf("earthquake") > 0) {
   		var loadingEarthquakes = true;
   	}
   	if (geoJSONData.indexOf("IIT_METHOD") >0) {
   		var loadingBusstops = true;
   	}

   	//convert text to JSON
   	var json = JSON.parse(geoJSONData);

   	// add the JSON Layer onto the map
   	if(loadingEarthquakes === true) {
   		earthquakelayer = L.geoJson(json,  {
		//use point to layer to create the points
		pointToLayer: function(feature,latlng)
		{
			//look at the GeoJSON file - specifically at the properties,to see the earthquake magnitude and use a different marker depending on this value
			// also incldue a pop up that shows the place value of the earthquakes
			if(feature.properties.mag > 1.75) {
				return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+ feature.properties.place + "</b>");
			} else {
				// if mag =< 1.75
				return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+ feature.properties.place + "</b>");

			}
				},
			}).addTo(mymap);
   		mymap.fitBounds(earthquakelayer.getBounds());
   	}
		if(loadingBusstops === true) {
   			busstoplayer = L.geoJson(json).addTo(mymap);
   			mymap.fitBounds(busstoplayer.getBounds());
   		}
   	}

// convert the received data (text) to JSON format 
// add it to the map
//function loadGeoJSONLayer(earthquakedata) {
    // convert the text to JSON
  //  var earthquakejson = JSON.parse(earthquakedata);
    // earthquakes = earthquakejson;

    // add the JSON layer onto the map - it will appear using the default icons
   // geojsonLayer = L.geoJson(earthquakejson, {
		//use point to layer to create the points
	//	pointToLayer: function(feature,latlng)
	//	{
			//look at the GeoJSON file - specifically at the properties,to see the earthquake magnitude and use a different marker depending on this value
			// also incldue a pop up that shows the place value of the earthquakes
	//		if(feature.properties.mag > 1.75) {
	//			return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+ feature.properties.place + "</b>");
	//		} else {
				// if mag =< 1.75
	//			return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+ feature.properties.place + "</b>");

	//		}
	//			},
	//		}).addTo(mymap);

    // change the map zoom so that all the data is shown
   // mymap.fitBounds(geojsonLayer.getBounds());
//

// Code to run when load Data button is clicked
 		function loadEarthquakeData() {
			// shows an alert message - so that we know something is happening
			alert("Loading Earthquakes");
			layername = "earthquakes";
			getData(layername);

 			}

   	// Code to run when remove Data button is clicked
		function removeEarthquakeData() {
   		 	alert("Earthquake data will be removed");
   		 	mymap.removeLayer(earthquakelayer);
   		 }


   	// Code to run to add bus stops layer - using button
   	function loadBusstopsLayer() {
   			alert("Loading bus stops");
   			layername = "busstops";
   			getData(layername);
   		}


       // Code to run to remove bus stops layer - using button
   	function removeBusstopsLayer() {
   			alert("Removing bus stops");
   			mymap.removeLayer(busstoplayer);
   		} 


// Adding custom red maker
var testMarkerRed = L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'red'
});

// Adding custom pink marker
var testMarkerPink = L.AwesomeMarkers.icon({
	icon:'play',
	markerColor:'pink'
});

// Code to run when remove Data button is clicked
function removeEarthquakeData() {
   	alert("Earthquake data will be removed");
   	mymap.removeLayer(earthquakelayer);
 }


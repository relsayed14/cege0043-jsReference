var latitude;
var longitude;

//create a custom popup
var popup = L.popup();

// Code to obtain latitude and longitude of point on the map that the user clicked
//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
function onMapClick(e) {
	popup.setLatLng(e.latlng);
	// var latlngString =  e.latlng.toString();
	// An example of the current latlngString is LatLng(latitude_here, longitude_here)
	// therefore, will need to take only the part after the first 7 characters until the character before the last )
	// therefore, will need to split longitude and latitude by the "," to differentiate between them  
	
	// method adopted from https://www.w3schools.com/jsref/jsref_substr.asp 
	latlngString = latlngString.substr(7, latlngString.length-1);

	// method adopted from https://www.w3schools.com/jsref/jsref_split.asp
	latitude = latlngString.split(",")[0];
	alert("latitude: " + latitude);

	longitude = latlngString.split(",")[1];
	alert("longitude: " + longitude);

	popup
		.setContent("Chosen latitude: " + latitude + "</br> Chosen longitude: " + longitude);
		.openOn(mymap);

}
    // adding the click event detector to the map
    mymap.on('click',onMapClick);

// code to obtain data input by user (values), concatenate them in a strong
function uploadQuestions() {
	// include ways to handle errors here - after doing basic codes
	
	// values for chosen coordinates
	var postString = "latitude=" + latitude + "&longitude=" + longitude;

}







// global variable to hold the request
var client;
//function to make a request
function processData(postString) {
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + httpPortNumber;
	var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadData";
	client.open('POST',url,true);
	//notify the server of the data type
	client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
}

//create the code to wait for the response from the data server
//and process the response once received
function dataUploaded() {
	//this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
	}
}
// uploading the answers
function startDataUpload () {
	//extract form values (response values)
	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
	var module = document.getElementById("module").value;
	var postString = "name="+name +"&surname="+surname+"&module="+module;
	alert (postString);

	// now get the checkbox values - separate them with a | so that they 
	// can be split later if necessary
	var checkString = "";
	for (var i = 1; i<5; i++) {
		// check if a check exists 
		if (document.getElementById("check" + i).checked === true) {
			// if checked, add the value of it then || to separate each one
			checkString = checkString + document.getElementById("check" +i).value + " || "
		}
	}
	// add it to the string
	postString = postString + "&moduleTitleList="+checkString;

	// now get the radio button values
	if(document.getElementById("morning").checked) {
		// if morning is checked, angdd it to the string
		postString = postString + "&lectureTime=morning";
	}
	if(document.getElementById("afternoon").checked) {
		// if afternoon is checked, angdd it to the string
		postString = postString + "&lectureTime=afternoon";
	}

	//now get the select box values
	var language = document.getElementById("languageselectbox").value;
	postString = postString + "&language=" +language;

	//now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" +longitude;

	//process the string
	processData(postString);
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
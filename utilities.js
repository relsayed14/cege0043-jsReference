	//define global variables to store port numbers

window.httpPortNumber=0;
window.httpsPortNumber=0;

	function getPort () {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load",function() {
			var parser = new DOMParser();
			var doc = parser.parseFromString(xhr.responseText, "application/xml");
        	window.httpPortNumber= doc.getElementsByTagName("node-port-http").item(0).textContent;
       		window.httpsPortNumber= doc.getElementsByTagName("node-port-https").item(0).textContent;
        console.log("Port : " + httpPortNumber);
	});

    // depending on whether we are in a browser or on a phone
    // the location of the config file is different
    // if we are on a phone then http and https won't be present
    var configLocation = "res/port.xml";
    xhr.open("get", configLocation, true);
    xhr.send();
    
}
//define the globl variabel to process the AJAX request
var xhrNode; 

function callDivChange() {
		xhr = new XMLHttpRequest();
        xhr.open("GET", "test.html", true);
        xhr.onreadystatechange = processDivChange;
        xhr.send();
}

function processDivChange() {
	// while waiting for response from server
	if (xhr.readyState < 4) {
		document.getElementById('div1').innerHTML = "Loading...";
	} else if (xhr.readyState === 4) 	// 4 = response from server has been completely loaded
{
	if (xhr.status == 200 && xhr.status < 300)  {
		// http status between 200 to 299 are all successful
		document.getElementById('div1').innerHTML = xhr.responseText;
	}
}
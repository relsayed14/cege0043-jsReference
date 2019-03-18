 // create a custom popup
 var popup = L.popup();

//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
function onMapClick(e) {

    if (e.latlng /* && userLocation*/) {
        //sessionStorage.setItem("userLat", userLocation.latitude);
        //sessionStorage.setItem("userLng", userLocation.longitude);
        sessionStorage.setItem("quizPointLat", e.latlng.lat);
        sessionStorage.setItem("quizPointLng", e.latlng.lng);

        // calculateDistance in userTracking.js file
        /* var distance = calculateDistance(e.latlng.lat, e.latlng.lng, userLocation.latitude, userLocation.longitude, "K");
        console.log("Distance from you: " + distance + " km") */

        // code adopted from  https://stackoverflow.com/questions/43089768/how-to-import-html-text-in-a-leaflet-popup
        popup.setLatLng(e.latlng)
            .setContent('<iframe style="width: 600px; height: 500px;" src="./questionPopupForm.html"></iframe>')
            .openOn(mymap);

    } else {
        alert("Can't get your location!");
    }
}

// now add the click event detector to the map
mymap.on('click', onMapClick);


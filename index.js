var mainText = document.getElementById("mainText");
//Buttons
var btnWhites = document.getElementById("btnWhites");
var btnBlacks = document.getElementById("btnBlacks");

//Connections for colors.
var tempValueColor = document.getElementById("tempValueColor");
var distValueColor = document.getElementById("distValueColor");
var oldDistValueColor = 0;
var humidityValueColor = document.getElementById("humidityValueColor");

//Connections for whites.
var tempValueWhite = document.getElementById("tempValueWhite");
var distValueWhite = document.getElementById("distValueWhite");
var oldDistValueWhite = 0;
var humidityValueWhite = document.getElementById("humidityValueWhite");


var databaseColorRef = firebase.database().ref('devices/'+ 'color/').limitToLast(1);

databaseColorRef.on('value', gotDataColor, errDataColor);

var databaseWhiteRef = firebase.database().ref('devices/'+ 'white/').limitToLast(1);

databaseWhiteRef.on('value', gotDataWhite, errDataWhite);

function gotDataColor(data) {
	var colors = data.val();
	var keys = Object.keys(colors);

	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		
		tempValueColor.innerText = colors[k].temperature;
		humidityValueColor.innerText = colors[k].humidity;

		distValueColor.innerText = colors[k].distance;
		
		if(oldDistValueColor != colors[k].distance && colors[k].distance > 70) {
			window.alert("Renkli kirli çamaşırların seviyesi %70'i geçti...")
		}

		
		oldDistValueColor.innerText = distValueColor;
	}

}

function errDataColor(err) {
    console.log('Error!')
    console.log(err.val());
}


function gotDataWhite(data) {
	var whites = data.val();
	var keys = Object.keys(whites);

	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		
		if(oldDistValueWhite != whites[k].distance && whites[k].distance > 70) {
			window.alert("Beyaz kirli çamaşırların seviyesi %70'i geçti...")
		}
		
		tempValueWhite.innerText = whites[k].temperature;
		distValueWhite.innerText = whites[k].distance;
		oldDistValueWhite.innerText = distValueWhite;
		console.log(oldDistValueWhite)
		humidityValueWhite.innerText = whites[k].humidity;
	}

}


function errDataWhite(err) {
    console.log('Error!')
    console.log(err.val());
}


function runWhites() {
	 firebase.database().ref('RunWhite/').set("true");
}

function runBlacks() {
	 firebase.database().ref('RunColor/').set("true");
}




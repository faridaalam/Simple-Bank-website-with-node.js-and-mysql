"use strict"
var imported = document.createElement('script');
imported.src = 'purify.min.js';
document.head.appendChild(imported);

function register() {
  	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xmlDoc = xhttp.responseXML;
			var msg = DOMPurify.sanitize(xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue);
			if (msg == "You are registered,You can login now."){ 
				var j;
				for (j=0; j<4; j++){
					document.getElementsByTagName("input")[j].disabled = true;
				}
				document.getElementById("check").innerHTML = msg;
				document.getElementById("log").innerHTML = '<a href="/login">Login</a>';
				setTimeout(function(){document.getElementById("aa").click();},3000);
			} else { 
				document.getElementById("check").innerHTML = msg;
    			}
  		}
	};

  xhttp.open("POST", "signup", true);
  xhttp.setRequestHeader('Content-Type', 'text/xml');

var form = new FormData(document.getElementById("form1"));


  var data = '<?xml version="1.0" encoding="UTF-8"?><user><username>'+ form.get("username") + "</username><password>"+form.get("password") + "</password><address1>"+form.get("address1") +"</address1><address2>"+form.get("address2") + '</address2></user>';


  xhttp.send(data);
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#clickMe').addEventListener('click',register);
  document.querySelector('#password').addEventListener('focus',blk);
  document.querySelector('#password').addEventListener('blur',klb);
  document.querySelector('#password').addEventListener('keyup',chg);

});

var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var special = document.getElementById("special");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
function blk() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
function klb() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
function chg() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }
  // Validate Special letters
  var spLetters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  if(myInput.value.match(spLetters)) {
    special.classList.remove("invalid");
    special.classList.add("valid");
  } else {
    special.classList.remove("valid");
    special.classList.add("invalid");
  }
  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 11) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

"use strict"
var imported = document.createElement('script');
imported.src = 'purify.min.js';
document.head.appendChild(imported);

function login() {
  	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	
 	if (xhttp.responseURL !== undefined && xhttp.responseURL && xhttp.responseURL !== window.location.href) {
     	   window.location.href = xhttp.responseURL;
	
    	};
	
	var xmlDoc = xhttp.responseXML;
	document.getElementById("check").innerHTML =  DOMPurify.sanitize(xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue);

	
    }
  };

  xhttp.open("POST", "login", true);
  xhttp.setRequestHeader('Content-Type', 'text/xml');

var form = new FormData(document.getElementById("form1"));


  var data = '<?xml version="1.0" encoding="UTF-8"?><user><username>'+ form.get("username") + "</username><password>"+form.get("password") + "</password></user>";


  xhttp.send(data);
};


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#clickMe').addEventListener('click',login);

});

"use strict"
var imported = document.createElement('script');
imported.src = 'purify.min.js';
document.head.appendChild(imported);
function update() {
var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){ 
			var xmlDoc = xhttp.responseXML;
			document.getElementById("name").innerHTML = DOMPurify.sanitize("Welcome "+ xmlDoc.getElementsByTagName("username")[0].childNodes[0].nodeValue);
			var accName = xmlDoc.getElementsByTagName("accname");
			var balance = xmlDoc.getElementsByTagName("balance");
			var html ='<table border="1"> <tr><td> Account Name</td> <td> Account Balance</td></tr>';
			for (var i=0; accName.length > i; i++){
				html+= '<tr><td>'+ accName[i].childNodes[0].nodeValue + '</td><td>'+ balance[i].childNodes[0].nodeValue+'</td></tr>';
			
			};
			html= DOMPurify.sanitize(html);
			document.getElementById("table").innerHTML= html;


 		 };
	};

  xhttp.open("POST", "profile", true);
  xhttp.setRequestHeader('Content-Type', 'text/xml');
  xhttp.send('<?xml version="1.0" encoding="UTF-8"?><request>request account information</request>');
	

};





function addAcc(){
document.getElementById("msg").innerHTML ="";
document.getElementById("dep").innerHTML ="";
document.getElementById("wit").innerHTML ="";
document.getElementById("trans").innerHTML ="";

	if (document.getElementById("addAcc").innerHTML =="") {
		document.getElementById("addAcc").innerHTML= 'New account name: <input type="text" name="accname" placeholder="New account name" required=""> New Account balance: <input type="text" name="balance" placeholder="Starting balance" required=""> <input id="b1" type="button" value="Create" /> ';
document.querySelector('#b1').addEventListener('click',create);
		}
		else {
		document.getElementById("addAcc").innerHTML ="";
		};

};

function create() {
  	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var xmlDoc = xhttp.responseXML;
		var msg = DOMPurify.sanitize(xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue);	
 		if (msg =="Account Added"){

			document.getElementById("msg").innerHTML =  msg;
			document.getElementById("addAcc").innerHTML="";
			update();
    		}else{
			document.getElementById("msg").innerHTML = msg;
		};
  	};};

 	 xhttp.open("POST", "addaccount", true);
 	 xhttp.setRequestHeader('Content-Type', 'text/xml');

	var form = new FormData(document.getElementById("form1"));
	var data = '<?xml version="1.0" encoding="UTF-8"?><account><accname>'+ form.get("accname") + "</accname><balance>"+form.get("balance") + "</balance></account>";
  	xhttp.send(data);
};

function deposit() {
document.getElementById("msg").innerHTML ="";
document.getElementById("addAcc").innerHTML ="";
document.getElementById("wit").innerHTML ="";
document.getElementById("trans").innerHTML ="";

	if (document.getElementById("dep").innerHTML =="") {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){ 
				var xmlDoc = xhttp.responseXML;
			
				var htm = 'Choose your account:	<select id="list" name="accName">';
				var accName = xmlDoc.getElementsByTagName("accname");
				var balance = xmlDoc.getElementsByTagName("balance");
				for (var i=0; accName.length > i; i++){
					htm+= '<option value="'+accName[i].childNodes[0].nodeValue+'">'+ accName[i].childNodes[0].nodeValue + '</option>';
				};


				htm +='</select><input type="text" id="nbalance" name="balance" placeholder="Deposit amount" required=""><input id="b2" type="button" value="Send"  />';
				document.getElementById("dep").innerHTML=DOMPurify.sanitize(htm);
				document.querySelector('#b2').addEventListener('click',sendmoney);
 			 };
		};
		  xhttp.open("POST", "profile", true);
		  xhttp.setRequestHeader('Content-Type', 'text/xml');
		  xhttp.send('<?xml version="1.0" encoding="UTF-8"?><request>request account information</request>');	
	}else {
		document.getElementById("dep").innerHTML ="";
		
	};
	
};


function sendmoney(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var xmlDoc = xhttp.responseXML;
		var msg = xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;	
 		if (msg =="Deposit successfull"){

			document.getElementById("msg").innerHTML = DOMPurify.sanitize(msg);
			document.getElementById("dep").innerHTML="";
			update();
    		}else{
			document.getElementById("msg").innerHTML =DOMPurify.sanitize(msg);
		};
  	};};
	
	var e = document.getElementById("list");
	var accName = e.options[e.selectedIndex].value;
	var balance = document.getElementById("nbalance").value;
 	xhttp.open("POST", "deposit", true);
 	xhttp.setRequestHeader('Content-Type', 'text/xml');
	var data = '<?xml version="1.0" encoding="UTF-8"?><deposit><accname>'+ accName + "</accname><balance>"+ balance + "</balance></deposit>";
  	xhttp.send(data);

};

function withdraw() {

document.getElementById("msg").innerHTML ="";
document.getElementById("dep").innerHTML ="";
document.getElementById("addAcc").innerHTML ="";
document.getElementById("trans").innerHTML ="";
	if (document.getElementById("wit").innerHTML =="") {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){ 
				var xmlDoc = xhttp.responseXML;
			
				var htm = 'Choose your account:	<select id="list" name="accName">';
				var accName = xmlDoc.getElementsByTagName("accname");
				var balance = xmlDoc.getElementsByTagName("balance");
				for (var i=0; accName.length > i; i++){
					htm+= '<option value="'+accName[i].childNodes[0].nodeValue+'">'+ accName[i].childNodes[0].nodeValue + '</option>';
				};


				htm +='</select><input type="text" id="nbalance" name="balance" placeholder="withdraw amount" required=""><input id="b3" type="button" value="receive" />';
				document.getElementById("wit").innerHTML=DOMPurify.sanitize(htm);
				document.querySelector('#b3').addEventListener('click',getmoney);
 			 };
		};
		  xhttp.open("POST", "profile", true);
		  xhttp.setRequestHeader('Content-Type', 'text/xml');
		  xhttp.send('<?xml version="1.0" encoding="UTF-8"?><request>list1</request>');	
	}else {
		document.getElementById("wit").innerHTML ="";
		
	};
	
};
function getmoney(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var xmlDoc = xhttp.responseXML;
		var msg = xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;	
 		if (msg =="Withdraw successfull"){

			document.getElementById("msg").innerHTML = DOMPurify.sanitize(msg);
			document.getElementById("wit").innerHTML="";
			update();
    		}else{
			document.getElementById("msg").innerHTML = DOMPurify.sanitize(msg);
		};
  	};};
	
	var e = document.getElementById("list");
	var accName = e.options[e.selectedIndex].value;
	var balance = document.getElementById("nbalance").value;
 	xhttp.open("POST", "withdraw", true);
 	xhttp.setRequestHeader('Content-Type', 'text/xml');
	var data = '<?xml version="1.0" encoding="UTF-8"?><withdraw><accname>'+ accName + "</accname><balance>"+ balance + "</balance></withdraw>";
  	xhttp.send(data);

};

function transfer() {

document.getElementById("msg").innerHTML ="";
document.getElementById("dep").innerHTML ="";
document.getElementById("wit").innerHTML ="";
document.getElementById("addAcc").innerHTML ="";
	if (document.getElementById("trans").innerHTML =="") {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){ 
				var xmlDoc = xhttp.responseXML;
			
				var htm = 'Transfer from:	<select id="list1" name="accName1">';
				var accName = xmlDoc.getElementsByTagName("accname");
				var balance = xmlDoc.getElementsByTagName("balance");
				for (var i=0; accName.length > i; i++){
					htm+= '<option value="'+accName[i].childNodes[0].nodeValue+'">'+ accName[i].childNodes[0].nodeValue + '</option>';
				};
				htm += '</select> To:	<select id="list2" name="accName2">';
				for (var i=0; accName.length > i; i++){
					htm+= '<option value="'+accName[i].childNodes[0].nodeValue+'">'+ accName[i].childNodes[0].nodeValue + '</option>';
				};

				htm +='</select><input type="text" id="nbalance" name="balance" placeholder="Transfer amount" required=""><input id="b4" type="button" value="Send"  />';
				document.getElementById("trans").innerHTML=DOMPurify.sanitize(htm);
				document.querySelector('#b4').addEventListener('click',exchange);
 			 };
		};
		  xhttp.open("POST", "profile", true);
		  xhttp.setRequestHeader('Content-Type', 'text/xml');
		  xhttp.send('<?xml version="1.0" encoding="UTF-8"?><request>request account information</request>');	
	}else {
		document.getElementById("dep").innerHTML ="";
		
	};
	
};


function exchange(){

	var e1 = document.getElementById("list1");
	var accName1 = e1.options[e1.selectedIndex].value;
	var e2 = document.getElementById("list2");
	var accName2 = e2.options[e2.selectedIndex].value;
	var balance = document.getElementById("nbalance").value;
	
	if (accName1 == accName2){ 
		document.getElementById("msg").innerHTML ="Please choose different accounts for transfer";
	}else if ((!balance) || balance <=0){
		document.getElementById("msg").innerHTML ="Please choose a valid amount.";
	}else{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xmlDoc = xhttp.responseXML;
			var msg = xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;	
	 		if (msg =="Transfer successfull"){

				document.getElementById("msg").innerHTML =DOMPurify.sanitize(msg);
				document.getElementById("trans").innerHTML="";
				update();
	    		}else{
				document.getElementById("msg").innerHTML ='Error. Try again.'
			};
  	};};
	
	


 	xhttp.open("POST", "transfer", true);
 	xhttp.setRequestHeader('Content-Type', 'text/xml');
	var data = '<?xml version="1.0" encoding="UTF-8"?><transfer><accname1>'+ accName1 + '</accname1><accname2>'+ accName2 + '</accname2><balance>'+ balance + '</balance></transfer>';
  	xhttp.send(data);
	};
};
window.onload = update();

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#a1').addEventListener('click',addAcc);
	document.querySelector('#a2').addEventListener('click',deposit);
	document.querySelector('#a3').addEventListener('click',withdraw);
	document.querySelector('#a4').addEventListener('click',transfer);
update();
});

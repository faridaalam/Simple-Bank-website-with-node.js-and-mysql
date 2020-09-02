var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();

// Set the cookie parser middleware
app.use(cookieParser());

// The handler for GET /
// @param req - the request
// @param res - the response
app.get("/", function (req, res) {

  // Was the cookie set?
  var cookie = req.cookies.session_id;
  
  // The page HTML
  var pageHTML = "";  

  // The cookie does not exist! Must be a first-time visitor...
  if (cookie === undefined)
  {
    
    // Let's generate a random value for their session
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);

    // Set the cookie session ID
    res.cookie('session_id',randomNumber, { maxAge: 900000, httpOnly: false});
    console.log('cookie created successfully');
    pageHTML = "<html><body bgcolor=lightgreen><h1>You are a first time visitor. Your session id is: " + randomNumber + "</h1></body></html>";
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
    pageHTML = "<html><body bgcolor=lightblue><h1>Welcome back " + cookie + "</h1></body></html> <script> alert(document.cookie);</script>";
  } 
 
  // Send the response
  res.send(pageHTML);

});

app.listen(3000);

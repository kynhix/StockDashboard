function getResult() {

  var url = "http://localhost:8000";   // The URL and the port number must match server-side
  var endpoint = "/result"; // Endpoint must match server endpoint

  var ticker = document.getElementById("ticker").value;

  var http = new XMLHttpRequest();

  // prepare GET request
  http.open("GET", url+endpoint + "?ticker=" + ticker, true);

  http.onreadystatechange = function() {
    var DONE = 4;       // 4 means the request is done.
    var OK = 200;       // 200 means a successful return.
    if (http.readyState == DONE && http.status == OK && http.responseText) {

      // JSON string
      var replyString = http.responseText;

      document.getElementById("result").innerHTML = "JSON received: " + replyString;
      document.getElementById("result").innerHTML += "<br>";

      // convert JSON string into JavaScript object and get the scores
      var replyString = http.responseText;
      var replyObject = JSON.parse(replyString) ;

      document.getElementById("result").innerHTML =
          "Ticker Predicted = " + replyObject.ticker + "<br>" +
          "Accuracy = " + replyObject.accuracy + "<br>" +
          "Precision = " + replyObject.precision + "<br>" +
          "Recall = " + replyObject.recall + "<br>" +
          "Current Prediction: " + replyObject.prediction + "<br>" + "" +
          "Current Price: $" + replyObject.last_price.toFixed(2);
    }
  };

  // Send request
  http.send();
}
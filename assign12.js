var warning = "Must be the States Abbreviation";
var start = "";
var end = "";
function validateStartState() {
    var startState = document.getElementById("startState").value;
    if(startState.match(/^[A-Za-z]+$/) && startState.length == 2) {
        removeWarning();
        start = "valid"
    }else {
        document.getElementById("startState").focus();
        document.getElementById("warning1").innerHTML = warning;
        document.getElementById("warning1").style.color = "red";
        start = "";
    }
}

function validateEndState() {
    var endState = document.getElementById("endState").value;
    if(endState.match(/^[A-Za-z]+$/) && endState.length == 2) {
        removeWarning();
        end = "valid";
    }else {
        document.getElementById("endState").focus();
        document.getElementById("warning2").innerHTML = warning;
        document.getElementById("warning2").style.color = "red";
        end = "";
    }
}

function removeWarning() {
    document.getElementById("warning1").innerHTML = "";
    document.getElementById("warning2").innerHTML = "";
    document.getElementById("warning3").innerHTML = "";
    document.getElementById("warning4").innerHTML = "";
}

function validate() {
    var startCity = document.getElementById("startCity");
    var startState = document.getElementById("startState");
    var endCity = document.getElementById("endCity");
    var endState = document.getElementById("endState");
    if (startCity.value == "" || startCity.value == null) {
        startCity.focus();
        document.getElementById("warning3").innerHTML = "Please enter a City";
        document.getElementById("warning3").style.color = "red";
    }else if (startState.value == "" || startState.value == null) {
        startState.focus();
        document.getElementById("warning1").innerHTML = "Please enter a State";
        document.getElementById("warning1").style.color = "red";
    }else if (endCity.value == "" || endCity.value == null) {
        endCity.focus();
        document.getElementById("warning4").innerHTML = "Please enter a City";
        document.getElementById("warning4").style.color = "red";
    }else if (endState.value == "" || endState.value == null) {
        endState.focus();
        document.getElementById("warning2").innerHTML = "Please enter a State";
        document.getElementById("warning5").style.color = "red";
    }else if (start == "valid" && end == "valid") {
        calculate();
    }
}

function calculate() {
    var xhttp = new XMLHttpRequest();
    var start_City = document.getElementById("startCity").value;
    var start_State = document.getElementById("startState").value;
    var end_City = document.getElementById("endCity").value;
    var end_State = document.getElementById("endState").value;
    var queryString = "startCity=" + start_City + "&startState=" + start_State + "&endCity=" + end_City + "&endState=" + end_State;
    var url = "/cgi-bin/cs213/mileageAjaxJSON?" + queryString;
    console.log(url);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            outputData(obj);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function outputData(data) {
    var txtContainer = document.getElementById("container");
    var travelContainer = document.getElementById("travel");
    var miles = data.trip.miles;
    var txt = "";

    var x = "";

    if (miles == "Unknown") {
        txt += "Sorry! We are unable to determain the distance between " +  data.trip.startcity + ", " + data.trip.startstate + " and " + data.trip.endcity + ", " + data.trip.endstate;
        txtContainer.innerHTML = txt;
    } else {
        txt += "It is " + miles + " miles to " + data.trip.endcity + ", " + data.trip.endstate + " from " + data.trip.startcity + ", " + data.trip.startstate;
        txtContainer.innerHTML = txt;
    }
    if(data.trip.tmode == undefined){
        travelContainer.innerHTML = "";
    }else {
        for(let i=0; i<data.trip.tmode.length; i++) {
            x += data.trip.tmode[i] + "<br>";
        }
        travelContainer.innerHTML = "You can get there by: " + "<br>" + x;
    }
    document.getElementById("main").reset();
}




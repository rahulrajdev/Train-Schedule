var config = {
    apiKey: "AIzaSyCfOfeuPXnQ_-37mC0b2ccluuMdUlBXER4",
    authDomain: "train-schedule-rahul-raj.firebaseapp.com",
    databaseURL: "https://train-schedule-rahul-raj.firebaseio.com",
    projectId: "train-schedule-rahul-raj",
    storageBucket: "train-schedule-rahul-raj.appspot.com",
    messagingSenderId: "315214423955"
  };
firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var trainDestination;
var firstTrainTime;
var trainfrequency;

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    database.ref("train-data").push({
        name: trainName,
        destination: trainDestination,
        firsttime: firstTrainTime,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref("train-data").on("child_added", function(data) {
    $("#train-data-table").append("<tr>"); 
    $("#train-data-table").append("<td>" + data.val().name + "</td>"); 
    $("#train-data-table").append("<td>" + data.val().destination + "</td>"); 
    $("#train-data-table").append("<td>" + data.val().frequency + "</td>"); 
    $("#train-data-table").append("</tr>"); 

});




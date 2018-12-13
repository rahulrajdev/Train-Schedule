//Initializing Firebase Database

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

//Declaring all field inputs as global variables
var trainName;
var trainDestination;
var firstTrainTime;
var trainfrequency;

//Running code for "Submit" Button that grabs user inputs and saves to firebase
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

    //Once submitted, fields clear out for another train
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

});

//database monitor that watches for any value changes
//so we can utilize first train time data to update "Next Arrival" and "Minutes Away" table fields
database.ref("train-data").on("child_added", function(data) {
   
    var first_train_time = moment(data.val().firsttime, "HH:mm");

    var diffTime = moment().diff(moment(first_train_time), "minutes");
    
    var num_of_trains_remainder = diffTime % data.val().frequency;

    if (num_of_trains_remainder === 0) {
        var minutesAway = 0;
        var nextArrival = moment().format("HH:mm");
    } else {
        var minutesAway = data.val().frequency - num_of_trains_remainder;
        var nextArrival = moment().add(minutesAway, "m").format("HH:mm");
    }

   

    $("#train-data-table").append("<tr>"); 
    $("#train-data-table").append("<td id='train-name'>" + data.val().name + "</td>"); 
    $("#train-data-table").append("<td id='train-destination'>" + data.val().destination + "</td>"); 
    $("#train-data-table").append("<td id='train-frequency'>" + data.val().frequency + "</td>"); 
    $("#train-data-table").append("<td id='train-next-arrival'>" + nextArrival + "</td>"); 
    $("#train-data-table").append("<td id='train-minutes-away'>" + minutesAway + "</td>");  
    $("#train-data-table").append("</tr>"); 


});














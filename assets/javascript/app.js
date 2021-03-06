// Nice job putting everything in a document.ready block 👌
$(document).ready(function() {	

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQ7y8_gXx5FRmrqEbbYqYXhNCRW4R_h8g",
    authDomain: "train-scheduler-6a241.firebaseapp.com",
    databaseURL: "https://train-scheduler-6a241.firebaseio.com",
    projectId: "train-scheduler-6a241",
    storageBucket: "train-scheduler-6a241.appspot.com",
    messagingSenderId: "58043364008"
  }
  firebase.initializeApp(config)

  var database = firebase.database()

  //  Button for adding train

	$("#add-train-btn").on("click", function(event) {
	  event.preventDefault()

	  // Grabs user input
	 
	 	var trainName = $("#train-name-input").val().trim()
	  var trainDest = $("#destination-input").val().trim()
	  var firstTrainTime = $("#time-input").val().trim()
	  var tFrequency = $("#frequency-input").val().trim()

	  // Creates local "temporary" object for holding train data

	  // Not necessary for the scope of this assignment, but it'd be a good idea to validate 
	  // all of this user input before saving it to your firebase database.

		var addTrain = {
		    name: trainName,
		    destination: trainDest,
		    start: firstTrainTime,
		    rate: tFrequency
	  }

	  // Uploads train data to the database
	  
	  database.ref().push(addTrain)

	  // Logs everything to console
	  
		// console.log(addTrain.name)
	  // console.log(addTrain.destination)
	  // console.log(addTrain.start)
	  // console.log(addTrain.rate)

	  // Alert
	  
	  // alert("Train successfully added");

	  // Clears all of the text-boxes
	  
	  $("#train-name-input").val("")
	  $("#destination-input").val("")
	  $("#time-input").val("")
	  $("#frequency-input").val("")

	})

	// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  // console.log(childSnapshot.val())

	  // Store everything into a variable.
	  
	  var trainName = childSnapshot.val().name
	  var trainDest = childSnapshot.val().destination
	  var firstTrainTime = childSnapshot.val().start
	  var tFrequency = childSnapshot.val().rate

	  // train Info
	  
		// console.log(trainName)
	  // console.log(trainDest)
	  // console.log(firstTrainTime)
	  // console.log(tFrequency)

	  // Prettify the train start
	  
		var firstTrainTimePretty = moment(firstTrainTime, "HH:mm").subtract(1, "years")

		var currentTime = moment()

		var diffTime = moment().diff(moment(firstTrainTimePretty), "minutes")

		var tRemainder = diffTime % tFrequency

		var tMinutesTillTrain = tFrequency - tRemainder
		// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain)
	  // Next Train
	  var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

	  var nextTrainPretty = moment(nextTrain).format("HH:mm")

	  // Add each train's data into the table
	  // This is a pretty unweildy combination of html string snippets and JS variables. It would probably
	  // be easier to make sense of it if you broke it up into smaller pieces. For instance:

	  // var row = $("<tr>")
	  // row.append( $("<td>").text(trainName) )
	  // row.append( $("<td>").text(trainDest) )
	  // row.append( $("<td>").text(tFrequency) )
	  // row.append( $("<td>").text(nextTrainPretty) )
	  // row.apend( $("<td>").text(tMinutesTillTrain) )
	  // $("#train-table > tbody").append( row )

		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
	  tFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td><td>")
	})
})

var outputArray = [];

$(document).ready(function() {
	//GRAB DATE, EXTRACT HOURS AND CALCULATE TIME ZONE OFFSET
	var date = new Date();
	var userHour = date.getHours();
	var userTimeZone = (date.getTimezoneOffset()) / -60;
	//CALCULATE NEAREST TIME ZONE WITH 5 O'CLOCK
	var magicTime = 17;
	var timeDifference = magicTime - userHour;
	var inverseOffset = 12 + userTimeZone;
	var whereIts5pm = timeDifference + inverseOffset;
	// console.log("time till 5 is " + timeDifference);
	// console.log("time zone offset is " + inverseOffset);
	// console.log("it is 5 o'clock in " + whereIts5pm);
	//IF THERE ARE MULTIPLE LOCATIONS, PICK ONE RANDOMLY
		if (allCountries[whereIts5pm].length < 6) {
			// console.log("We found multiple options " + allCountries[whereIts5pm].length + " this many")
			var randomNum = (Math.floor(Math.random() * allCountries[whereIts5pm].length));
			// console.log(randomNum);
			var outputArray = allCountries[whereIts5pm][randomNum];
		} else {
		var outputArray = allCountries[whereIts5pm];		
		}
	//ACCOUNT FOR CROSSING DATE LINE
	// console.log(outputArray);
	if (whereIts5pm > 24) {
		whereIts5pm = whereIts5pm - 24;
	}
	//PUT RESULTS ON PAGE
	$('.cheers').html(outputArray[4]);
	$('.location').html(outputArray[1]);
	// $('.location').html(outputArray[2])
	$('.drink').html(outputArray[3]);
	// $('.imageContainer').html("<img class='glass' src=" + outputArray[5] + "></img>");
	// $('.imageContainer').css('background', 'yellow');
	// $('aside').css('background-image','url(' + outputArray[5] + ')');
	$('main').css('background-image','url(' + outputArray[5] + ')');

});


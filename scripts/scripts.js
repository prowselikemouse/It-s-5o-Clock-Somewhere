var app = {};

app.displayArray =[];

app.outputArray = [];

app.whereIts5pm = 0;

app.init = function() {
	app.getlocations();
	app.another_button();
}

app.key = 'cfec60ec11e2efaa7f513383b9940b85';
app.id = 'ac5ae063';

//GRAB DATE, EXTRACT HOURS AND CALCULATE TIME ZONE OFFSET
app.getlocations = function() {
		var date = new Date();
		var userHour = date.getHours();
		var userTimeZone = (date.getTimezoneOffset()) / -60;
		//CALCULATE NEAREST TIME ZONE WITH 5 O'CLOCK
		var magicTime = 17;
		var timeDifference = magicTime - userHour;
		var inverseOffset = 12 + userTimeZone;
		app.whereIts5pm = timeDifference + inverseOffset;
		app.outputArray = allCountries[app.whereIts5pm];
	};

//IF THERE ARE MULTIPLE LOCATIONS, PICK ONE RANDOMLY
app.another_button = function() {
	var randomNum = (Math.floor(Math.random() * app.outputArray.length));
	app.displayArray = app.outputArray[randomNum];
	console.log(app.displayArray);

	//ACCOUNT FOR CROSSING DATE LINE
	if (app.whereIts5pm > 24) {
		app.whereIts5pm = app.whereIts5pm - 24;
	}
	//PUT RESULTS ON PAGE
	$('.cheers').html(app.displayArray[4]);
	$('.location').html(app.displayArray[1]);
	$('.drink').html(app.displayArray[3]);
	$('main').css('background-image','url(' + app.displayArray[5] + ')');
};

$(document).ready(function() {
	app.init();
	$('.another_button').on('click', function() {
		app.another_button();
	})
});


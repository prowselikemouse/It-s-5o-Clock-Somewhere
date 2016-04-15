var app = {};

app.displayArray =[];

app.outputArray = [];

app.whereIts5pm = 0;

app.init = function() {
	app.getlocations();
	app.another_button();
}


//GRAB DATE, EXTRACT HOURS AND CALCULATE TIME ZONE OFFSET
app.getlocations = function() {
		var date = new Date();
		var userHour = date.getHours();
		var userTimeZone = (date.getTimezoneOffset()) / -60;
		//CALCULATE NEAREST TIME ZONE WITH 5 O'CLOCK
		var magicTime = 17;
		var timeDifference = magicTime - userHour;
		var inverseOffset = 11 + userTimeZone;
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
	$('.drinklink').attr('href', "http://www.yummly.com/recipes?q=" + app.displayArray[3] + '&allowedCourse=course%5Ecourse-Beverages&allowedCourse=course%5Ecourse-Cocktails');
	$('.image').attr('src', app.displayArray[5]);
	$('.image').attr('alt', app.displayArray[3]);
	console.log(app.displayArray[3]);
};

$(document).ready(function() {
	app.init();
	$('.another-button').on('click', function() {
		app.another_button();
	})
});

//TWITTER SHARE BUTTON
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');


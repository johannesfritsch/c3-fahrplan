var asciify = require('asciify');

var fahrplan = require('.');

asciify('Fahrplan', {font:'banner'}, function(err, res){ 
	console.log(res);
	fahrplan.hasCongressBegun(function(err, hasBegun){
		if(err) {
			console.err('Fehler!');
			console.err(err);
		}
		if(hasBegun) {
			console.log('Congress hat begonnnen');
		} else {
			console.log('Congress hat nicht begonnnen');
		}
	});
});
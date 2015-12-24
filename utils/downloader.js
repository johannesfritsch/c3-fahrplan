var request = require('request');
var moment = require('moment');

var cache = {};

module.exports = function(cb) {
	var year = moment().format('YYYY');
	if(cache[year]) {
		cb(null, cache[year]);
	} else {
		request('https://events.ccc.de/congress/' + year + '/Fahrplan/schedule.json', function (err, res, body) {
		  if (!err && res.statusCode == 200) {
		    cache[year] = JSON.parse(body)
		    cb(null, cache[year]);
		  } else {
		  	cb(err);
		  }
		});
	}
}
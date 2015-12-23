var request = require('request');

var cache = null;

module.exports = function(cb) {
	if(cache) {
		cb(null, cache);
	} else {
		request('https://events.ccc.de/congress/2015/Fahrplan/schedule.json', function (err, res, body) {
		  if (!err && res.statusCode == 200) {
		    cache = JSON.parse(body)
		    cb(null, cache);
		  } else {
		  	cb(err);
		  }
		});
	}
}
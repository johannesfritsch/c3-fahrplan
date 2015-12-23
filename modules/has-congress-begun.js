var downloadFahrplan = require('../utils/downloader');
var moment = require('moment'); 

module.exports = function(cb){
	downloadFahrplan(function(err, fp){
		if(err) return cb(err);
		 var now   = moment();
		 var start = moment(fp.schedule.conference.start);
		 var end   = moment(fp.schedule.conference.end);
		 if(now.isBefore(start) || now.isAfter(end)) {
		 	cb(null, false);
		 } else {
		 	cb(null, true);
		 }
	});
}
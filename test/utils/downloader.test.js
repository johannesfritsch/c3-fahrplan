var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('utils/downloader', function(){
	it('fetches a json using request', function(done){
		var callCount = 0;
		var downloadFahrplan = proxyquire('../../utils/downloader', {
			request: function(url, cb){
				callCount++;
				cb(null, { statusCode: 200 }, "{}");
			}
		});
		downloadFahrplan(function(err, fp){
			assert.equal(callCount, 1);
			done();
		});
	});
	it('fetches a json with the current year', function(done){
		var clock = sinon.useFakeTimers(new Date(1337, 12-1, 28).getTime());
		var downloadFahrplan = proxyquire('../../utils/downloader', {
			request: function(url, cb){
				assert.equal(url, 'https://events.ccc.de/congress/1337/Fahrplan/schedule.json');
				cb(null, { statusCode: 200 }, "{}");
			}
		});
		downloadFahrplan(done);
	});
	it('fetches a json only once per year', function(done){
		var callCount = 0;
		var downloadFahrplan = proxyquire('../../utils/downloader', {
			request: function(url, cb){
				callCount++;
				cb(null, { statusCode: 200 }, "{}");
			}
		});
		downloadFahrplan(function(err, fp){
			downloadFahrplan(function(err, fp){
				assert.equal(callCount, 1);
				done();
			});
		});
	});
});
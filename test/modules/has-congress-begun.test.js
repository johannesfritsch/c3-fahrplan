var assert     = require('assert');
var sinon      = require('sinon');
var proxyquire = require('proxyquire');

describe('modules/has-congress-begun', function(){
	it('hasCongressBegun returns true during congress', function(done){
		var clock = sinon.useFakeTimers(new Date(2015, 12-1, 28).getTime());

		hcb = proxyquire('../../modules/has-congress-begun', { 
			'../utils/downloader': function(cb){
				cb(null, { 
					schedule: {
						conference: {
							start: '2015-12-27',
							end: '2015-12-30'
						}
					}
				});
			}
		});

		hcb(function(err, hasBegun){
			assert(err == null);
			assert(hasBegun == true);
			clock.restore();
			done();
		});
	});

	it('hasCongressBegun returns false during before', function(done){
		var clock = sinon.useFakeTimers(new Date(2015, 12-1, 10).getTime());

		hcb = proxyquire('../../modules/has-congress-begun', { 
			'../utils/downloader': function(cb){
				cb(null, { 
					schedule: {
						conference: {
							start: '2015-12-27',
							end: '2015-12-30'
						}
					}
				});
			}
		});

		hcb(function(err, hasBegun){
			assert(err == null);
			assert(hasBegun == false);
			clock.restore();
			done();
		});
	});
});
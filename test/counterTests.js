var assert = require('assert')
var counter = require('../lib/counter');
var path = require('path');

describe("counter", function () {
	it("processes imports as expected", function () {
		var count = counter.count(path.resolve(__dirname, "./testFiles/root.css"));
		assert.equal(count, 3, "After importing there should be 3 selectors. Count = " + count);
	});
});
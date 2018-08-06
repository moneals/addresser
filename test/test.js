'use strict';

var expect = require('chai').expect;
var addressParser = require('../index');

describe('#addressParser', function() {
    it('should parse a valid address', function() {
        var result = addressParser("123 Main St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
    });
});

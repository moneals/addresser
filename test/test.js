'use strict';

var expect = require('chai').expect;
var addressParser = require('../index');

describe('#addressParser', function() {
    it('should parse a simple address', function() {
        var result = addressParser("123 Main St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
    });
    it('should parse a street name with two words', function() {
        var result = addressParser("123 Fat Duck St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Fat Duck");
        expect(result.streetSuffix).to.equal("St");
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
    });
    it('should parse a street address with double spaces', function() {
        var result = addressParser("123 Main  St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
    });
    it('should parse a street address with zip code in standard format', function() {
        var result = addressParser("123 Main  St, Conway, SC 29526");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.zipCode).to.equal("29526");
    });
});

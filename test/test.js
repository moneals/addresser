'use strict';

var expect = require('chai').expect;
var addressParser = require('../index');

describe('#addressParser', function() {
    it('should parse single digits', function() {
        var result = addressParser("1");
        expect(result).to.equal("parsed 1");
    });

    it('should parse double digits', function() {
        var result = addressParser("12");
        expect(result).to.equal("parsed 12");
    });

    it('should parse a string', function() {
        var result = addressParser("mystring");
        expect(result).to.equal("parsed mystring");
    });
});

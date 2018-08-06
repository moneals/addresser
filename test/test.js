'use strict';

var expect = require('chai').expect;
var addressParser = require('../index');

describe('#addressParser', function() {
    it('should convert single digits', function() {
        var result = addressParser("1");
        expect(result).to.equal("parsed 1");
    });

    it('should convert double digits', function() {
        var result = addressParser("12");
        expect(result).to.equal("parsed 12");
    });
});

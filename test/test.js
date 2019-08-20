'use strict';

var expect = require('chai').expect;
var addresser = require('../index');

describe('#parseAddress', function() {
    it('should parse a simple address', function() {
        var result = addresser.parseAddress("123 Main St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street name with two words', function() {
        var result = addresser.parseAddress("123 Fat Duck St, Powder Springs, GA");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Fat Duck");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Fat Duck St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Powder Springs");
        expect(result.stateAbbreviation).to.equal("GA");
        expect(result.stateName).to.equal("Georgia");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with double spaces', function() {
        var result = addresser.parseAddress("123 Main  St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with zip code in standard format', function() {
        var result = addresser.parseAddress("123 Main  St, New Braunfels, TX 78132");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("New Braunfels");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("78132");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with zip code plus four in standard format', function() {
        var result = addresser.parseAddress("123 Main  St, Conway, NC 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("NC");
        expect(result.stateName).to.equal("North Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a state name', function() {
        var result = addresser.parseAddress("123 Main  St, Conway, South Carolina 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a lowercase state name', function() {
        var result = addresser.parseAddress("123 Main  St, Conway, south carolina 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a lowercase state abbeviation', function() {
        var result = addresser.parseAddress("123 Main  St, San Antonio, tx 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a delimited zip code', function() {
        var result = addresser.parseAddress("123 Main  St, Canyon Lake, tx, 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Canyon Lake");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should not parse a street address with missing city and state', function() {
        expect(addresser.parseAddress.bind(addresser.parseAddress, "123 Main  St")).to.throw('Can not parse address.');
    });
    it('should validate input is not undefined', function() {
        expect(addresser.parseAddress.bind(addresser.parseAddress)).to.throw('Argument must be a non-empty string.');
    });
    it('should validate input is a non-empty string', function() {
        expect(addresser.parseAddress.bind(addresser.parseAddress, "")).to.throw('Argument must be a non-empty string.');
    });
    it('should not parse an invalid state abbreviation', function() {
        expect(addresser.parseAddress.bind(addresser.parseAddress, "123 Main St, Canyon Lake, XX, 29526-3131")).to.throw('Can not parse address.');
    });
    it('should parse an address with same street and city name', function() {
        var result = addresser.parseAddress("400 South Orange Ave, South Orange , NJ 07079");
        expect(result.streetNumber).to.equal("400");
        expect(result.streetName).to.equal("South Orange");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("400 South Orange Ave");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("South Orange");
        expect(result.stateAbbreviation).to.equal("NJ");
        expect(result.stateName).to.equal("New Jersey");
        expect(result.zipCode).to.equal("07079");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with no city delimiter', function() {
        var result = addresser.parseAddress("1301 Columbia College Drive Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a secondary value on same section with city', function() {
        var result = addresser.parseAddress("1301 Columbia College Drive Unit 101 Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a secondary value on separate line', function() {
        var result = addresser.parseAddress("1301 Columbia College Drive, APT A, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("APT A");
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a glen plus haven suffix', function() {
        var result = addresser.parseAddress("1301 Glen Haven, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Glen");
        expect(result.streetSuffix).to.equal("Hvn");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Glen Hvn");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a direction following the street type', function() {
        var result = addresser.parseAddress("1301 Acme Street E, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a lowercase direction following the street type', function() {
        var result = addresser.parseAddress("1301 Acme Street e, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with line 2 incorrectly placed before line 1', function() {
        var result = addresser.parseAddress("UNIT 101, 1301 Acme Street E, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("1301 Acme St E");
        expect(result.addressLine2).to.equal("UNIT 101");
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with secondary address at the beginning of line 1', function() {
        var result = addresser.parseAddress("UNIT 101, 1301 Acme Avenue, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Acme");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("1301 Acme Ave");
        expect(result.addressLine2).to.equal("UNIT 101");
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a trailing directional, all caps, and no delimiters', function() {
        var result = addresser.parseAddress("300 BOYLSTON ST E SEATTLE WA 98102");
        expect(result.streetNumber).to.equal("300");
        expect(result.streetName).to.equal("Boylston");
        expect(result.streetSuffix).to.equal("St");
        expect(result.streetDirection).to.equal("E");
        expect(result.addressLine1).to.equal("300 Boylston St E");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Seattle");
        expect(result.stateAbbreviation).to.equal("WA");
        expect(result.stateName).to.equal("Washington");
        expect(result.zipCode).to.equal("98102");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });

    it('should parse an address with a trailing country', function() {
        var result = addresser.parseAddress("300 BOYLSTON AVE, SEATTLE WA 98102, USA");
        expect(result.streetNumber).to.equal("300");
        expect(result.streetName).to.equal("Boylston");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.addressLine1).to.equal("300 Boylston Ave");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Seattle");
        expect(result.stateAbbreviation).to.equal("WA");
        expect(result.stateName).to.equal("Washington");
        expect(result.zipCode).to.equal("98102");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });

    it('should parse a valid address for a small city not in us-cities.json file', function() {
        var result = addresser.parseAddress("5555 Duffek Dr, Kirby, TX 78219");
        expect(result.streetNumber).to.equal("5555");
        expect(result.streetName).to.equal("Duffek");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("5555 Duffek Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Kirby");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("78219");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });

    it('should parse an address with a dot after street abbreviation', function() {
        var result = addresser.parseAddress("200 SUMMIT LAKE DR., VALHALLA NY 10595");
        expect(result.streetNumber).to.equal("200");
        expect(result.streetName).to.equal("Summit Lake");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("200 Summit Lake Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Valhalla");
        expect(result.stateAbbreviation).to.equal("NY");
        expect(result.stateName).to.equal("New York");
        expect(result.zipCode).to.equal("10595");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });

    it('should parse an address with a newline separator', function() {
        var result = addresser.parseAddress("200 SUMMIT LAKE DR.\nVALHALLA NY 10595");
        expect(result.streetNumber).to.equal("200");
        expect(result.streetName).to.equal("Summit Lake");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("200 Summit Lake Dr");
        expect(result).to.not.have.property('addressLine2');
        expect(result.placeName).to.equal("Valhalla");
        expect(result.stateAbbreviation).to.equal("NY");
        expect(result.stateName).to.equal("New York");
        expect(result.zipCode).to.equal("10595");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });

    it('should parse an address with a PO BOX', function() {
        var result = addresser.parseAddress("PO BOX 538\nBASILE LA 70515-0538");
        expect(result.addressLine1).to.equal("PO BOX 538");
        expect(result).to.not.have.property('addressLine2');
        expect(result).to.not.have.property('streetNumber');
        expect(result).to.not.have.property('streetName');
        expect(result).to.not.have.property('streetSuffix');
        expect(result.placeName).to.equal("Basile");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70515");
        expect(result.zipCodePlusFour).to.equal("70515-0538");
    });

    it('should parse an address with a PO BOX written as P.O. DRAWER', function() {
        var result = addresser.parseAddress("P.O. DRAWER 538\nBASILE LA 70515-0538");
        expect(result.addressLine1).to.equal("P.O. DRAWER 538");
        expect(result).to.not.have.property('addressLine2');
        expect(result).to.not.have.property('streetNumber');
        expect(result).to.not.have.property('streetName');
        expect(result).to.not.have.property('streetSuffix');
        expect(result.placeName).to.equal("Basile");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70515");
        expect(result.zipCodePlusFour).to.equal("70515-0538");
    });

    it('should provide an id for a valid address', function() {
        var result = addresser.parseAddress("PO BOX 538\nBASILE LA 70515-0538");
        expect(result.addressLine1).to.equal("PO BOX 538");
        expect(result.id).to.equal('PO-BOX-538,-Basile,-LA-70515');
    });
    
    it('should not provide an id if mandatory components are not present', function() {
        var result = addresser.parseAddress("1010 PINE, 9E-6-01\nST. LOUIS MO");
        expect(result.streetNumber).to.equal("1010");
        expect(result.streetName).to.equal("Pine");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("1010 Pine");
        expect(result.addressLine2).to.equal("9E-6-01");
        expect(result.placeName).to.equal("St. Louis");
        expect(result.stateAbbreviation).to.equal("MO");
        expect(result.stateName).to.equal("Missouri");
        expect(result).to.not.have.property("zipCode");
        expect(result).to.not.have.property("zipCodePlusFour");
        expect(result).to.not.have.property("id");
    });

    it('should parse a street address ending in pass', function() {
        var result = addresser.parseAddress("15001 Strathaven Pass, Pflugerville, TX 78660");
        expect(result.streetNumber).to.equal("15001");
        expect(result.streetName).to.equal("Strathaven");
        expect(result.streetSuffix).to.equal("Pass");
        expect(result.addressLine1).to.equal("15001 Strathaven Pass");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Pflugerville");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("78660");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    
    it('should parse a street address with "Ave C" style street name', function() {
        var result = addresser.parseAddress("826 N Ave C, Crowley, LA 70526");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave C");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave C");
        expect(result).to.not.have.property('addressLine2');;
        expect(result.placeName).to.equal("Crowley");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70526");
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    it('should parse a street address with "Avenue N" style street name', function() {
        var result = addresser.parseAddress("826 N Avenue N, Crowley, LA 70526");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave N");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave N");
        expect(result).to.not.have.property('addressLine2');;
        expect(result.placeName).to.equal("Crowley");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70526");
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a street address with "Ave. b" style street name', function() {
        var result = addresser.parseAddress("826 N Ave. b, Crowley, LA 70526");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave B");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave B");
        expect(result).to.not.have.property('addressLine2');;
        expect(result.placeName).to.equal("Crowley");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70526");
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a street address with "Ave. b" style street name with non delimited second address line', function() {
        var result = addresser.parseAddress("826 N Ave. b Unit 101, Crowley, LA 70526");
        expect(result.streetNumber).to.equal("826");
        expect(result.streetName).to.equal("N Ave B");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("826 N Ave B");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.placeName).to.equal("Crowley");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result.zipCode).to.equal("70526");
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a street address without a normal suffix like 123 Texas Gold', function() {
        var result = addresser.parseAddress("12939 Texas Gold, San Antonio, TX 78253");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Texas Gold");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal('12939 Texas Gold');
        expect(result).to.not.have.property('addressLine2');;
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal('78253');
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a street address without a normal suffix and 2nd address line like 123 Texas Gold Unit 101', function() {
        var result = addresser.parseAddress("12939 Texas Gold Unit 101, San Antonio, TX 78253");
        expect(result.streetNumber).to.equal("12939");
        expect(result.streetName).to.equal("Texas Gold");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("12939 Texas Gold");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal('78253');
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse an Interstate address with a # unit', function() {
        var result = addresser.parseAddress("10701 S Interstate 35 # 35, Austin, TX");
        expect(result.streetNumber).to.equal("10701");
        expect(result.streetName).to.equal("S Interstate 35");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("10701 S Interstate 35");
        expect(result.addressLine2).to.equal("# 35");
        expect(result.placeName).to.equal("Austin");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse FM number style road names', function() {
        var result = addresser.parseAddress("11434 W FM 471, San Antonio, TX");
        expect(result.streetNumber).to.equal("11434");
        expect(result.streetName).to.equal("W FM 471");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("11434 W FM 471");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name ending in Oak', function() {
        var result = addresser.parseAddress("24330 Invitation Oak, San Antonio, TX");
        expect(result.streetNumber).to.equal("24330");
        expect(result.streetName).to.equal("Invitation Oak");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("24330 Invitation Oak");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name thats just a number', function() {
        var result = addresser.parseAddress("506 W 1100, Chesterton, IN");
        expect(result.streetNumber).to.equal("506");
        expect(result.streetName).to.equal("W 1100");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("506 W 1100");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("Chesterton");
        expect(result.stateAbbreviation).to.equal("IN");
        expect(result.stateName).to.equal("Indiana");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });

    it('should parse street name that ends in Run', function() {
        var result = addresser.parseAddress("25403 Longbranch Run, San Antonio, TX");
        expect(result.streetNumber).to.equal("25403");
        expect(result.streetName).to.equal("Longbranch Run");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("25403 Longbranch Run");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name that ends in Chase', function() {
        var result = addresser.parseAddress("22923 Cardigan Chase, San Antonio, TX");
        expect(result.streetNumber).to.equal("22923");
        expect(result.streetName).to.equal("Cardigan Chase");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("22923 Cardigan Chase");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name that ends in Chase', function() {
        var result = addresser.parseAddress("7114 Sunny Day, San Antonio, TX");
        expect(result.streetNumber).to.equal("7114");
        expect(result.streetName).to.equal("Sunny Day");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("7114 Sunny Day");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name that has a leading directional and is just a number', function() {
        var result = addresser.parseAddress("110 N 2500, Vernal, UT");
        expect(result.streetNumber).to.equal("110");
        expect(result.streetName).to.equal("N 2500");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("110 N 2500");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("Vernal");
        expect(result.stateAbbreviation).to.equal("UT");
        expect(result.stateName).to.equal("Utah");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse "123 Rue Dauphine style address', function() {
        var result = addresser.parseAddress("625 Rue Dauphine, Eunice, LA");
        expect(result.streetNumber).to.equal("625");
        expect(result.streetName).to.equal("Rue Dauphine");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("625 Rue Dauphine");
        expect(result).to.not.have.property("addressLine2");        
        expect(result.placeName).to.equal("Eunice");
        expect(result.stateAbbreviation).to.equal("LA");
        expect(result.stateName).to.equal("Louisiana");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse street name of N Portola with unit name', function() {
        var result = addresser.parseAddress("47 N Portola, # 35, Laguna Beach, CA");
        expect(result.streetNumber).to.equal("47");
        expect(result.streetName).to.equal("N Portola");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("47 N Portola");
        expect(result.addressLine2).to.equal("# 35");
        expect(result.placeName).to.equal("Laguna Beach");
        expect(result.stateAbbreviation).to.equal("CA");
        expect(result.stateName).to.equal("California");
        expect(result).to.not.have.property("zipCode");        
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a street name with no suffix but the street name itself matches a suffix', function() {
        var result = addresser.parseAddress("1010 PINE, 9E-6-01\nST. LOUIS MO 63101");
        expect(result.streetNumber).to.equal("1010");
        expect(result.streetName).to.equal("Pine");
        expect(result).to.not.have.property('streetSuffix')
        expect(result.addressLine1).to.equal("1010 Pine");
        expect(result.addressLine2).to.equal("9E-6-01");
        expect(result.placeName).to.equal("St. Louis");
        expect(result.stateAbbreviation).to.equal("MO");
        expect(result.stateName).to.equal("Missouri");
        expect(result.zipCode).to.equal("63101");
        expect(result).to.not.have.property("zipCodePlusFour");
    });
    
    it('should parse a simple Canadian Address without zip Code', function() {
        var result = addresser.parseAddress("123 Main St, Toronto, ON");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Toronto");
        expect(result.stateAbbreviation).to.equal("ON");
        expect(result.stateName).to.equal("Ontario");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a simple Canadian Address with zip Code', function() {
        var result = addresser.parseAddress("123 Main St, Toronto, ON M3K5K9");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Toronto");
        expect(result.stateAbbreviation).to.equal("ON");
        expect(result.stateName).to.equal("Ontario");
        expect(result.zipCode).to.equal("M3K5K9");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a simple Canadian Address with Trailing Country', function() {
        var result = addresser.parseAddress("123 Main St, Toronto, ON M3K5K9, Canada");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.hasOwnProperty("streetDirection")).to.equal(false);
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Toronto");
        expect(result.stateAbbreviation).to.equal("ON");
        expect(result.stateName).to.equal("Ontario");
        expect(result.zipCode).to.equal("M3K5K9");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
});

describe('#randomCity', function() {
    it('should provide a random city', function() {
        for (var i = 0; i < 20; i++) { 
            var result = addresser.randomCity();
            expect(result.hasOwnProperty("city")).to.equal(true);
            expect(result['city'].length).to.be.above(1);
            expect(result.hasOwnProperty("state")).to.equal(true);
            expect(result['state'].length).to.equal(2);
        }
    });
});

describe('##cities', function() {
    it('should provide a full list of cities', function() {
        var result = addresser.cities();
        expect(result['WV'].includes('War')).to.be.true;
        expect(result['ND'].includes('Center')).to.be.true;
        expect(result['LA'].includes('Bentley')).to.be.true;
        expect(result['NY'].includes('Cleveland')).to.be.true;
        expect(result['SC'].includes('Marion')).to.be.true;
        expect(result['TX'].length).to.be.greaterThan(300);
        expect(result['TX'].includes('ThisCityCannot143234234234234PossiblyExist')).to.be.false;
    });
});

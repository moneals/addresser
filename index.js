'use strict';

/**
 * Parses a street address
 * @param {string} address
 * @return {string}
 **/
module.exports = function(address) {
    //TODO add test with double spaces
    //TODO add test with street name having more than one word
    // for now assume simple comma delimited address in form of street# streetname streetsuffix, city, state
    var addressParts = address.split(',');
    var streetAddress = addressParts[0].trim();
    var streetParts = streetAddress.split(' ');
    var result = {};
    result.streetNumber = streetParts[0];
    result.streetName = streetParts[1];
    result.streetSuffix = streetParts[2];
    result.placeName = addressParts[1].trim();
    result.stateAbbreviation = addressParts[2].trim();

    return result;
};

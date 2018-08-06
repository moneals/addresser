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
    //Remove any double space problems
    var i = streetParts.length;
    while (i--) {
      if (0 === streetParts[i].length) { 
        streetParts.splice(i, 1);
      }
    }

    var result = {};

    result.streetNumber = streetParts[0]; // Assume number is first element
    result.streetSuffix = streetParts[streetParts.length-1]; // Assume type is last element
    
    result.streetName = streetParts[1]; // Assume street name is everything in the middle
    for (var i = 2; i < streetParts.length-1; i++) {
      result.streetName = result.streetName + " " + streetParts[i];
    }
    
    result.placeName = addressParts[1].trim();
    result.stateAbbreviation = addressParts[2].trim();

    return result;
};

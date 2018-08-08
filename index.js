'use strict';

/**
 * Parses a street address
 * @param {string} address
 * @return {string}
 **/
module.exports = function(address) {
    // Validate a non-empty string was passed
    if (!address) {
      throw 'Argument must be a non-empty string.';
    }
    // Deal with any repeated spaces
    address = address.replace(/  +/g, ' ');
    // Assume comma is an intentional delimiter
    var addressParts = address.split(',');
    
    var result = {};
    
    // Assume the last address section contains state, zip or both
    var stateString = addressParts[addressParts.length-1].trim();
    // Parse and remove zip or zip plus 4 from end of string
    if (stateString.match(/\d{5}$/)) {
      result.zipCode = stateString.match(/\d{5}$/)[0];
      stateString = stateString.substring(0, stateString.length - 5).trim();
      addressParts[addressParts.length-1] = stateString;
    } else if (stateString.match(/\d{5}-\d{4}$/)) {
      var zipString = stateString.match(/\d{5}-\d{4}$/)[0];
      result.zipCode = zipString.substring(0,5);
      result.zipCodePlusFour = zipString;
      stateString = stateString.substring(0, stateString.length - 10).trim();
      addressParts[addressParts.length-1] = stateString;
    }

    var streetAddress = addressParts[0].trim();
    var streetParts = streetAddress.split(' ');

    result.streetNumber = streetParts[0]; // Assume number is first element
    result.streetSuffix = streetParts[streetParts.length-1]; // Assume type is last element
    
    result.streetName = streetParts[1]; // Assume street name is everything in the middle
    for (var i = 2; i < streetParts.length-1; i++) {
      result.streetName = result.streetName + " " + streetParts[i];
    }
    
    if (addressParts.length > 1) {
      result.placeName = addressParts[1].trim();
      
      if (addressParts.length > 2) {
        result.stateAbbreviation = addressParts[2].trim();
      }
    }  
    
    if(result.streetName && result.placeName && result.stateAbbreviation) {
      return result;
    } else {
      throw 'Can not parse address.';
    }
};

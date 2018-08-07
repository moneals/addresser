'use strict';

/**
 * Parses a street address
 * @param {string} address
 * @return {string}
 **/
module.exports = function(address) {
    var addressParts = address.split(',');
    
    //Assume the last address section is state, zip or both
    //TODO build logic
    
    
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
    
    if (addressParts.length > 1) {
      result.placeName = addressParts[1].trim();
      
      if (addressParts.length > 2) {
        var stateString = addressParts[2].trim();
        if (stateString.length > 2) {
          var stateParts = stateString.split(' ');
          //Just assume its always a state abbreviation and zip5 for now
          result.stateAbbreviation = stateParts[0];
          result.zipCode = stateParts[1];
        } else {
          result.stateAbbreviation = stateString;
        }
      }
    }  
    
    if(result.streetName && result.placeName && result.stateAbbreviation) {
      return result;
    } else {
      throw 'Can not parse address.'
    }
};

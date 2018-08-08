var usStates = require('./us-states.json');

'use strict';

/**
 * Parses a street address
 * @param {string} address
 * @return {string}
 **/
 
//TODO move this to utils file
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

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
    } else if (stateString.match(/\d{5}-\d{4}$/)) {
      var zipString = stateString.match(/\d{5}-\d{4}$/)[0];
      result.zipCode = zipString.substring(0,5);
      result.zipCodePlusFour = zipString;
      stateString = stateString.substring(0, stateString.length - 10).trim();
    }
    // Parse and remove state
    if (stateString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = stateString;
    } else {
      addressParts.splice(-1,1);
      stateString = addressParts[addressParts.length-1].trim();
    }
    // First check for just an Abbreviation
    if (stateString.length == 2 && getKeyByValue(usStates,stateString.toUpperCase())) {
      result.stateAbbreviation = stateString.toUpperCase();
      result.stateName = toTitleCase(getKeyByValue(usStates,stateString.toUpperCase()));
    } else {
      // Next check if the state string ends in state name or abbeviation
      // (state abbreviation must be preceded by a space to ensure accuracy)
      for (var key in usStates) {
        var re = new RegExp(" " + usStates[key] + "$|" + key + "$", "i");
        if (stateString.match(re)) {
          stateString = stateString.replace(re,"");
          result.stateAbbreviation = usStates[key];
          result.stateName = toTitleCase(key);
          break;
        }
      }
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
    }  
    
    if(result.streetName && result.placeName && result.stateAbbreviation) {
      return result;
    } else {
      throw 'Can not parse address.';
    }
};

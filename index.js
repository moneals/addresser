var usStates = require('./data/us-states.json');
var usStreetTypes = require('./data/us-street-types.json');
var usCities = require('./data/us-cities.json');

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
    // Assume comma and tab is an intentional delimiter
    var addressParts = address.split(/,|\t/);
    
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
      stateString = stateString.substring(0, stateString.length - 2);
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
    if (!result.stateAbbreviation || result.stateAbbreviation.length != 2) {
      throw 'Can not parse address. State not found.';
    }

    // Parse and remove city/place name
    var placeString = "";
    if (stateString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = stateString;
      placeString = addressParts[addressParts.length-1];
    } else {
      addressParts.splice(-1,1);
      placeString = addressParts[addressParts.length-1].trim();
    }
    result.placeName = "";
    usCities[result.stateAbbreviation].some(function(element) {
      var re = new RegExp(element + "$", "i");
      if (placeString.match(re)) {
        console.log("Matched city data: " + element);
        placeString = placeString.replace(re,""); // Carve off the place name
        
        result.placeName = element;
        return element; // Found a winner - stop looking for cities
      }
    });
    if (!result.placeName) {
      throw 'Can not parse address. City not found or is invalid for specified state.';
    }

    // Assume street data is at the beginning
    // 
    var streetAddress = addressParts[0].trim();
    var streetParts = streetAddress.split(' ');

    result.streetNumber = streetParts[0]; // Assume number is first element
    result.streetSuffix = streetParts[streetParts.length-1]; // Assume type is last element
    
    result.streetName = streetParts[1]; // Assume street name is everything in the middle
    for (var i = 2; i < streetParts.length-1; i++) {
      result.streetName = result.streetName + " " + streetParts[i];
    }
    
    return result;
};

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
        placeString = placeString.replace(re,""); // Carve off the place name
        
        result.placeName = element;
        return element; // Found a winner - stop looking for cities
      }
    });
    if (!result.placeName) {
      throw 'Can not parse address. City not found or is invalid for specified state.';
    }
    
    // Parse the street data
    var streetString = "";
    if (placeString.length > 0) { // Check if anything is left of last section
      addressParts[addressParts.length-1] = placeString;
    } else {
      addressParts.splice(-1,1);
    }
    
    if (addressParts.length > 2) {
      throw 'Can not parse address. More than two address lines.';
    } else if (addressParts.length === 2) {
      //Assume street line is first
      result.addressLine2 = addressParts[1].trim();
      addressParts.splice(-1,1);
      //TODO add more intelligence in case the secondary data is first
    }
    if (addressParts.length === 1) {
      streetString = addressParts[0].trim();
      //Assume street address comes first and the rest is secondary address
      //TODO add more intelligence in case the secondary is first
      var re = new RegExp('\.\*\\b(?:' + Object.keys(usStreetTypes).join('|') + ')\\b', 'i');
      if (streetString.match(re)) {
        result.addressLine1 = streetString.match(re)[0];
        streetString = streetString.replace(re,"").trim(); // Carve off the place name
        if (streetString && streetString.length > 0) {
          // Check if line2 data was already parsed
          if (result.hasOwnProperty('addressLine2') && result.addressLine2.length > 0) {
            throw 'Can not parse address. Invalid street address data.';
          } else {
            result.addressLine2 = streetString;
          }
        }
      } else {
        throw 'Can not parse address. Invalid street address data.';
      }
    } else {
      throw 'Can not parse address. Invalid street address data.';
    }
    
    var streetParts = result.addressLine1.split(' ');

    result.streetNumber = streetParts[0]; // Assume number is first element
    // Assume type is last element
    result.streetSuffix = toTitleCase(usStreetTypes[streetParts[streetParts.length-1].toLowerCase()]);
    result.streetName = streetParts[1]; // Assume street name is everything in the middle
    for (var i = 2; i < streetParts.length-1; i++) {
      result.streetName = result.streetName + " " + streetParts[i];
    }
    result.streetName = toTitleCase(result.streetName);
    result.addressLine1 = [result.streetNumber, result.streetName, result.streetSuffix].join(" ");
    
    return result;
};

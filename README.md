addresser [![Build Status](https://travis-ci.org/moneals/addresser.svg?branch=master)](https://travis-ci.org/moneals/addresser) [![Coverage Status](https://coveralls.io/repos/github/moneals/addresser/badge.svg?branch=master)](https://coveralls.io/github/moneals/addresser?branch=master) [![npm version](https://badge.fury.io/js/addresser.svg)](https://badge.fury.io/js/addresser)
=========

A Node.js library for parsing street addresses.

## Installation

  `npm install addresser`

## Usage

    var addressParser = require('addresser');

    console.log(addressParser("123 Main St, Conway, SC"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina'}
    
    console.log(addressParser("357 Apple St, San Antonio, Texas 78132"));
    
    { streetNumber: '357',
      streetSuffix: 'St',
      streetName: 'Apple',
      placeName: 'San Antonio',
      stateAbbreviation: 'TX',
      stateName: 'Texas',
      zipCode: '78132' }
      
    console.log(addressParser("123 Double  Space    St, Conway, SC 29526"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Double Space',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina',
      zipCode: '29526' }
      
    console.log(addressParser("123 Main St, Conway, south carolina 29526-1234"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina',
      zipCode: '29526',
      zipCodePlusFour: '29526-1234'}
      
    console.log(addressParser("123 Main St, Conway, Texas 29526-1234"));
    
    Can not parse address. City not found or is invalid for specified state.
 
                       
  NOTE: Currently this supports only US addresses.
  
## Features

Addresser will accept an address string and convert it into structured address 
data. Addresser is designed to be flexible and forgiving in terms of the 
formatting of the address string but it does assume a general order of street 
data, city data and state data from left to right.

Addresser will normalize state names and abberviations and can recognize state
data regardless of case or long name vs. abbreviation.

Addresser will validate that the city provided is valid for the given state.
In addition to the data integrity benefits this also allows for more intelligent
parsing logic.

## Upcoming Features

Once the basic parsing capabilities are working well I intend to add a 
feature that will assign a unique id to all addresses based on the parsed
values. Currently there is no easy, universal ID available for property
addresses and this package should help bridge that gap for developers who 
need to cross reference property data across multiple data sources.
    
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding 
style. Add unit tests for any new or changed functionality. Lint and test 
your code.
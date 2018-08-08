addresser [![Build Status](https://travis-ci.org/moneals/addresser.svg?branch=master)](https://travis-ci.org/moneals/addresser) [![Coverage Status](https://coveralls.io/repos/github/moneals/addresser/badge.svg?branch=master)](https://coveralls.io/github/moneals/addresser?branch=master) [![npm version](https://badge.fury.io/js/addresser.svg)](https://badge.fury.io/js/addresser)
=========

A Node.js library for parsing street addresses. Addresser will accept an address
strings and convert it into structured address data. Addresser is designed to be
flexible and forgiving in terms of the formatting of the address string but it
does assume a general order of street data, city and state from left to right.

## Installation

  `npm install addresser`

## Usage

    var addressParser = require('addresser');

    console.log(addressParser("123 Main St, Conway, SC"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      placeName: 'Conway',
      stateAbbreviation: 'SC' }
    
    console.log(addressParser("123 Main St, Conway, SC 29526"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      zipCode: '29526' }
      
    console.log(addressParser("123 Double  Space    St, Conway, SC 29526"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Double Space',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      zipCode: '29526' }
      
    console.log(addressParser("123 Main St, Conway, SC 29526-1234"));
    
    { streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      zipCode: '29526',
      zipCodePlusFour: '29526-1234'}
 
                       
  NOTE: Currently this supports only US addresses.

## Upcoming Features

Once the basic parsing capabilities are working well I intend to add a 
feature that will assign a unique id to all addresses based on the parsed
values. Currently there is no easy, universal ID available for property
addresses and this package should help bridge that gap for developers who 
need this type of ID.
    
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## To Do List
* Handle tabs and newlines as delimiters
* Enhance README to include more parsing examples
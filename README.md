addresser [![Build Status](https://travis-ci.org/moneals/addresser.svg?branch=master)](https://travis-ci.org/moneals/addresser) [![Coverage Status](https://coveralls.io/repos/github/moneals/addresser/badge.svg?branch=master)](https://coveralls.io/github/moneals/addresser?branch=master) [![npm version](https://badge.fury.io/js/addresser.svg)](https://badge.fury.io/js/addresser)
=========

A Node.js library for parsing street addresses.

## Installation

  `npm install addresser`

## Usage

    var addressParser = require('addresser');

    var formattedAddress = addressParser("123 Main St, Conway, SC 29526);
 
   Output should be `{ streetNumber : "123",
                       streetName : "Main",
                       streetSuffix : "St",
                       placeName : "Conway",
                       stateAbbreviations : "SC",
                       zipCode : "29526"}`
                       
  NOTE: Currently this supports only US addresses.

## Upcoming Features

Once the basic parsing capabilities are working well I intend to add a 
featurethat will assign a unique id to all addresses based on the parsed
values. Currently there is no easy, universal ID available for property
addresses and this package should help bridge that gap for developers who need this type of ID.
    
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

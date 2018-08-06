addresser [![Build Status](https://travis-ci.org/moneals/addresser.svg?branch=master)](https://travis-ci.org/moneals/addresser) [![Coverage Status](https://coveralls.io/repos/github/moneals/addresser/badge.svg?branch=master)](https://coveralls.io/github/moneals/addresser?branch=master) [![npm version](https://badge.fury.io/js/addresser.svg)](https://badge.fury.io/js/addresser)
=========

A Node.js library for parsing street addresses.

## Installation

  `npm install addresser`

## Usage

    var addressParser = require('addresser');

    var formattedAddress = addressParser("123 Main St, Conway, SC);
 
  Output should be  `{ streetNumber : "123",
                       streetName : "Main",
                       streetSuffix : "St",
                       placeName : "Conway",
                       stateAbbreviations : "SC"}`
                       
  NOTE: This currently supports only US addresses and this library is a WIP!

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

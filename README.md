addresser [![Build Status](https://travis-ci.org/moneals/addresser.svg?branch=master)](https://travis-ci.org/moneals/addresser) [![Coverage Status](https://coveralls.io/repos/github/moneals/addresser/badge.svg?branch=master)](https://coveralls.io/github/moneals/addresser?branch=master) [![npm version](https://badge.fury.io/js/addresser.svg)](https://badge.fury.io/js/addresser)
=========

A Node.js library for parsing property addresses. Also includes other address utilities such as a function that returns a random city.

## Installation

    npm install addresser

## Usage

    var addresser = require('addresser');
    
    // Isn't confused by duplicate place names
    console.log(addresser.parseAddress("400 South Orange Ave, South Orange , NJ 07079"););
    
    { id: '400-South-Orange-Ave,-South-Orange,-NJ-07079',
      zipCode: '07079',
      stateAbbreviation: 'NJ',
      stateName: 'New Jersey',
      placeName: 'South Orange',
      addressLine1: '400 South Orange Ave',
      streetNumber: '400',
      streetSuffix: 'Ave',
      streetName: 'South Orange' }
    
    // Handles extra whitespace
    console.log(addresser.parseAddress("123 Double  Space    St, Conway, SC 29526"));
    
    { id: '123-Double-Space-St,-Conway,-SC-29526',
      streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Double Space',
      addressLine1: '123 Double Space St',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina',
      zipCode: '29526' }
    
    // normalizes to Title Case  
    console.log(addresser.parseAddress("123 Main St, Conway, south carolina 29526-1234"));
    
    { id: '123-Main-St,-Conway,-SC-29526',
      streetNumber: '123',
      streetSuffix: 'St',
      streetName: 'Main',
      addressLine1: '123 Main St',
      placeName: 'Conway',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina',
      zipCode: '29526',
      zipCodePlusFour: '29526-1234'}
 
    // Handles secondary address lines even without delimiters.
    // Normalizes street types to standard abbreviations.
    console.log(addresser.parseAddress("1301 Columbia College Drive Unit 101 Columbia, SC 29203"));

    { id: '1301-Columbia-College-Dr-Unit-101,-Columbia,-SC-29203',
      zipCode: '29203',
      stateAbbreviation: 'SC',
      stateName: 'South Carolina',
      placeName: 'Columbia',
      addressLine1: '1301 Columbia College Dr',
      addressLine2: 'Unit 101',
      streetNumber: '1301',
      streetSuffix: 'Dr',
      streetName: 'Columbia College' }       
    
    // Handles trailing street directionals  
    console.log(addresser.parseAddress("300 BOYLSTON AVE E SEATTLE WA 98102"));
    { id: '300-Boylston-Ave-E,-Seattle,-WA-98102',
      zipCode: '98102',
      stateAbbreviation: 'WA',
      stateName: 'Washington',
      placeName: 'Seattle',
      addressLine1: '300 Boylston Ave E',
      streetDirection: 'E',
      streetNumber: '300',
      streetSuffix: 'Ave',
      streetName: 'Boylston' }

    // Handles post office boxes 
    console.log(addresser.parseAddress("PO BOX 333 SEATTLE WA 98102"));
    { id: 'PO-BOX-333,-Seattle,-WA-98102',
      zipCode: '98102',
      stateAbbreviation: 'WA',
      stateName: 'Washington',
      placeName: 'Seattle',
      addressLine1: 'PO BOX 333' }

    // Return a random valid city 
    console.log(addresser.randomCity());
    { city: 'Irwin',
      state: 'ID' }

    // Return an object containing all cities
    console.log(addresser.cities());
    { 
      ...
      WI:
        [ 
          'Black River Falls',
          'Heafford Junction',
          'Washington Island',
          ...
        ],
      WY:
        [ 
          'Yellowstone National Park',
          'Saint Stephens',
          'Little America',
          ...
        ]
    } 

NOTE: Currently addresser supports only US addresses.  

## Functions

### parseAddress

parseAddress will accept an address string and convert it into structured address 
data. Addresser is designed to be flexible and forgiving in terms of the 
formatting of the address string but it does assume a general order of street 
data, city data and state data from left to right. parseAddress will normalize
state names and abbreviations and can recognize state data regardless of case or format.

parseAddress will try to validate that the city provided is valid for the given state.
This allows for more intelligent parsing logic when propert delimiters are not used. 
parseAddress also normalizes street types to standard abberviations ie. Drive to Dr, Street to St, etc.

parseAddress creates a unique id for all addresses based on the parsed
values. Currently there is no easy, universal ID available for property
addresses and this package should help bridge that gap for developers who 
need to cross reference property data across multiple data sources.

### getRandomCity

The getRandomCity function can be used to generate a random valid city. This can be helpful
when testing.

### cities

The cities function returns a JSON object that contains a list of all known cities and states. The structure is as follows:
    
    { 
      ...
      WI:
        [ 
          'Black River Falls',
          'Heafford Junction',
          'Washington Island',
          ...
        ],
      WY:
        [ 
          'Yellowstone National Park',
          'Saint Stephens',
          'Little America',
          ...
        ]
    }
    
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding 
style. Add unit tests for any new or changed functionality. Lint and test 
your code.
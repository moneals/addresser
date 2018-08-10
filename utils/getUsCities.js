var request = require('request');
var fs = require('fs');
var unzipper = require('unzipper');
var usStates = require('../data/us-states.json');

unzipper.Open.url(request,'http://download.geonames.org/export/zip/US.zip')
  .then(function(d) {
    var file = d.files.filter(function(d) {
      return d.path === 'US.txt';
    })[0];
    return file.buffer();
  })
  .then(function(d) {
    var cityHash = {};
    for (var key in usStates) {
      cityHash[usStates[key]] = [];
    }
    console.log(cityHash);
    var citiesData = d.toString().split("\n");
    citiesData.forEach(function(element) {
      var cityData = element.split('\t');
      //console.log(cityData[2] + ", " + cityData[4]);
      if (cityData[4] && cityData[4].length == 2) {
        cityHash[cityData[4]].push(cityData[2]);
      }
    });
    //Remove duplicates and sort from longest to shortest
    for (var key in cityHash) {
      var uSet = new Set(cityHash[key]);
      cityHash[key]= [...uSet];
      cityHash[key].sort(function(a, b) {
        return b.length - a.length;
      });
    }
    fs.writeFile('../data/us-cities.json', JSON.stringify(cityHash), 'utf8', function() {
      console.log(cityHash);
    });

  });
  
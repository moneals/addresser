var request = require('request');
var fs = require('fs');
var unzipper = require('unzipper');

function getDataForCountry(country_code){
  let country_code_lower = country_code.toLowerCase();
  let country_code_upper = country_code.toUpperCase();
  var states = JSON.parse(fs.readFileSync("../data/"+country_code_lower+"-states.json"));

  unzipper.Open.url(request,'http://download.geonames.org/export/zip/'+country_code_upper+'.zip')
    .then(function(d) {
      var file = d.files.filter(function(d) {
        return d.path === country_code_upper+'.txt';
      })[0];
      return file.buffer();
    })
    .then(function(d) {
      var cityHash = {};
      for (var key in states) {
        cityHash[states[key]] = [];
      }
      console.log(cityHash);
      var citiesData = d.toString().split("\n");
      citiesData.forEach(function(element) {
        var cityData = element.split('\t');
        //console.log(cityData[2] + ", " + cityData[4]);
        let city = cityData[2]; // Default US data
        // If Canadian data, it is structured differently
        if (country_code_upper === 'CA') {
          city = cityData[7] || cityData[5] || cityData[2];
        }        
        if (cityData[4] && cityData[4].length == 2 && cityHash.hasOwnProperty(cityData[4])) {
          cityHash[cityData[4]].push(city);
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
      fs.writeFile('../data/'+country_code_lower+'-cities.json', JSON.stringify(cityHash), 'utf8', function() {
        console.log(cityHash);
      });

    });
}

function mergeFiles(inputs, output){
  let answer = inputs.reduce(function(result, current){
    let items = JSON.parse(fs.readFileSync(current));
    return Object.assign(result, items);
  }, {});
  fs.writeFile(output, JSON.stringify(answer), 'utf8', function(){
    console.log(answer);
  });
}

getDataForCountry("CA");
getDataForCountry("US");

mergeFiles(["../data/us-cities.json", "../data/ca-cities.json"], "../data/cities.json");
mergeFiles(["../data/us-states.json", "../data/ca-states.json"], "../data/states.json");



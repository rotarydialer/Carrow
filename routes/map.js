var express = require('express');
var router = express.Router();
var googlemaps = require('googlemaps');
var geocoder = require('geocoder');

var publicConfig = {
    key: 'AIzaSyBXDUQZ7EOVrbsWA2ee5ORX7U0MrbC3DME',
    stagger_time:       1000, // for elevationPath 
    encode_polylines:   false,
    secure:             true // use https 
    //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};

var gmAPI = new googlemaps(publicConfig);

/* Show a map! */
router.get('/', function(req, res, next) {
    // geocoder - "My location"
    var startingLocation = '530 Valley Rd, Montclair, NJ, USA';
    geocoder.geocode(startingLocation, function(err, result) {

        console.log("geocode results...");
        var lat = result.results[0].geometry.location.lat;
        var lng = result.results[0].geometry.location.lng;

        console.log(startingLocation + ':');
        console.log('  ├─ lattitude: ' + lat);
        console.log('  └─ longitude: ' + lng);
        console.log(result.results);

        res.send(result);
    });
    
});

router.get('/gmapi', function(req, res, next) {

    // geocode API 
    var geocodeParams = {
        "address":    "530 Valley Rd, Montclair, NJ, USA"
    };
    
    gmAPI.geocode(geocodeParams, function(err, result){
        var lat = result.results[0].geometry.location.lat;
        var lng = result.results[0].geometry.location.lng;

        console.log(geocodeParams.address + ':');
        console.log('  ├─ lattitude: ' + lat);
        console.log('  └─ longitude: ' + lng);

        res.send(result);
    });

});

module.exports = router;
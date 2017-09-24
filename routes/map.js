var express = require('express');
var googlemaps = require('googlemaps');
var router = express.Router();

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
    console.log('Starting some map stuff');

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
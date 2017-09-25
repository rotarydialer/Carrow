var express = require('express');
var router = express.Router();
var googlemaps = require('googlemaps');
var geocoder = require('geocoder');
var geojson = require('geojson');
var pandas = require('pandas-js');

var startingLocation ='530 Valley Rd, Montclair, NJ';

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
    geocoder.geocode(startingLocation, function(err, result) {

        console.log('geocoder results...');
        var street = startingLocation;
        var lat = result.results[0].geometry.location.lat;
        var lng = result.results[0].geometry.location.lng;

        console.log(startingLocation + ':');
        console.log('  ├─ lattitude: ' + lat);
        console.log('  └─ longitude: ' + lng);

        // console.log('Unformatted:');
        // console.log(result.results);

        var data = { 
            'name': 'My Location',
            'category': 'User', 
            'street': street, 
            'lat': lat, 
            'lng': lng 
        };
        
        var geojsonResult = geojson.parse(data, 
            { 
                Point: ['lat', 'lng'],
                include: ['name', 'category']
            });

        console.log('GeoJSON formatted:');
        console.log(geojsonResult);

        res.send(geojsonResult);
    });
    
});

router.get('/pandas', function(req, res, next) {
    // test and tinker with pandas

    var ds = new pandas.Series([1, 2, 3, 4], {name: 'My test name', index: [2, 3, 4, 5]});
    ds.toString();

    res.send(ds.toString());

});

router.get('/geojson', function(req, res, next) {
    // test and tinker here
    geocoder.geocode(startingLocation, function(err, result) {
        
        console.log('GeoJSON preformat:');
        var street = result.results[0].address_components[1].short_name; //can't rely on this now, can we?
        var lat = result.results[0].geometry.location.lat;
        var lng = result.results[0].geometry.location.lng;

        console.log(startingLocation + ':');
        console.log('  ├─ street: ' + street);
        console.log('  ├─ lattitude: ' + lat);
        console.log('  └─ longitude: ' + lng);

        // TODO: assemble this properly later
        var data = [
            { 
                'name': 'My Location',
                'category': 'User', 
                'street': street, 
                'lat': lat, 
                'lng': lng 
            }
        ];

        console.log('Sending this:');
        console.log(data);

        var geojsonResult = geojson.parse(data, 
            { 
                Point: ['lat', 'lng']
            });

        console.log(geojsonResult);

        res.send(geojsonResult);
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
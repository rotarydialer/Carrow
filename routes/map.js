var express = require('express');
var router = express.Router();
var googlemaps = require('googlemaps');
var geocoder = require('geocoder');
var geojson = require('geojson');

var startingLocation ='523 Linden St, Scranton, PA 18503';

var publicConfig = {
    key: 'AIzaSyBXDUQZ7EOVrbsWA2ee5ORX7U0MrbC3DME',
    stagger_time:       1000, // for elevationPath 
    encode_polylines:   false,
    secure:             true // use https 
    //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
};

var gmAPI = new googlemaps(publicConfig);

/* Show a map! */
router.get('/', function(req, res) {
    res.render('map', { title: 'Carrow: Map' });
});

/* Show a map based on an address entered by a user */
router.post('/', function(req, res) {
    startingLocation = req.body.search;
    res.render('map', { title: 'Carrow: ' + startingLocation, userlocation: startingLocation });
});

router.get('/geocoder', function(req, res, next) {
    geocoder.geocode(startingLocation, function(err, result) {

        console.log('geocoder results...');
        var street = startingLocation;
        var lat = result.results[0].geometry.location.lat;
        var lng = result.results[0].geometry.location.lng;

        console.log(startingLocation + ':');
        console.log('  ├─ lattitude: ' + lat);
        console.log('  └─ longitude: ' + lng);

        var data = { 
            'name': 'Not used right now',
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

router.get('/userlocation', function(req, res, next) {
    // return the user's location
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
                'name': 'You are here',
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

router.get('/cars' , function(req, res, next) {

    var foundCars = [5];

    // TODO: get actual data!
    // fake Scranton
    // foundCars[0] = { 'lat':'41.409226','lng': '-75.660923', 'name': 'Honda Civic', 'status': 'available', 'owner': 'Sylvia' };
    // foundCars[1] = { 'lat':'41.409897','lng': '-75.664530', 'name': 'Nissan Maxima', 'status': 'claimed', 'owner': 'Phil' };
    // foundCars[2] = { 'lat':'41.412780','lng': '-75.666083', 'name': 'Porsche Cayenne', 'status': 'available', 'owner': 'Trevor' };
    // foundCars[3] = { 'lat':'41.409019','lng': '-75.656800', 'name': 'Tesla Model X P100D', 'status': 'available', 'owner': 'Cynthia' };
    // foundCars[4] = { 'lat':'41.409409','lng': '-75.670819', 'name': 'Yugo GV Sport', 'status': 'claimed', 'owner': 'Oliver' };    foundCars[0] = { 'lat':'41.409226','lng': '-75.660923', 'name': 'Honda Civic', 'status': 'available', 'owner': 'Sylvia' };

    // fake Montclair
    foundCars[0] = { 'lat':'40.864828','lng': '-74.194615', 'name': 'Honda Civic', 'loc_desc': 'MSU parking lot near the stadium', 'status': 'available', 'owner': 'Sylvia' };
    foundCars[1] = { 'lat':'40.857688','lng': '-74.202161', 'name': 'Nissan Maxima', 'loc_desc': 'Montclair Heights station parking lot', 'status': 'claimed', 'owner': 'Phil' };
    foundCars[2] = { 'lat':'40.856992','lng': '-74.200910', 'name': 'Porsche Cayenne', 'loc_desc': 'My driveway on Hamilton', 'status': 'available', 'owner': 'Trevor' };
    foundCars[3] = { 'lat':'40.848576','lng': '-74.205249', 'name': 'Tesla Model X P100D', 'loc_desc': 'Mountain Ave station', 'status': 'available', 'owner': 'Cynthia' };
    foundCars[4] = { 'lat':'40.852259','lng': '-74.200761', 'name': 'Yugo GV Sport', 'loc_desc': 'Macopin - on the street in front of my house', 'status': 'claimed', 'owner': 'Oliver' };

    console.log('found cars: ' + JSON.stringify(foundCars[0]) );

    var geojsonResult = geojson.parse(foundCars, 
        { 
            Point: ['lat', 'lng'],
            extra: {
                'category': 'car'
            }
        });

    console.log('geojsonResult: ' + geojsonResult );

    res.send(geojsonResult);
});

router.get('/gmapi', function(req, res, next) {

    var geocodeParams = {
        "address":    "523 Linden St, Scranton, PA 18503"
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
var express = require('express');
var fs = require('fs');
var app = express();
var request = require('request');
var GoogleMapsLoader = require('google-maps'); // only for common js environments 
var charters = require('./charters.json');

var chartersWithLatLng = [];

// var publicConfig = {
//   key: 'AIzaSyAgU_LfidwIssBRshuIpVollEKRvML65VU',
//   stagger_time:       1000, // for elevationPath
//   encode_polylines:   false,
//   secure:             true // use https
// };
// var gmAPI = new GoogleMapsAPI(publicConfig);

GoogleMapsLoader.load(function(google) {
    
});

function getCoordinates(addresses) {
    var coords = [];
    for (var i = 0; i < addresses.length; i++) {
        currAddress = addresses[i].address;
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({'address':currAddress}, function(results, status) {
                if (status == geocoder.GeocoderStatus.OK) {
                    coords.push(results[0].geometry.location);

                    // Check if all calls have been processed
                    if (coords.length == addresses.length) {
                        console.log("All addresses have been processed");
                    }
                }
            });
        }
    }
}

function someOtherFunction(coords) {
    // Geocoding has been done for all addresses
}

var addresses = [];
for (var i = 0; i < charters.charterSchools.length; i++)
{
    addresses.push(charters.charterSchools[i].address);
}
//console.log(addresses);






// for (var i = 0; i < charters.charterSchools.length; i++)
// {
//     // save first charter address: charters.charterSchools[0].address
//     // pass address to gmap geocoder
//     // save return coodrinates
//     var geocodeParams = {
//       "address":    charters.charterSchools[i].address,
//       "language":   "en"
//     };

//     gmAPI.geocode(geocodeParams, function(err, data){
//         if (data != undefined)
//         {
//             console.log(charters.charterSchools[i].schoolName + ": " + data.results[0].geometry.location);
//             // charters.charterSchools[i].loc = data.results[0].geometry.location;
//             // chartersWithLatLng.push(charters.charterSchools[i]);
//         } 
//         else {
//             console.log(charters.charterSchools[i]);
//         }
      
//     });
//     //console.log(chartersWithLatLng[i]);

// }








app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
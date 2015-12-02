$(document).ready(function () {

    

    function getCoordinates(addresses, schools) {
        var coords = [];
            var i = 0;
            var timedFunction = setInterval(function () {
                currAddress = addresses[i];
                var geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({'address':currAddress}, function(results, status) {
                        //console.log(status);
                        if (status == 'OK') {
                            console.log(status);
                            coords.push(results[0].geometry.location);
                            // Check if all calls have been processed
                                           
                        } else {console.log(status)}
                    });
                }
                i += 1;
                if (i > addresses.length)
                {
                    console.log("All addresses have been processed");
                    console.log("COordinates:", coords);
                    postCoordinates(coords, schools);
                    clearInterval(timedFunction);
                }
            }, 1000);
        
    }

    function postCoordinates(coords, schools) {
        // Geocoding has been done for all addresses
        // var map, currentLatLng;
        // map = new google.maps.Map(document.getElementById('map'), {
        //     center: {lat: 36.220244, lng: -86.7807823},  
        //     zoom: 10
        //   });

        // Loop through coords & schools, adding each set of coords to each charter object.
        for (var j = 0; j < coords.length; j++) {
            currentLatLng = {lat: coords[j].lat(), lng: coords[j].lng()};
            schools[j].latLng = currentLatLng;
        }

        console.log(schools);

        $.ajax({
            method: "POST",
            url: "./",
            data: {schools},
            dataType: "json"
        })
        .done(function (response) {
            //console.log(response);
        })


        // ****** places all coordinates in markers on map:

        // var marker;
        // for (var j = 0; j < coords.length; j++) {
        //     console.log(coords[j].lat(), coords[j].lng());
        //     //currentLatLng = [coords[j].lat(), lng: coords[j].lng()}
        //     marker = new google.maps.Marker({
        //         position: new google.maps.LatLng(coords[j].lat(), coords[j].lng()),
        //         map: map
        //     });
        // }

    }



    // $.ajax({
    //     url: 'charters.json'
    // })
    // .done(function (charters) {
    //     var addresses = [];
    //     for (var i = 0; i < charters.charterSchools.length; i++)
    //     {
    //         addresses.push(charters.charterSchools[i].address);
    //     }
    //     // console.log(addresses);
    //     charters = charters.charterSchools;
    //     //console.log(charters);
    //     getCoordinates(addresses, charters);

        
    // })

    $.ajax({
        url: 'elementarySchools.json'
    })
    .done(function (elSchools) {
        var addresses = [];
        for (var i = 0; i < elSchools.length; i++)
        {
            addresses.push(elSchools[i].address);
        }
        // console.log(addresses);
        getCoordinates(addresses, elSchools);

        
    })


})

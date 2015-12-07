$(document).ready(function () {

    function postModifiedJSON (charterSchoolData) {
        $.ajax({
            method: "POST",
            url: "./",
            data: {charterSchoolData},
            dataType: "json"
        })
        .done(function (response) {
            //console.log(response);
        })
    }

    $.ajax({
        url: 'charterSchoolsWithLatLng.json'
    })
    .done(function (schools) {
        var  charters = schools.charters;
        var modifiedJson = [];
        //console.log(charters);
        for (var i=0; i < charters.length; i++)
        {

            var currentAddress = charters[i].address;
            if (currentAddress[currentAddress.length-1] == " ") 
            {
                currentAddress = currentAddress.slice(0, -1);

            };
            var splitAddressArray = currentAddress.split(" ");
            var currentZip = splitAddressArray[splitAddressArray.length-1];
            var currentCity = splitAddressArray[splitAddressArray.length-3]
            var currentAddressLine1 = splitAddressArray.slice(0,splitAddressArray.length-3).join(" ");
            var currentSchoolLevel;

            //School level:
            if (charters[i].grades.match(/^[567]/))
            {
                console.log("Middle school: ", charters[i]);
                currentSchoolLevel = "Middle";
            }
            else if (charters[i].grades.match(/^[K12]/))
            {
                console.log("El school: ", charters[i]);
                currentSchoolLevel = "Elementary";
            } else if (charters[i].grades.match(/^[9]/))
            {
                console.log("High school: ", charters[i]);
                currentSchoolLevel = "High";
            }
            // console.log(i)

            modifiedJson.push({
                name: charters[i].schoolName,
                grades: charters[i].grades,
                addressLine1: currentAddressLine1,
                city: currentCity,
                state: "TN",
                zip: currentZip,
                link: charters[i].link,
                phone: charters[i].phone,
                lat: charters[i].latLng.lat,
                lng: charters[i].latLng.lng,
                schoolLevel: currentSchoolLevel,
                schoolType: "Charter"
            })
        }
        //console.log(modifiedJson);

        postModifiedJSON(modifiedJson);

        

        
    })

});
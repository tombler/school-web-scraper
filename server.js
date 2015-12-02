var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
// var EventEmitter = require('events');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// *******************CHARTERS ************************* //

// app.get('/', function(req, res){

//   //All the web scraping magic will happen here
//   // The URL we will scrape from - in our example Anchorman 2.

//     url = 'http://tnchartercenter.org/families/nashville/';


//     request(url, function(error, response, html){

//         // First we'll check to make sure no errors occurred when making the request

//         if(!error){
//             // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

//             var $ = cheerio.load(html);
//             //console.log(html);
//             // // Finally, we'll define the variables we're going to capture

//             var schoolName, link, phone, address, grades;
//             var jsonCharters = { charterSchools: [] };

//             // We'll use the unique header class as a starting point.

//             var schoolsArray = $('tbody').children();

//             for (var i = 0; i < schoolsArray.length; i++)
//             {
                
//                 schoolName = $(schoolsArray[i]).children().children('a').text();
//                 link = $(schoolsArray[i]).children().children('a').attr('href');
//                 phone = $(schoolsArray[i]).children(':nth-of-type(2)').text();
//                 address = $(schoolsArray[i]).children(':nth-of-type(3)').text();
//                 grades = $(schoolsArray[i]).children(':nth-of-type(4)').text();
                
//                 var schoolToAdd = {
//                     schoolName: schoolName,
//                     link: link,
//                     phone: phone,
//                     address: address,
//                     grades: grades
//                 }
//                 jsonCharters.charterSchools.push(schoolToAdd);
//             }
//             console.log(jsonCharters);

//             // // To write to the system we will use the built in 'fs' library.
//             // // In this example we will pass 3 parameters to the writeFile function
//             // // Parameter 1 :  output.json - this is what the created filename will be called
//             // // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
//             // // Parameter 3 :  callback function - a callback function to let us know the status of our function

//             fs.writeFile('charters.json', JSON.stringify(jsonCharters, null, 4), function(err){

//                 console.log('File successfully written! - Check project directory for the output.json file');

//             })

//             // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//             res.send('Check your console!')

//         } else 
//         {
//             console.log(error)
//         }
//     })
// })

// *******************DISTRICT ELEMENTARY ************************* //

// app.get('/', function(req, res){

//     url = 'http://www.mnps.org/pages/mnps/About_Us/MNPS_Schools/Elementary_Schools/Elementary_School_List';
//     request({uri: url, jar: true}, function(error, response, html){
        
//         if(!error){
//             var $ = cheerio.load(html);
//             //console.log(html);
//             var schoolName, link, phone, address, principal;
//             var elSchoolsArray = $('#docViewBoxMainCell8845358563379663812').find('tbody').children();

//             for (var i = 0; i < elSchoolsArray.length; i++)
//             {
    
//                 schoolName = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().children().text();
//                 link = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().attr('href');
//                 phone = $(elSchoolsArray[i]).children('td:nth-of-type(3)').text();
//                 address = $(elSchoolsArray[i]).children('td:nth-of-type(2)').text();
//                 principal = $(elSchoolsArray[i]).children('td:nth-of-type(4)').text();

//                 if (schoolName === '' || schoolName === undefined || schoolName === "Profile")
//                 {
//                     var exception1 = $(elSchoolsArray[i]).children('td:first-of-type').children().children('a').children().text();
//                     var exception2 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').text();
//                     var exception3 = $(elSchoolsArray[i]).children('td:first-of-type').children().children().children('a').text();
//                     var exception4 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().text();
//                     var exception5 = $(elSchoolsArray[i]).children('td:first-of-type').children().children().text();
//                     var exception6 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children('a').text();
                    
//                     if (exception1.length > 0)
//                     {
//                         schoolName = exception1;
//                         link = $(elSchoolsArray[i]).children('td:first-of-type').children().children('a').attr('href');
//                         //console.log("Exception1 caught: ", schoolName);
//                     } else if (exception2.length > 0)
//                     {
//                         schoolName = exception2;
//                         link = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').attr('href');
//                         //console.log("Exception2 caught: ", schoolName);
//                     } else if (exception3.length > 0)
//                     {
//                         schoolName = exception3;
//                         link = $(elSchoolsArray[i]).children('td:first-of-type').children().children().children('a').attr('href');
//                         //console.log("Exception3 caught: ", schoolName);
//                     } else if (exception4.length > 0)
//                     {
//                         schoolName = exception4;
//                         //console.log("Exception4 caught: ", schoolName);
//                     } else if (exception5.length > 0)
//                     {
//                         schoolName = exception5;
//                         //console.log("Exception5 caught: ", schoolName);
//                     } else if (exception6.length > 0)
//                     {
//                         schoolName = exception6;
//                         //console.log("Exception5 caught: ", schoolName);
//                     }

//                 }

//                 var schoolToAdd = {
//                     schoolName: schoolName,
//                     link: link,
//                     phone: phone,
//                     address: address,
//                     principal: principal
//                 }

//                 if (schoolName !== "" && link !== undefined)
//                 {
//                     // push school to array
//                     jsonDistrictSchools.districtSchools[0].elementarySchools.push(schoolToAdd);
//                 }
//             }
//             console.log(jsonDistrictSchools.districtSchools[0].elementarySchools);
//             fs.writeFile('elementarySchools.json', JSON.stringify(jsonDistrictSchools.districtSchools[0].elementarySchools, null, 4), function(err){

//                 console.log('File successfully written! - Check project directory for the output.json file');

//             })

//                 // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//                 res.send('Check your console!')
//         }
//         else 
//         {
//             console.log(error);
//         }
//     })


// })

// ******************* HIGH SCHOOLS ************************* //

app.get('/', function(req, res){

    var url = 'http://www.mnps.org/pages/mnps/About_Us/MNPS_Schools/Middle_Schools';
    // var options = {
    //   headers: {'user-agent': 'node.js'},
    //   jar: true
    // }

    request({uri: url, jar: true}, function (error, response, html) {
        if (!error) {
            
        }
    })


    // request({uri: url, jar: true}, function(error, response, html){
        
    //     if(!error){
    //         var $ = cheerio.load(html, {
    //             decodeEntities: true
    //         });
    //         //console.log(html);
    //         var schoolName, link, phone, address, principal;
    //         var iFrame = $('iframe#iFrame_edlElement_8845358563396832276_document');
    //         setTimeout(function () {
    //             var testName = $('#docViewBodyMainCell8845358563396832276').find('tbody').children('tr:first-of-type').children('td:first-of-type').text();
    //             console.log(testName);
    //         }, 5000);
    //     }
    //     else 
    //     {
    //         console.log(error);
    //     }
    // })
})


// ************ Post call to write charterSchools file
// app.post('/', function (req, res) {
    
//     console.log(req.body);
//     fs.writeFile('charterSchoolsWithLatLng.json', JSON.stringify(req.body, null, 4), function(err){

//         console.log('File successfully written! - Check project directory for the output.json file');

//     })

//     // db.contactlist.insert(req.body, function (err, docs) {
//     //     res.json(docs);
//     // });
// });



// ************ Post call to write json file
// app.post('/', function (req, res) {
    
//     console.log(req.body);
//     fs.writeFile('elSchoolsWithLatLng.json', JSON.stringify(req.body, null, 4), function(err){

//         console.log('File successfully written! - Check project directory for the output.json file');

//     })
// });



app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
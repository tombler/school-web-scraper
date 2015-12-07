// *******************CHARTERS ************************* //

app.get('/', function(req, res){

    url = 'http://tnchartercenter.org/families/nashville/';


    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            //console.log(html);
            // // Finally, we'll define the variables we're going to capture

            var schoolName, link, phone, address, grades;
            var jsonCharters = { charterSchools: [] };

            // We'll use the unique header class as a starting point.

            var schoolsArray = $('tbody').children();

            for (var i = 0; i < schoolsArray.length; i++)
            {
                
                schoolName = $(schoolsArray[i]).children().children('a').text();
                link = $(schoolsArray[i]).children().children('a').attr('href');
                phone = $(schoolsArray[i]).children(':nth-of-type(2)').text();
                address = $(schoolsArray[i]).children(':nth-of-type(3)').text();
                grades = $(schoolsArray[i]).children(':nth-of-type(4)').text();
                
                var schoolToAdd = {
                    schoolName: schoolName,
                    link: link,
                    phone: phone,
                    address: address,
                    grades: grades
                }
                jsonCharters.charterSchools.push(schoolToAdd);
            }
            console.log(jsonCharters);

            // // To write to the system we will use the built in 'fs' library.
            // // pass 3 parameters to the writeFile function
            // // Parameter 1 :  output.json - this is what the created filename will be called
            // // Parameter 2 :  JSON.stringify(json, null, 4) - make JSON easier to read
            // // Parameter 3 :  callback function - a callback function to let us know the status of our function

            fs.writeFile('charters.json', JSON.stringify(jsonCharters, null, 4), function(err){

                console.log('File successfully written! - Check project directory for the output.json file');

            })

            // Send message to browser (data in console.)
            res.send('Check your console!')

        } else 
        {
            console.log(error)
        }
    })
})
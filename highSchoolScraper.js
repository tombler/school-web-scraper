// *******************  HIGH SCHOOLS ************************* //

app.get('/', function(req, res){
    var highSchools = [];
    var url = 'http://www.mnps.org/pages/mnps/About_Us/MNPS_Schools/High_Schools';

    console.log("hello")
    request({uri: url, jar: true}, function(error, response, html){
        
        if(!error){
            var $ = cheerio.load(html);
            //console.log(html);
            var schoolName, link, phone, address, principal;
            var document2 = $('iFrame')[1];
            var src = $(document2).attr('src');
            
            request({uri: src, jar: true}, function(error, response, html){
                var $ = cheerio.load(html);
                console.log(html);
                $('tbody').find('tr:')
                var table2 = $(document2).find('table')[2];
                var test = $(table2).children().children('tr:first-of-type').children('td:first-of-type').text();

                console.log(test);
                var $ = cheerio.load(html);
                //console.log(html);
                var schoolsArray = $('table:nth-child(2)').children('tbody').children('tr');

                for (var i=0; i < schoolsArray.length; i++) {
                    schoolName = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().children().text();
                    console.log(schoolName);
                    link = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().attr('href');
                    phone = $(schoolsArray[i]).children('td:nth-of-type(3)').text();
                    address = $(schoolsArray[i]).children('td:nth-of-type(2)').text();
                    principal = $(schoolsArray[i]).children('td:nth-of-type(4)').text();

                    if (schoolName === '' || schoolName === undefined || schoolName === "Profile")
                    {
                        var exception1 = $(schoolsArray[i]).children('td:first-of-type').children().children('a').children().text();
                        var exception2 = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').text();
                        var exception3 = $(schoolsArray[i]).children('td:first-of-type').children().children().children('a').text();
                        var exception4 = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().text();
                        var exception5 = $(schoolsArray[i]).children('td:first-of-type').children().children().text();
                        var exception6 = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children('a').text();
                        
                        if (exception1.length > 0)
                        {
                            schoolName = exception1;
                            link = $(schoolsArray[i]).children('td:first-of-type').children().children('a').attr('href');
                            //console.log("Exception1 caught: ", schoolName);
                        } else if (exception2.length > 0)
                        {
                            schoolName = exception2;
                            link = $(schoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').attr('href');
                            //console.log("Exception2 caught: ", schoolName);
                        } else if (exception3.length > 0)
                        {
                            schoolName = exception3;
                            link = $(schoolsArray[i]).children('td:first-of-type').children().children().children('a').attr('href');
                            //console.log("Exception3 caught: ", schoolName);
                        } else if (exception4.length > 0)
                        {
                            schoolName = exception4;
                            //console.log("Exception4 caught: ", schoolName);
                        } else if (exception5.length > 0)
                        {
                            schoolName = exception5;
                            //console.log("Exception5 caught: ", schoolName);
                        } else if (exception6.length > 0)
                        {
                            schoolName = exception6;
                            //console.log("Exception5 caught: ", schoolName);
                        }

                    }

                    var schoolToAdd = {
                        schoolName: schoolName,
                        link: link,
                        phone: phone,
                        address: address,
                        principal: principal
                    }
                    //console.log(schoolToAdd);
                    if (schoolName !== "")
                    {
                        // push school to array
                        highSchools.push(schoolToAdd);
                    }
                }
                fs.writeFile('highSchools.json', JSON.stringify(highSchools, null, 4), function(err){

                    console.log('File successfully written! - Check project directory for the json file');

                })

                    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
                    res.send('Check your console!')
                
            })
        }
        else 
        {
            console.log(error);
        }
    })


})
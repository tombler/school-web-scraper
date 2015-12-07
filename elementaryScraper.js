// *******************DISTRICT ELEMENTARY ************************* //

app.get('/', function(req, res){

    url = 'http://www.mnps.org/pages/mnps/About_Us/MNPS_Schools/Elementary_Schools/Elementary_School_List';
    request({uri: url, jar: true}, function(error, response, html){
        
        if(!error){
            var $ = cheerio.load(html);
            //console.log(html);
            var schoolName, link, phone, address, principal;
            var elSchoolsArray = $('#docViewBoxMainCell8845358563379663812').find('tbody').children();

            for (var i = 0; i < elSchoolsArray.length; i++)
            {
    
                schoolName = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().children().text();
                link = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().attr('href');
                phone = $(elSchoolsArray[i]).children('td:nth-of-type(3)').text();
                address = $(elSchoolsArray[i]).children('td:nth-of-type(2)').text();
                principal = $(elSchoolsArray[i]).children('td:nth-of-type(4)').text();

                if (schoolName === '' || schoolName === undefined || schoolName === "Profile")
                {
                    var exception1 = $(elSchoolsArray[i]).children('td:first-of-type').children().children('a').children().text();
                    var exception2 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').text();
                    var exception3 = $(elSchoolsArray[i]).children('td:first-of-type').children().children().children('a').text();
                    var exception4 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children().text();
                    var exception5 = $(elSchoolsArray[i]).children('td:first-of-type').children().children().text();
                    var exception6 = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children('a').text();
                    
                    if (exception1.length > 0)
                    {
                        schoolName = exception1;
                        link = $(elSchoolsArray[i]).children('td:first-of-type').children().children('a').attr('href');
                        //console.log("Exception1 caught: ", schoolName);
                    } else if (exception2.length > 0)
                    {
                        schoolName = exception2;
                        link = $(elSchoolsArray[i]).children('td:first-of-type').children('p:first-of-type').children().children('a').attr('href');
                        //console.log("Exception2 caught: ", schoolName);
                    } else if (exception3.length > 0)
                    {
                        schoolName = exception3;
                        link = $(elSchoolsArray[i]).children('td:first-of-type').children().children().children('a').attr('href');
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

                if (schoolName !== "" && link !== undefined)
                {
                    // push school to array
                    jsonDistrictSchools.districtSchools[0].elementarySchools.push(schoolToAdd);
                }
            }
            console.log(jsonDistrictSchools.districtSchools[0].elementarySchools);
            fs.writeFile('elementarySchools.json', JSON.stringify(jsonDistrictSchools.districtSchools[0].elementarySchools, null, 4), function(err){

                console.log('File successfully written! - Check project directory for the output.json file');

            })

                // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
                res.send('Check your console!')
        }
        else 
        {
            console.log(error);
        }
    })


})
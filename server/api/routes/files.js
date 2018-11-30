//require express library
var express = require('express');
//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require('multer');
// For file system operations
const fs = require('fs');

// Handles storing the file
const storage = multer.diskStorage({
    // set the directory for the uploads to the uploaded to
    // The destination is the angular one
    destination: function(req, file, cb) {
        cb(null, './src/assets/');
    },
    filename: function(req, file, cb) {
        currentDate = new Date();
        
        // cb(null, currentDate.getMonth() + '-' + currentDate.getDate() + '-' +  currentDate.getFullYear() + '-' + file.originalname );
        cb(null, file.originalname );
    }
});

// Creates
var upload = multer({storage: storage}).single('csv');
// Function to write to a file
// Returns a promise
function readFile(srcPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(srcPath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    })
}
// Function to write to a file
// Returns a promise
function writeFile(savPath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(savPath, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
}


// Write function that gets csv file and converts it into a json file
function csv_to_json(filename){
    // readFile('./src/assets/WEDdatafile.csv').then(results => {
    readFile('./src/assets/' + filename).then(results => {
        let data = {
            YEARS: []
        }
        // First split the result line by line
        let split_by_lines = results.toString().split('\r\n');
        // Loops through every line
        for (let i = 1; i < split_by_lines.length -1; i++){
            // Split every line by comma
            let comma_split = split_by_lines[i].split(',');
    
            // All data is made up of an array of years
            let current_year = comma_split[2];
            // All years are made up of an array of categories
            let current_category = comma_split[1];
            // All categories are made up of an array of countries
            let current_country = comma_split[0];
    
            // All countries are made up of the following attributes
            let current_nominalgdp = comma_split[3];
            let current_realgdp = comma_split[4];
            let current_nominalgdpgrowth = comma_split[5];
            let current_realgdpgrowth = comma_split[6];
            let current_gdpppp = comma_split[7];
            let current_population = comma_split[8];
            let current_populationgrowth = comma_split[9];
            let current_consumerspending = comma_split[10];
            let current_easeofdoingbusiness = comma_split[11];
            let current_unemployment = comma_split[12];
            let current_retailsalesgrowth = comma_split[13];
    
            // Creating objects to add to json result object
            let current_year_object = {
                Year: current_year,
                CATEGORIES: []
            }
            let current_category_object = {
                Category: current_category,
                COUNTRIES: []
            }
            let current_country_object = {
                name: current_country,
                nominalGDP: current_nominalgdp,
                realGDP: current_realgdp,
                nominalGDPGrowth: current_nominalgdpgrowth,
                realGDPGrowth: current_realgdpgrowth,
                gdpPpp: current_gdpppp,
                population: current_population,
                populationGrowth: current_populationgrowth,
                consumerSpending: current_consumerspending,
                easeOfDoingBusiness: current_easeofdoingbusiness,
                unemployment: current_unemployment,
                retailSalesGrowth: current_retailsalesgrowth
            }
    
            // Sees if the current year exists within the year array
            let year_object = data.YEARS.find( obj => obj.Year == current_year);
            // If not push it to the array of years
            if (typeof year_object == "undefined"){
                data.YEARS.push(current_year_object);
                year_object = data.YEARS.find( obj => obj.Year == current_year);
            }
            // Sees if the current category exists within the category array
            let category_object = year_object.CATEGORIES.find( obj => obj.Category == current_category );
            // If not push it to the array of categories
            if (typeof category_object == "undefined"){
                year_object.CATEGORIES.push(current_category_object);
                category_object = year_object.CATEGORIES.find( obj => obj.Category == current_category );
            }
            // Sees if the current country exists within the countryarray
            let country_object = category_object.COUNTRIES.find( obj => obj.name == current_country );
            // If not push it to the array of countries
            if (typeof country_object == "undefined"){
                category_object.COUNTRIES.push(current_country_object);
                country_object = category_object.COUNTRIES.find( obj => obj.name == current_country );
            }    
        }
        // return writeFile('./src/assets/output.json',JSON.stringify(data));
        // Writes to the economies.json file the csv data in a beautified manner
        writeFile('./src/assets/data/economies.json',JSON.stringify(data, null, '\t'));
     }).then(() =>{

        //done writing file, can do other things
        console.log('Done!')
     })
}




// Handles uploading and calls for conversion
router.post('/', (req, res, next) => {
    var path = '';
    var name = 'testname'
    upload(req, res, (err) => {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("An Error Occured! ")
        }
        // No error occured.
        path = req.file.path;
        name = req.file.originalname;
        if (res.status(200)) {
            console.log(name);
            csv_to_json(name);
        }
        
        // console.log('Here!')
        return res.status(200).send("Upload Completed for "+ name); 
    })
        
});

module.exports = router;
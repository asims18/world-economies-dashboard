/**
 * This file is a controller of the the csv files uploaded to node js server
 * Author: Asim Siddiqui
 */

// Dependencies
const fs = require('fs'); // For file system operations

/**
 * Function to read from a file.
 * Returns a promise
 * @param {*} srcPath The path of the file to be read
 */
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

/**
 * Function to write to a file.
 * Returns a promise
 * @param {*} srcPath The path of the file to be written to
 */
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

/**
 * Function that gets csv file and converts it into a json file
 * One improvement that can be made is to generalize this procedure for more data for each country
 * @param {*} filename The name of the file to be read
 */
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
            let current_standardofliving = comma_split[10];
            let current_consumerspending = comma_split[11];
            let current_easeofdoingbusiness = comma_split[12];
            let current_unemployment = comma_split[13];
            let current_retailsalesgrowth = comma_split[14];
            
            // Calculate standard of living
            // let current_standardofliving = (current_gdpppp/current_population).toString();
    
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
                standardOfLiving: current_standardofliving,
                consumerSpending: current_consumerspending,
                easeOfDoingBusiness: current_easeofdoingbusiness,
                unemployment: current_unemployment,
                retailSalesGrowth: current_retailsalesgrowth,
                
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
        // console.log('Done!');
     })
}

/**
 * POST a csv file
 * @param {*} req The POST a single file request object
 * @param {*} res The POST a single file response object
 * @param {*} next Executes the middleware after
 */
exports.files_create_file = (req, res, next) =>  {
    try {
        path = req.file.path;
        name = req.file.originalname;
        console.log(name);
        csv_to_json(name);
        res.status(200).json({
            message: "Upload Completed for "+ name
        });
    }
    catch (err) {
        // An error occurred when uploading
        console.log(err);
        res.status(422).json({
            message: "An Error Occured!"
        });
    }   
}
/**
 * Created by sbouhman on 5/19/2019.
 */

// take all the arguments from the command line array
const num1 = process.argv[2];
const num2 = process.argv[4];
const operation = process.argv[3];
const result = process.argv[5];

//bring in 'is-number' to check that the input variables are numbers
const isNumber = require('is-number');

// bring in the express module
const express = require("express");

// call the express function, return an object
const app = express();

// bring in the operations module that actually does the calculation
const operations = require('./lib/operations.js');

//get requests without arguments
app.get("/", function(request, response){
    response.status(200).send("My Calculator App");
});

// multiply numbers
app.get("/mult/:num1/:num2", function(request, response){
    if (!isNumber(request.params.num1) || !isNumber(request.params.num2)) {
        response.status(400).send("Error - you have entered variables which are not numbers");
    }
    else {
        operations.mult(request.params.num1, request.params.num2, function (error, sum, response_text) {
            if (error) {
                var httpCode = response.statusCode ? response.statusCode : 500;
                response.status(httpCode).send("An error occured while trying to multiply: " + error);
            }
            else {
                response.status(200).send(response_text);
            }
        });
    }
});

// divide numbers
app.get("/div/:num1/:num2", function(request, response){
    if (!isNumber(request.params.num1) || !isNumber(request.params.num2)) {
        response.status(400).send("Error - you have entered variables which are not numbers");
    }
    else {
        operations.div(request.params.num1, request.params.num2, function (error, sum, response_text) {
            if (error) {
                var httpCode = response.statusCode ? response.statusCode : 500;
                response.status(httpCode).send({message: "An error occured while trying to divide: " + error});
            }
            else {
                response.status(200).send(response_text);
            }
        });
    }
});

//get wrong requests
app.get("/*", function(request, response){
    response.status(400).send("Error - you have entered wrong API");
});


if (process.argv.length > 2) {
    if (process.argv.length !== 6){
        console.log("Error - you have entered wrong number of arguments");
    }
    else if (result !== '='){
        console.log("Error - you have entered wrong result operation");
    }else if (!isNumber(num1) || !isNumber(num2)) {
        console.log("Error - you have entered variables which are not numbers");
    }
    else{
        switch (operation) {
            case '*':
                operations.mult(num1,num2, function (error, sum, response_text){
                    if (error){
                        console.log("error");
                    }
                    else {
                        console.log(response_text);
                    }
                });
                break;
            case '/':
                operations.div(num1,num2, function (error, sum, response_text){
                    if (error){
                        console.log("error");
                    }
                    else {
                        console.log(response_text);
                    }
                });
                break;
            default:
                console.log("Error - you have entered wrong arguments");

        }
    }

}

else {
    const localhost = 3000;
    app.listen(localhost, function(){
        console.log("server starting on port 3000");
    });
}

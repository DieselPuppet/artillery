
var AWS = require('aws-sdk');

var lambda = new AWS.Lambda({region:'eu-west-1'});

exports.registerUser = function(baseURl, callback) {
  lambda.invoke({FunctionName:'authFb_stage', InvocationType:'RequestResponse'}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
          var payload = JSON.parse(data.Payload);
          callback(baseURl+payload.identityId);           // successful response
       }
    });
  return 'Hello world!';
}

var AWS = require('aws-sdk');
const debug=require('debug')('ws');
var lambda = new AWS.Lambda({region:'eu-west-1'});

exports.registerUser = function(baseURl, callback) {
  lambda.invoke({FunctionName:'authFb_stage', InvocationType:'RequestResponse'}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
          var payload = JSON.parse(data.Payload);
          callback(baseURl+payload.identityId);           // successful response
       }
    });
  return '';
}

function sendWord(ws, word) {
    debug('Sending word:'+word);
}

function onRoundStart(ws,roundNo,roundData) {
    debug("Starting round "+roundNo+":"+roundData.Word);
    setTimeout(sendWord, 5000,ws, roundData.Word);
}

exports.receiveHandler = function(ws, textMsg) {
    msg = JSON.parse(textMsg);
    msgData = JSON.parse(msg.data);
    if (msg.code == 'GameStateSync'){
        debug("receive "+msg.code);
        if (msgData.Rounds.length>msgData.RoundResults.length) {
            onRoundStart(ws, msgData.Rounds.length, msgData.Rounds[msgData.Rounds.length-1]);
        }
    }
}
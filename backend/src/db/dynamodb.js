// Assumes global aws config is set
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

module.exports = dynamodb;

const dynamodb = require('../db/dynamodb');

// Abstract class
class DynamoDBModel {
    constructor(params) {
        this.params = params;
    }

    createTable(cb) {
        return dynamodb.createTable(params, cb);
    }
}

module.exports = DynamoDBModel;

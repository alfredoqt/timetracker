const dynamodb = require('../db/dynamodb');

// Abstract class
class DynamoDBModel {
    constructor(params) {
        this.params = params;
    }

    createTable(cb) {
        return dynamodb.createTable(this.params, cb);
    }

    normalizeQueryItems(items) {
        return items.map(item => {
            const normalizedItem = {};
            for (const [attribute, valueWithType] of Object.entries(item)) {
                const values = Object.values(valueWithType);
                normalizedItem[attribute] = values.length < 1 ? null : values[0];
            }
            return normalizedItem;
        });
    }
}

module.exports = DynamoDBModel;

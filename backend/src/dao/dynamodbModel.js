const dynamodb = require('../db/dynamodb');
const { v4: uuidv4 } = require('uuid');

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

    async createItem(params) {
        const createdAt = new Date(Date.now()).toISOString();
        const id = uuidv4();
        const data = {
            Item: {
                ...params.Item,
                id,
                created_at: {
                    S: createdAt,
                },
                updated_at: {
                    S: createdAt,
                },
            },
        };
        await dynamodb.putItem(data).promise();
        return id;
    }
}

module.exports = DynamoDBModel;

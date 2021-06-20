const DynamoDBModel = require('./dynamodbModel');
const dynamodb = require('../db/dynamodb');

class UserModel extends DynamoDBModel {
    constructor() {
        super({
            TableName: 'users',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },  //Partition key
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'email-timetracker-users', // {hash_key}-{app-name}-{table_name}
                    KeySchema: [
                        {
                            AttributeName: 'email',
                            KeyType: 'HASH',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 10,
                        WriteCapacityUnits: 10,
                    },
                },
            ],
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
                { AttributeName: 'email', AttributeType: 'S' },
                // { AttributeName: 'email_verified', AttributeType: 'N' }, // 0 or 1
                // { AttributeName: 'fullname', AttributeType: 'S' },
                // { AttributeName: 'password_hash', AttributeType: 'S' }, // Hashed
                // { AttributeName: 'image_url', AttributeType: 'S' },
                // { AttributeName: 'timezone', AttributeType: 'S' },
                // { AttributeName: 'created_at', AttributeType: 'S' },
                // { AttributeName: 'updated_at', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
            },
        });
    }

    async findUserByEmail(email) {
        const response = await dynamodb.query({
            ExpressionAttributeValues: {
                ':v1': {
                    S: email,
                }
            },
            KeyConditionExpression: 'email = :v1',
            TableName: 'users'
        }).promise();

        if (response.Count < 1) {
            throw new Error('User not found');
        }

        return this.normalizeQueryItems(response.Items)[0];
    }
}

module.exports = new UserModel();

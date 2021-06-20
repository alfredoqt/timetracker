const DynamoDBModel = require('./dynamodbModel');

class User extends DynamoDBModel {
    constructor() {
        super({
            TableName: 'users',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },  //Partition key
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'email-timetracker-users',
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
                // { AttributeName: 'password', AttributeType: 'S' }, // Hashed
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
}

module.exports = new User();

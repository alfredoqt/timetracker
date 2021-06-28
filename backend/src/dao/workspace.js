const DynamoDBModel = require('./dynamodbModel');

class WorkspaceModel extends DynamoDBModel {
    constructor() {
        super({
            TableName: 'workspaces',
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' },  //Partition key
            ],
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
                // { AttributeName: 'name', AttributeType: 'S' },
                // { AttributeName: 'logo_url', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
            },
        });
    }

}

module.exports = new WorkspaceModel();

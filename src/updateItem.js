"use strict"

const AWS = require("aws-sdk");

const updateItem = async (event) => {

    const { itemStatus } = JSON.parse(event.body);
    const { id } = event.pathParameters

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB.update({
        TableName: "itemTableNew",
        key: { id },
        updateExpression: 'set itemStatus = itemStatus',
        ExpressionAttributeValue: {
            ':itemStatus': itemStatus
        },
        returnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                msg: "Item updated successfully"
            }
        ),
    };
}

module.exports = {
    handler: updateItem
}

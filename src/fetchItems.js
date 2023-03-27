"use strict"

const AWS = require("aws-sdk");

const fetchItems = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let items;

    try {
        const result = await dynamoDB.scan({
            TableName: "ItemTableNew"
        }).promise();

        items = result.items;
    } catch (error) {

        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    };

}

module.exports = {
    handler: fetchItems
}
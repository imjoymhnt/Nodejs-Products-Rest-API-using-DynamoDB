const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

router.get("/", (req, res) => {
  const id = req.query.id;

  const params = {
    TableName: "products",
    Key: {
      id,
    },
    KeyConditionExpression: "#id = :i",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":i": id,
    },
  };
  docClient.query(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    } else {
      res.send(data.Items[0]);
    }
  });
});

module.exports = router;

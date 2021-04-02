const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

router.get("/", (req, res) => {
  const params = {
    TableName: "products",
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      res.send("Can't get the products");
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

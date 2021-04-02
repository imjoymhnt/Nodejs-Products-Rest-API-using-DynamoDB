const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

router.patch("/update", (req, res) => {
  const id = req.query.id;
  const { title, desc, price } = req.body;

  const params = {
    TableName: "products",
    Key: {
      id,
    },
    UpdateExpression: "set #title = :t, #desc = :d, #price = :p",
    ExpressionAttributeNames: {
      "#title": "title",
      "#desc": "desc",
      "#price": "price",
    },
    ExpressionAttributeValues: {
      ":t": title,
      ":d": desc,
      ":p": price,
    },
  };
  docClient.update(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

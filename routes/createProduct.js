const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

router.post("/create", (req, res) => {
  const id = uuidv4();
  const title = req.body.title;
  const desc = req.body.desc;
  const price = req.body.price;

  const params = {
    TableName: "products",
    Item: {
      id,
      title,
      desc,
      price,
    },
  };
  docClient.put(params, (err, data) => {
    if (err) {
      res.send("Product not created");
    } else {
      res.send(data);
    }
  });
});

module.exports = router;

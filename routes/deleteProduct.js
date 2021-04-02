const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

router.delete("/delete", (req, res) => {
  const id = req.query.id;

  const params = {
    TableName: "products",
    Key: {
      id,
    },
  };

  docClient.delete(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: "Error: server error!",
      });
    } else {
      console.log("deleted");
      res.send({
        success: true,
        message: "Deleted product",
      });
    }
  });
});

module.exports = router;

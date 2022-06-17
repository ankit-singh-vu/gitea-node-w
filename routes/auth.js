var express = require("express");
var router = express.Router();

var REST = require("node-rest-client").Client;
var restClient = new REST();
restClient.on("error", function (err) {
  console.error("Something went wrong with the connection to interface", err);
});

var variables = require('./variables');
let { url } = variables;


router.get("/users", function (req, res, next) {
    restClient
    .get(
      "http://localhost:3000/api/v1/user?token=96a1f70d5e7b2d51ae439fa4e482f8667326b5c9",
      {
        headers: { "Content-Type": "application/json" },
      },
      function (data, response) {
        res.sendJSON({
          data: data,
        });
      }
    )
    .on("error", function (err) {
      console.log("request error", err);
    });
});

// check in http://localhost:3000/user/settings/applications
router.post("/", function (req, res, next) {
  var options_auth = { 
    user: "ankit", 
    password: "ankit@1234",
    mimetypes: {
        json: ["application/json", "application/json;charset=utf-8"]
    } 
  };
  var Client = require('node-rest-client').Client;
  var client = new Client(options_auth);
  client
  .post(
    url+"/users/ankit/tokens",
    {
      data: req.body,
      headers: { "Content-Type": "application/json" },
    },
    function (data, response) {
      res.sendJSON({
        data: data,
      });
    }
  )
  .on("error", function (err) {
    console.log("request error", err);
  });
});

// check in http://localhost:3000/user/settings/applications
router.delete("/:tokenName", function (req, res, next) {
  let { tokenName } = req.params;
  var options_auth = { 
    user: "ankit", 
    password: "ankit@1234",
    mimetypes: {
        json: ["application/json", "application/json;charset=utf-8"]
    } 
  };
  var Client = require('node-rest-client').Client;
  var client = new Client(options_auth);
  client
  .delete(
    url+"/users/ankit/tokens/"+tokenName,
    {
      data: req.body,
      headers: { "Content-Type": "application/json" },
    },
    function (data, response) {
      res.sendJSON({
        data: data,
      });
    }
  )
  .on("error", function (err) {
    console.log("request error", err);
  });
});

module.exports = router;

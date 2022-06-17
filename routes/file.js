var express = require("express");
var router = express.Router();
var REST = require("node-rest-client").Client;
var restClient = new REST();
restClient.on("error", function (err) {
  console.error("Something went wrong with the connection to interface", err);
});

var variables = require('./variables');
let { access_token , url } = variables;

router.get("/:user/:projectName", function (req, res, next) {

  let { user , projectName } = req.params;
  console.log(variables);
  // console.log(process.env.ACCESS_TOKEN)
  restClient
  .get(
    url+"/repos/"+user+"/"+projectName+"/branches?access_token="+access_token,
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


router.post("/:user/:projectName", function (req, res, next) {
  let { user , projectName  } = req.params;
  let { fileName } = req.query;
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/contents/"+fileName+"?access_token="+access_token,
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


router.put("/:user/:projectName", function (req, res, next) {
  let { user , projectName  } = req.params;
  let { fileName } = req.query;
  console.log(fileName);
  restClient
  .put(
    url+"/repos/"+user+"/"+projectName+"/contents/"+fileName+"?access_token="+access_token,
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


router.delete("/:user/:projectName/:branchName", function (req, res, next) {
  let { user , projectName , branchName } = req.params;
  restClient
  .delete(
    url+"/repos/"+user+"/"+projectName+"/branches/"+branchName+"?access_token="+access_token,
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


module.exports = router;

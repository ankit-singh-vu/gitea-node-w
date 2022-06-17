var express = require("express");
var router = express.Router();
var REST = require("node-rest-client").Client;
var restClient = new REST();
restClient.on("error", function (err) {
  console.error("Something went wrong with the connection to interface", err);
});

var variables = require('./variables');
let { access_token , url } = variables;

//get branch list
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

//repoCreateBranch
router.post("/:user/:projectName", function (req, res, next) {
  let { user , projectName } = req.params;
  // console.log(req.body);
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/branches?access_token="+access_token,
    {
      // data: {
      //   "new_branch_name": "xyz",
      //   "old_branch_name": "mnop"
      // },
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

// delete  branch
router.delete("/:user/:projectName/:branchName", function (req, res, next) {
  // console.log(req.params.user);
  // console.log(req.params.projectName);
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

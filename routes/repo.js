var express = require("express");
var router = express.Router();
var REST = require("node-rest-client").Client;
var restClient = new REST();
restClient.on("error", function (err) {
  console.error("Something went wrong with the connection to interface", err);
});

var variables = require('./variables');
let { access_token , url } = variables;



router.get("/userListRepos/:user", function (req, res, next) {
  let { user } = req.params;
  // console.log(user);
// console.log(process.env.ACCESS_TOKEN)
  restClient
  .get(
    url+"/users/"+user+"/repos?access_token="+access_token,
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

router.post("/", function (req, res, next) {
  // console.log(req.body);
  restClient
  .post(
    url+"/user/repos?access_token="+access_token,
    {
      // data: {
      //   "auto_init": true,
      //   "default_branch": "master",
      //   "description": "project-node dsfdsfs",
      //   "name": "project-node",
      //   "private": true,
      //   "trust_model": "default"
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


router.delete("/:user/:projectName", function (req, res, next) {
  // console.log(req.params.user);
  // console.log(req.params.projectName);
  let {user, projectName } = req.params;
  restClient
  .delete(
    url+"/repos/"+user+"/"+projectName+"?access_token="+access_token,
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

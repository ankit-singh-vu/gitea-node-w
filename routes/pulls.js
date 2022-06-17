var express = require("express");
var router = express.Router();
var REST = require("node-rest-client").Client;
var restClient = new REST();
restClient.on("error", function (err) {
  console.error("Something went wrong with the connection to interface", err);
});

var variables = require('./variables');
let { access_token , url } = variables;


// repoCreatePullRequest
router.post("/:user/:projectName", function (req, res, next) {
  let { user , projectName  } = req.params;
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/pulls/?access_token="+access_token,
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

//repoMergePullRequest
// "MergeCommitID" = repoCreatePullRequest.merge_base
// "head_commit_id" = repoCreatePullRequest.head.sha
router.post("/merge/:user/:projectName", function (req, res, next) {
  let { user , projectName  } = req.params;
  let { pullNumber } = req.query;
  console.log(url+"/repos/"+user+"/"+projectName+"/pulls/"+pullNumber+"/merge?access_token="+access_token);
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/pulls/"+pullNumber+"/merge?access_token="+access_token,
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



//create Pull request  followed by merge 
router.post("/createPRandmerge/:user/:projectName", function (req, res, next) {
  let { user , projectName  } = req.params;
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/pulls/?access_token="+access_token,
    {
      data: req.body,
      headers: { "Content-Type": "application/json" },
    },
    function (data, response) {
      console.log(data);
      let pullNumber = data.number;
      let merge_body = 
      {
        "Do": "merge",
        "MergeCommitID": data.merge_base,
        "MergeMessageField": "merge commit from code " + pullNumber + " description",
        "MergeTitleField": "merge commit from code " + pullNumber,
        "delete_branch_after_merge": false,
        "force_merge": true,
        "head_commit_id":  data.head.sha
      }
      restClient
      .post(
        url+"/repos/"+user+"/"+projectName+"/pulls/"+pullNumber+"/merge?access_token="+access_token,
        {
          data: merge_body,
          headers: { "Content-Type": "application/json" },
        },
        function (merge_data, response) {
          res.sendJSON({
            data: merge_data,
          });
        }
      )
      .on("error", function (err) {
        console.log("request error", err);
      });

    }
  )
  .on("error", function (err) {
    console.log("request error", err);
  });
});


router.get("/apione", function (req, res, next) {

  console.log("hi")
  restClient
  .get(
    "http://0.0.0.0:8080/pulls/apitwo?access_token="+access_token,
    {
      headers: { "Content-Type": "application/json" },
    },
    function (merge_data, response) {
      res.sendJSON({
        data: merge_data,
      });
    }
  )
  .on("error", function (err) {
    console.log("request error", err);
  });
  

});

router.get("/apitwo", function (req, res, next) {

  console.log("by") 
  res.sendJSON({
    data: "merge_data1",
  });

});



//upload(add and edit) multi files followed by  create Pull request and merge 
/* router.post("/createPRandmerge/:user/:projectName", function (req, res, next) {


  let { user , projectName  } = req.params;
  restClient
  .post(
    url+"/repos/"+user+"/"+projectName+"/pulls/?access_token="+access_token,
    {
      data: req.body,
      headers: { "Content-Type": "application/json" },
    },
    function (data, response) {
      console.log(data);
      let pullNumber = data.number;
      let merge_body = 
      {
        "Do": "merge",
        "MergeCommitID": data.merge_base,
        "MergeMessageField": "merge commit from code " + pullNumber + " description",
        "MergeTitleField": "merge commit from code " + pullNumber,
        "delete_branch_after_merge": false,
        "force_merge": true,
        "head_commit_id":  data.head.sha
      }
      restClient
      .post(
        url+"/repos/"+user+"/"+projectName+"/pulls/"+pullNumber+"/merge?access_token="+access_token,
        {
          data: merge_body,
          headers: { "Content-Type": "application/json" },
        },
        function (merge_data, response) {
          res.sendJSON({
            data: merge_data,
          });
        }
      )
      .on("error", function (err) {
        console.log("request error", err);
      });

    }
  )
  .on("error", function (err) {
    console.log("request error", err);
  });



}); */

module.exports = router;




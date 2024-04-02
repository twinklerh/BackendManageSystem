const express = require('express')
const Mock = require("mockjs")
const bodyParser = require('body-parser')

const app = express();

const data = {
  "token": "Admin access",
}

module.exports = function (app) {
  app.use(bodyParser.json())
  app.post('/api/user/login', (req, res)=>{
    console.log(req.body)
    res.json(data)
  })
};

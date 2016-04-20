var express = require('express');
var app = express();
var port = 3000;
var server = app.listen(port);

var redis = require('redis');
var client = redis.createClient(6379);

app.get("/update:lastTick", function updater(req, res) {
  console.log(req.params.lastTick);
  res.end();
});

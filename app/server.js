var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);

var connecter= require('./connecter.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/update:lastTick', function (req, res) {
  connecter.checkForNewTicks(req.params.lastTick, function (result) {
    if (result) {
      connecter.getTicks(req.params.lastTick, function (result) {
        res.json(result);
        res.end();
      });
    }
    else{
      res.sendStatus(204);
      res.end();
    }
  });
});

app.post('/tick', function newTickAdder(req, res) {
  connecter.addTick(req.body.post);
  res.sendStatus(201);
  res.end();
})

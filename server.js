var express = require('express');
var app = express();
var port = 3000;
var server = app.listen(port);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var redis = require('redis');
var client = redis.createClient(6379);

app.get('/update:lastTick', function updater(req, res) {
  client.llen('ticks', function (err,reply) {
    if (err) {
      console.log(err);
    }
    if(req.params.lastTick == reply){
      res.sendStatus(204);
      res.end();
    }
    else{
      client.lrange('ticks', req.params.lastTick, -1, function (err, reply) {
        if (err) {
          console.log(err);
        }
        var responseObject = {'ticks' : reply}
        res.json(responseObject);
        res.end();
      });
    }
  });
});

app.post('/tick', function newTickAdder(req, res) {
  client.rpush('ticks', req.body.post);
  console.log(client.lrange('ticks', 0, -1));
  res.sendStatus(201);
  res.end();
})

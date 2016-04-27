var redis = require('redis');

// connects to th redis db
var client = redis.createClient(process.env.PORT || 6379);

// checks if there are new ticks in the db
exports.checkForNewTicks = function (lastTick, next) {
  client.llen('ticks', function (err,reply) {
    if (err) {
      console.log(err);
    }
    if(lastTick >= reply){
      next(false);
    }
    else{
      next(true);
    }
  });
}

// returns the all the ticks after lastTick
exports.getTicks = function (lastTick, next) {
  client.lrange('ticks', lastTick, -1, function (err, reply) {
    if (err) {
      console.log(err);
    }
    next(reply);
  });
};

// adds a tick to th db
exports.addTick = function (tick) {
  client.rpush('ticks',tick);
  return true;
};

// removes the last Tick from the db
exports.removeLastTick = function () {
  client.rpop('ticks');
  return true;
};

// removes the first Tick from the db
exports.removeFirstTick = function () {
  client.lpop('ticks');
  return true;
};

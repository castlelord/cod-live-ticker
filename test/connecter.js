var expect = require('chai').expect;
var connecter = require('../app/connecter.js');

describe('Redis Connecter Interface:', function () {

  var testTicks = ['first','second'];

  describe('Function addTick:', function () {
    it('adds new Ticks',function () {
      var firstTickadded = connecter.addTick(testTicks[0]);
      var secondTickadded = connecter.addTick(testTicks[1]);

      expect(firstTickadded).to.equal(true);
      expect(secondTickadded).to.equal(true);
    });
  });

  describe('Function checkForNewTicks:', function () {

    var zeroTick;
    var secondTick;

    before(function (done) {
      connecter.checkForNewTicks(0, function (result) {
        zeroTick = result;
        expect(zeroTick).to.equal(true);
        done();
      });
    });

    it('returns true if there are new ticks', function () {
      expect(zeroTick).to.equal(true);
    });

    before(function (done) {
      connecter.checkForNewTicks(2, function (result) {
        secondTick = result;
        done();
      });
    });

    it('returns false if there are no new ticks', function () {
      expect(secondTick).to.equal(false);
    })
  });

  describe('Function getTicks:', function () {

    var lastTickzero;
    var lastTicktwo;

    before(function (done) {
      connecter.getTicks(0, function (result) {
        lastTickzero = result;
        done();
      });
    })

    it('gets new Ticks', function () {
      expect(lastTickzero).to.deep.equal(testTicks);
    });

    before(function (done) {
      connecter.getTicks(2, function (result) {
        lastTicktwo = result;
        done();
      });
    });

    it('gets the ticks its supposed to', function () {
      expect(lastTicktwo).to.deep.equal([]);
    });
  });

  describe('Function removeFirstTick:', function () {

    var firstTickremoved;
    var remainingTicks;

    before(function (done) {
      firstTickremoved = connecter.removeFirstTick();
      connecter.getTicks(0, function (result) {
        remainingTicks = result;
        done();
      });
    });

    it('returns true if it removes first tick', function () {
      expect(firstTickremoved).to.equal(true);
    });

    it('actualy removes first tick', function () {
      expect(remainingTicks).to.deep.equal([testTicks[1]]);
    })

  });

  describe('Function removeLastTick:', function () {

    var secondTickremove;
    var remainingTicks;

    before(function (done) {
      secondTickremoved = connecter.removeLastTick();
      connecter.getTicks(0, function (result) {
        remainingTicks = result;
        done();
      });
    })

    it('returns true if it removes the last tick', function () {
      expect(secondTickremoved).to.equal(true);
    });

    it('actualy removes last tick', function () {
      expect(remainingTicks).to.deep.equal([]);
    })
  });
});

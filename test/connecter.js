var expect = require('chai').expect;
var connecter = require('../app/connecter.js');

describe('Redis Connecter Interface', function () {

  var testTicks = ['first','second'];

  describe('Function addTick', function () {
    it('adds new Ticks',function () {
      var firstTickadded = connecter.addTick(testTicks[0]);
      var secondTickadded = connecter.addTick(testTicks[1]);

      expect(firstTickadded).to.equal(true);
      expect(secondTickadded).to.equal(true);
    });
  });

  describe('Function checkForNewTicks', function () {
    it('checks for new ticks', function () {
      var zeroTick;
      var secondTick;
      connecter.checkForNewTicks(0, function (result) {
        zeroTick = result;
        expect(zeroTick).to.equal(true);
      });
      connecter.checkForNewTicks(2, function (result) {
        thirdTick = result;
        expect(secondTick).to.equal(false);
      });
    });
  });

  describe('Function getTicks', function () {
    it('gets new Ticks', function () {
      var lastTickzero;
      var lastTicktwo;

      connecter.getTicks(0, function (result) {
        lastTickzero = result;
        expect(lastTickzero).to.equal(testTicks);
      });

      connecter.getTicks(2, function (result) {
        lastTicktwo = result;
        expect(lastTicktwo).to.equal([]);
      });
    });
  });

  describe('Function removeFirstTick', function () {
    it('removes the first Tick', function () {
      var firstTickremoved = connecter.removeFirstTick();

      expect(firstTickremoved).to.equal(true);
      connecter.getTicks(0, function (result) {
        expect(result).to.equal([testTicks[1]]);
      });
    });
  });

  describe('Function removeLastTick', function () {
    it('removes the last tick', function () {
      var secondTickremoved = connecter.removeLastTick();

      expect(secondTickremoved).to.equal(true);
      connecter.getTicks(0, function (result) {
        expect(result).to.equal([]);
      });
    });
  });
});

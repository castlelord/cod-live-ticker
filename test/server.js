var expect = require('chai').expect;
var request = require('request');
var connecter = require('../app/connecter.js');


describe('HTTP-Server:', function () {

  describe('POST /tick:', function () {

    var responseStatusCode;
    var newTick;

    before(function (done) {
      var url = 'http://localhost:3000/tick';
      var requestData = {'post' : 'text'};

      request({
        'url' : url,
        'method' : 'POST',
        'json' : requestData
      }, function (error, response) {
          responseStatusCode = response.statusCode;

          connecter.getTicks(0, function (result) {
            newTick = result;
            done();
          });
      });
    });

    it('sends status code 201', function () {
      expect(responseStatusCode).to.equal(201);
    })

    it('creates a new tick', function () {
      expect(newTick).to.deep.equal(['text']);
    });


  });

  describe('GET /update:lastTick:', function () {

    var responsData;
    var possitivResponseCode;
    var negativeResponseCode;

    before(function (done) {

      var urlzero = 'http://localhost:3000/update0';

      request(urlzero, function (error, response, body) {
        responsData = JSON.parse(body);
        possitivResponseCode = response.statusCode;
        done();
      });
    })

    it('sends new ticks if there are some', function () {
      expect(responsData).to.deep.equal(['text']);
    });

    it('sends status code 200 wenn there are new ticks', function () {
      expect(possitivResponseCode).to.equal(200);
    })

    before(function (done) {
      var urlfour = 'http://localhost:3000/update4';

      request(urlfour, function (error, response) {
        negativeResponseCode = response.statusCode;
        done();
      });
    })

    it('sends status code 204 wenn there are no new ticks', function () {
      expect(negativeResponseCode).to.equal(204);
    });

    after(function () {
      connecter.removeFirstTick();
    });
  });
});

var expect = require('chai').expect;
var request = require('request');

describe('HTTP-Server', function () {

  describe('POST /tick', function () {
    it('creates a new tick', function () {
      var url = 'http://localhost:3000/tick';
      var requestData = {'post' : 'text'};

      request({
        'url' : url,
        'method' : 'POST',
        'json' : requestData
      }, function (error, response) {
        expect(response.statusCode).to.equal(201);
      });
    });
  });

  describe('GET /update:lastTick', function () {
    it('sends new ticks if there are some', function () {
      var url = 'http://localhost:3000/update0';

      request(url, function (error, response, body) {
        expect(body).to.equal(['text']);
        expect(response.statusCode).to.equal(200);
      });
    });

    it('sends status code 204 wenn there are no new ticks', function () {
      var url = 'http://localhost:3000/update4';

      request(url, function (error, response) {
        expect(response.statusCode).to.equal(204);
      });
    })
  });
})

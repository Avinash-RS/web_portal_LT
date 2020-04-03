var assert = require('assert');

var http = require('http');
 
describe('sampleUnitTests', function () {
    before(function () {
    });
  
    after(function () {
        
    });

    it('Should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            
        });
    });

    it('Assert title', function (done) {
        http.get('http://localhost:3000', function (res) {
           
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
               
                done();
            })
        });
    });
});
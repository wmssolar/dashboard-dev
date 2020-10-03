//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var expect = require('chai').expect
var chai = require('chai')
  , chaiHttp = require('chai-http');
const should = chai.should();

const SERVER_URL = process.env.APP_URL || "http://localhost:8000";

chai.use(chaiHttp);
  

describe('connected', () => {

  it('success, finally',done =>{
    chai.request(SERVER_URL)
    .get('')
    .end(function(err, res){
      expect(err).to.be.null;
   
      expect(res).to.have.status(200);
      done();
    });
 

  });

});


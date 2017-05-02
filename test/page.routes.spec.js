var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var models = require('../models');
var Page = models.Page;
var User = models.User;

describe('http requests', function () {

  describe('GET /wiki/', function () {
    it('gets 200 on index', function(done){
    	agent
    	.get('/wiki')
    	.expect(200, done)
    });
  });

  describe('GET /wiki/add', function () {
    it('gets 200 on add', function(done){
    	agent
    	.get('/wiki/add')
    	.expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle', function () {

    beforeEach(function(done){

      Page.create({
        title: 'Found Article',
        content: 'Matching article and I have something in common',
        tags: 'dog, cat, hampster'
      })
      .then(function(result){
      	done()
      }).catch(done);

     });

    it('responds with 404 on page that does not exist',function(done){
    	agent
    	.get('/wiki/this couldnt exist')
    	.expect(404, done);
    });
    it('responds with 200 on page that does exist', function(done){
		agent
    	.get('/wiki/Found_Article')
    	.expect(200, done)
    });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  });

  describe('POST /wiki', function () {
    it('responds with 302');
    it('creates a page in the database');
  });

});
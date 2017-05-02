var chai = require('chai');
var expect = require('chai').expect;
var models = require('../models');
var Page = models.Page;
var spy = require('chai-spies');

chai.use(spy);

describe('Page model', function () {

  describe('Virtuals', function () {
  Page.build();

  Page.getOne()
   .then(function(results){
    console.log(results)
   });


    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){

      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){

      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', function(){

      });
      it('does not get pages without the search tag', function(){

      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself', function(){

      });
      it('gets other pages with any common tags', function(){

      });
      it('does not get other pages without any common tags', function(){

      });
    });
  });

  describe('Validations', function () {
    it('errors without title', function(){

    });
    it('errors without content', function(){

    });
    it('errors given an invalid status', function(){

    });
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating', function(){

    });
  });

});
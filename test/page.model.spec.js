var chai = require('chai');
var expect = require('chai').expect;
var models = require('../models');
var Page = models.Page;
var spy = require('chai-spies');
var chai2 = require("chai");
chai2.should();
chai2.use(require('chai-things'));
chai.use(spy);


describe('Page model', function () {
  afterEach(function(){
    return models.Page.sync({force:true}).then(function(){models.User.sync({force:true})});   
    });
  
  describe('Virtuals', function () {

    var page;
      beforeEach(function(){
        page = Page.build();
      });

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        page.urlTitle = 'this_title';
          expect(page.route).to.eql(`/wiki/${page.urlTitle}`);
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
        page.content = 'the content';
        expect(page.renderedContent).to.eql(`<p>${page.content}</p>\n`);
      });
    });
  });

  describe('Class methods', function () {

    beforeEach(function(done){
      Page.create({
        
        title: 'title of article',
        content: 'this is the content',
        tags: 'dog, cat, hampster'
        
      });
      done();

    });
    
    describe('findByTag', function () {
      it('gets pages with the search tag', function(done){

        Page.findByTag('dog')
        .then(function(result){
          expect(result[0].tags).to.include('dog');
          done();
        }).catch(done);


      });
      it('does not get pages without the search tag', function(done){

        Page.findByTag('gsrherg')
        .then(function(result){
          expect(result).to.have.lengthOf(0);
          done();
        }).catch(done);
      });
    });
  });

  describe('Instance methods', function () {


    describe('findSimilar', function () {

      var page, wrongpage, rightpage;

      beforeEach(function(done){
       
      Page.create({
        title: 'Found Article',
        content: 'Matching article and I have something in common',
        tags: 'dog, cat, hampster'
      })
      .then(function(result){
        rightpage = result;
        return Page.create({
        title: 'Irrelevant Article',
        content: 'You should never see me',
        tags: 'dig, car, hairdresser'
        });
      })
      .then(function(result){
        wrongpage = result;
       return Page.create({
        title: 'Matcher Article',
        content: 'This is our initial article to match on',
        tags: 'dog, crawl, eat'
          });
       })
      .then(function(result){
        page = result;
      done();
      });
      });

      it('never gets itself', function(done){
        page.findSimilar()
        .then(function(result){
         
          expect(result).should.not.include(rightpage);
        done();
        });

      });
      xit('gets other pages with any common tags', function(){

      });
      xit('does not get other pages without any common tags', function(){

      });
    });
  });

  describe('Validations', function () {
      
      var page;
      beforeEach(function(done){
        page = Page.build({});
        done();
      });

    it('errors without title', function(done){
      page.content = 'this is a pages content';
      page.urlTitle = 'www.url.com';
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].message).to.eql('title cannot be null');
        done();
      });
    });
    it('errors without content', function(done){
      page.urlTitle = 'www.url.com';
      page.title = 'Example Title';
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].message).to.eql('content cannot be null');
        done();
      });
    });
    xit('errors given an invalid status', function(done){
      page.content = 'this is a pages content';
      page.urlTitle = 'www.url.com';
      page.title = 'Example Title';
      page.status = 'nothingHere';
      page.validate()
      .then(function(err){
        console.log(err.errors);
        expect(err.errors[0].message).to.eql('content cannot be null');
        done();
      });

    });
  });

  describe('Hooks', function () {
    var page;
    beforeEach(function(done){
      Page.create({
        title: 'Found Article',
        content: 'Matching article and I have something in common',
        tags: 'dog, cat, hampster'
      })
      .then(function(result){
        page = result;
      done();
      });
      
   });
    it('it sets urlTitle based on title before validating', function(){

      expect(page.urlTitle).to.eql(page.title.replace(/\s/g, '_').replace(/\W/g, ''));
    });
  });

});
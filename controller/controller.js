//dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

//require request and cheerio to scrape
var request = require('request');
var cheerio = require('cheerio');

//Require models
var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

//index
router.get('/', function(req, res) {
    res.redirect('/articles');
});

// router.get('/test-scrape', function(req, res) {
//   request(result.link, function(error, response, html) {
//     var $ = cheerio.load(html);

//     $('.l-col__main').each(function(i, element){
//       var result = {};

//       console.log($(this).children('.c-entry-content').children('p').text());
//     });
//   });
// });


// A GET request to scrape the Verge website
router.get('/scrape', function(req, res) {
    // First, we grab the body of the html with request
    request('http://www.theverge.com/tech', function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        var titlesArray = [];
        // Now, we grab every article
        $('.c-entry-box--compact__title').each(function(i, element) {
            // Save an empty result object
            var result = {};
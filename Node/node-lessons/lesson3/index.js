var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next) {
    superagent.get('https://segmentfault.com/')
        .end(function (err, sres){
            if(err){
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.news-list .news-item .news__item-info a .mb5 .news__item-title').each(function(idx, element){
                var $element = $(element);
                items.push({
                    title: $element.text()
                });
            });

            res.send(items);
        })
});

app.listen(3000, function() {
    console.log('app is listening at port 3000')
})


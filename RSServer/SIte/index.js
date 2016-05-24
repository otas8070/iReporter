/**
 * Created by ht on 2016/05/25.
 */
var jsdom = require("node-jsdom");


// http://netaatoz.jp/
module.exports.netaatoz = function(feedparser){

    feedparser.on('end', function() {

        url = 'http://netaatoz.jp/archives/9259216.html';
        jsdom.env(
            url,
            ["http://code.jquery.com/jquery.js"],
            function (errors, window) {
                var array = new Array();
                var insert = new Array();
                array['article'] = new Array();

                array['description'] = window.$("#resid1 div")[1].innerHTML;

                var i = 0;
                window.$(".article_body_more").children('div').each(function() {
                    var author = window.$(this).text().split("\n\n");
                    array['article'][i] = new Array();
                    array['article'][i]['author'] = author[0];
                    array['article'][i]['text'] = author[1];
                    i++;
                });


                console.log(array);
            }
        );

    });
};
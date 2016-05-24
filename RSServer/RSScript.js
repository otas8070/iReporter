/**
 * Created by ht on 2016/05/24.
 */
/*
 * RSScript.js
 * rssを取得して、そこの記事の内容を取得する。
 * その後、niftyのデータストアに保存する。
 * http://phiary.me/node-js-feedparser-rss-json/
 */

//main Roop -------------------------------------------------------------

//***** declare var *****
var jquery = require("jquery")
var jsdom = require("node-jsdom");
var FeedParser = require('feedparser');
var request = require('request');
var site = require('./Site');
var feed = 'http://netaatoz.jp/index.rdf';


var feedparser = new FeedParser({});


//rssの各データを収納する変数
var items = [];

//引数からのデータ（仮）
var Data = "netaatoz" ;


//***** Roop *****

//RSSから情報を取得してくる
DataRead(feed);

//サイト自体を解析
DataAnalyze(); //デバッグ用

//サイト自体を解析
//文字列から関数を実行 元の関数=site.netaatoz(feedparser);
//eval("site."+Data+"(feedparser)");




//main Roop -------------------------------------------------------------


//function --------------------------------------------------------------


function DataRead(feed){

    //初期設定
    var req = request(feed);
    items = [];

    //接続する
    req.on('response', function (res) {
        this.pipe(feedparser);
    });

    feedparser.on('readable', function() {
        while(item = this.read()) {
            //console.log(item);
            items.push(item);
        }
    });

}


function DataAnalyze(){

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

        // item毎の繰り返し
        // items.forEach(function(item) {
        //     var array;
        //     array = new Array();
        //
        //     array['title'] = item.title;
        //     array['link'] = item.link;
        // });
    });

}
var express = require('express')
var request = require('request')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  
    url = "https://newsapi.org/v2/everything?q=WRC+Rally&language=pt&apiKey=626c562e3c144e6da1303da6f84ebf1f"
    request(url, function(err,resp,body){
        body = JSON.parse(body)
        res.render('news',{noticias:body.articles})
    })
})

module.exports = router;
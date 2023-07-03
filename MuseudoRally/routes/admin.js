var express = require('express');
var router = express.Router();

const SparqlClient = require('sparql-client-2')
const SPARQL = SparqlClient.SPARQL
const endpoint = 'http://localhost:7200/repositories/MuseudoRally'
const myupdateEndpoint = 'http://localhost:7200/repositories/MuseudoRally/statements'

var client = new SparqlClient( endpoint, {updateEndpoint: myupdateEndpoint, 
    defaultParameters: {format: 'json'}})

    client.register({rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    m: 'http://miei.di.uminho.pt/prc2018/museudorali#',
    owl: 'http://www.w3.org/2002/07/owl#'})    

/* GET home page. */
router.get('/:pass', function(req, res, next) {
    var eq = req.params.pass
    if(eq == "Tp57-bet+"){
        res.render('admin');
    }else{

        res.redirect('/');
    }
})
router.get('/', function(req, res, next) {
    res.redirect('/');
})

module.exports = router;
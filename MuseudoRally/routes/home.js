var express = require('express');
var router = express.Router();
var request = require('request')

const SparqlClient = require('sparql-client-2')
const SPARQL = SparqlClient.SPARQL
const endpoint = 'http://localhost:7200/repositories/MuseudoRally'
const myupdateEndpoint = 'http://localhost:7200/repositories/MuseudoRally/statements'

var client = new SparqlClient( endpoint, {updateEndpoint: myupdateEndpoint, 
    defaultParameters: {format: 'json'}})

    client.register({rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    m: 'http://miei.di.uminho.pt/prc2018/museudorali#'})    

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = "select ?nome ?ano ?imagem ?cidade ?lat ?lng where{\n" +
        "?s a m:Prova.\n" +
        "?s m:nome ?nome.\n" +
        "?s m:imagem ?imagem.\n" +
        "?s m:cidade ?cidade.\n" +
        "?s m:lat ?lat.\n"+
        "?s m:lng ?lng.\n"+
        "?s m:ano ?ano.\n"+
    "}"


    client.query(query).execute().then(function(qres){
        console.log(JSON.stringify(qres))
        var link=""
        var i = 0
        for (r in qres.results.bindings){
            i += 0.1
            lin = 'prova/'+qres.results.bindings[r].ano.value+'_'+qres.results.bindings[r].nome.value.split(' ').join('')
            qres.results.bindings[r].link = lin
        }
        res.clearCookie('marks')
        res.cookie('marks', JSON.stringify(qres))
        res.render("home")
    })
})

module.exports = router;
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
router.get('/', function(req, res, next) {

    var pilotos1 = "select ?n ?a (count(?p) as ?np) where {\n"+
                "?s a m:Piloto.\n"+
                "?p m:temPiloto ?s.\n"+
                "?s m:nome ?n.\n"+
                "?s m:aplido ?a.\n"+
                '?p m:classificacao "1"\n'+
                "} GROUP BY ?n ?a\n"+
                "order by desc(?np) limit 3"
                
    var equipas1 = "select ?sim ?sn (count(?p) as ?np) where {\n"+
                "?s a m:Equipa.\n"+
                "?p m:temEquipa ?s.\n"+
                "?s m:imagem ?sim.\n"+
                "?s m:nome ?sn.\n"+
                '?p m:classificacao "1"\n'+
                "} GROUP BY ?sim ?sn\n"+
                "order by desc(?np) limit 3"
    
    var pilotos2 = "select ?n ?a (count(?p) as ?np) where {\n"+
                "?s a m:Piloto.\n"+
                "?p m:temPiloto ?s.\n"+
                "?s m:nome ?n.\n"+
                "?s m:aplido ?a.\n"+
                '?p m:classificacao "2"\n'+
                "} GROUP BY ?n ?a\n"+
                "order by desc(?np) limit 3"
                
    var equipas2 = "select ?sim ?sn (count(?p) as ?np) where {\n"+
                "?s a m:Equipa.\n"+
                "?p m:temEquipa ?s.\n"+
                "?s m:imagem ?sim.\n"+
                "?s m:nome ?sn.\n"+
                '?p m:classificacao "2"\n'+
                "} GROUP BY ?sim ?sn\n"+
                "order by desc(?np) limit 3"
    
    var pilotos3 = "select ?n ?a (count(?p) as ?np) where {\n"+
                "?s a m:Piloto.\n"+
                "?p m:temPiloto ?s.\n"+
                "?s m:nome ?n.\n"+
                "?s m:aplido ?a.\n"+
                '?p m:classificacao "3"\n'+
                "} GROUP BY ?n ?a\n"+
                "order by desc(?np) limit 3"
                
    var equipas3 = "select ?sim ?sn (count(?p) as ?np) where {\n"+
                "?s a m:Equipa.\n"+
                "?p m:temEquipa ?s.\n"+
                "?s m:imagem ?sim.\n"+
                "?s m:nome ?sn.\n"+
                '?p m:classificacao "3"\n'+
                "} GROUP BY ?sim ?sn\n"+
                "order by desc(?np) limit 3"
    
    var melhorT = "select ?n ?a ?t where {\n"+
                  "?s a m:Piloto.\n"+
                  "?p m:temPiloto ?s.\n"+
                  "?s m:nome ?n.\n"+
                  "?s m:aplido ?a.\n"+
                  "?p m:tempo ?t.\n"+
                  "}order by ?t limit 3"

    var pilotoM = "select ?n ?a (count(?p) as ?np) where {\n"+
                  "?s a m:Piloto.\n"+
                  "?p m:temPiloto ?s.\n"+
                  "?s m:nome ?n.\n"+
                  "?s m:aplido ?a.\n"+
                  "}GROUP BY ?n ?a\n"+
                  "order by desc(?np) limit 3"
    
    var equipaM = "select ?sim ?sn (count(?p) as ?np) where {\n"+
                  "?s a m:Equipa.\n"+
                  "?s m:imagem ?sim.\n"+
                  "?s m:nome ?sn.\n"+
                  "?p m:temEquipa ?s.\n"+
                  "}GROUP BY ?sim ?sn\n"+
                  "order by desc(?np) limit 3"
  
    client.query(pilotos1).execute().then(function(qres1){
        client.query(pilotos2).execute().then(function(qres2){
            client.query(pilotos3).execute().then(function(qres3){
                client.query(pilotoM).execute().then(function(qres4){
                    client.query(equipas1).execute().then(function(qres5){
                        client.query(equipas2).execute().then(function(qres6){
                            client.query(equipas3).execute().then(function(qres7){
                                client.query(equipaM).execute().then(function(qres8){
                                    client.query(melhorT).execute().then(function(qres9){
                                        res.render("podium",{pl1:qres1.results.bindings,pl2:qres2.results.bindings,pl3:qres3.results.bindings,plm:qres4.results.bindings,eq1:qres5.results.bindings,eq2:qres6.results.bindings,eq3:qres7.results.bindings,eqm:qres8.results.bindings,mt:qres9.results.bindings}) 
                                    })
                                })
                             })  
                        })
                    })
                })
            })
       })
    })
})

module.exports = router;
var express = require('express');
var router = express.Router();
var formidable = require("formidable")

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
    res.redirect('/home')
})
router.get('/:pal', function(req, res, next) {
    var pal = req.params.pal
    console.log(pal)

    pal = pal.split('_')
    var query = "select ?p where{\n"+
                '?s a m:Piloto.\n'+
                '?s m:nome "'+pal[0]+'".\n'+
                '?s m:aplido "'+pal[1]+'".\n'+
                '}'
    pal = pal.join(' ')   

    var query2 = "select ?p where{\n"+
                 '?s a m:Pais.\n'+
                 '?s m:nome "'+pal+'".\n'+
                 '}'

    var query3 = "select ?p where{\n"+
                 '?s a m:Marca.\n'+
                 '?s m:nome "'+pal+'".\n'+
                 '}'
    
    var query4 = "select ?p where{\n"+
                 '?s a m:Equipa.\n'+
                 '?s m:nome "'+pal+'".\n'+
                 '}'
    
    var query5 = "select ?p where{\n"+
                 '?s a m:Prova.\n'+
                 '?s m:nome "'+pal+'".\n'+
                 '}'

    client.query(query).execute().then(function(qres){       
        if(qres.results.bindings[0]){
            console.log('PILOTO')
            pal = pal.split(' ').join('')
            res.redirect('/piloto/'+pal)
        }
        else{
            client.query(query2).execute().then(function(qres){       
                if(qres.results.bindings[0]){
                    console.log('PAIS')
                    pal = pal.split(' ').join('')
                    res.redirect('/paises/'+pal)
                }
                else {
                    client.query(query3).execute().then(function(qres){       
                        if(qres.results.bindings[0]){
                            console.log('MARCA')
                            pal = pal.split(' ').join('')
                            res.redirect('/marcas/'+pal)
                        }
                        else{
                            client.query(query4).execute().then(function(qres){       
                                if(qres.results.bindings[0]){
                                    console.log('EQUIPA')
                                    pal = pal.split(' ').join('')
                                    res.redirect('/equipas/'+pal)
                                }
                                else{
                                    res.redirect('/home')
                                }
                            })
                        } 
                    })    
                }
            })
        } 
    })
})
module.exports = router;
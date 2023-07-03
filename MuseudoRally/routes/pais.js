var express = require('express');
var router = express.Router();
var formidable = require("formidable")

const SparqlClient = require('sparql-client-2')
const SPARQL = SparqlClient.SPARQL
const endpoint = 'http://localhost:7200/repositories/MuseudoRally'
const myupdateEndpoint = 'http://localhost:7200/repositories/MuseudoRally/statements'
const endpoint2 = "http://dbpedia.org/sparql"

var client = new SparqlClient( endpoint, {updateEndpoint: myupdateEndpoint, 
    defaultParameters: {format: 'json'}})

    client.register({rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    m: 'http://miei.di.uminho.pt/prc2018/museudorali#',
    owl: 'http://www.w3.org/2002/07/owl#'})    

    var client2 = new SparqlClient( endpoint2, {defaultParameters: {format: 'json'}})
    
    client2.register({dbo: 'http://dbpedia.org/ontology/',
    foaf: 'http://xmlns.com/foaf/0.1/'}) 

/* GET home page. */
router.get('/:pais', function(req, res, next) {
    var pais = req.params.pais
    console.log(pais)

    var queryM = "select ?nome ?mi where {\n"+
                 "m:"+pais+" m:éPaisDe ?s.\n"+
                 "?s a m:Marca.\n"+
                 "?s m:nome ?nome.\n"+
                 "?s m:imagem ?mi.\n"+
                 "}"

    var queryPil = "select ?nome ?aplido where {\n"+
                   "m:"+pais+" m:éPaisDe ?s.\n"+
                   "?s a m:Piloto.\n"+
                   "?s m:nome ?nome.\n"+
                   "?s m:aplido ?aplido.\n"+
                   "}"
    
    var queryPro = "select ?nome ?ano where {\n"+
                   "m:"+pais+" m:éPaisDe ?s.\n"+
                   "?s a m:Prova.\n"+
                   "?s m:nome ?nome.\n"+
                   "?s m:ano ?ano.\n"+
                   "}"
    
    var queryInfo = "select ?sigla ?nome ?flag where{\n"+
                    "m:"+pais+" m:nome ?nome;\n"+
                    "m:sigla ?sigla;\n"+
                    "m:imagem ?flag.\n"+
                    "}"
    
  
    client.query(queryM).execute().then(function(qres){
        console.log(qres.results.bindings)
        client.query(queryPil).execute().then(function(qres2){
            console.log(qres2.results.bindings)
            client.query(queryPro).execute().then(function(qres3){
                console.log(qres3.results.bindings)
                client.query(queryInfo).execute().then(function(qres4){
                    var nome2 = qres4.results.bindings[0].nome.value.split(' ').join('_')
                    var query3 = "select distinct ?link where {\n"+
                        '{?s rdfs:label "'+qres4.results.bindings[0].nome.value +'"@en.} UNION {dbr:'+nome2+' dbo:wikiPageRedirects ?s}'+
                        '?s dbo:wikiPageExternalLink ?link.\n'+
                        '}'
                    console.log(query3)
                    client2.query(query3).execute().then(function(qres5){

                        var provas = []

                        for (v in qres3.results.bindings){
                            var ano = qres3.results.bindings[v].ano.value
                            var nome = qres3.results.bindings[v].nome.value
                            nome = nome.split(' ').join('')
                            var uri = ano +"_"+nome 
                            console.log(uri)
                            provas.push(uri)
                        }
                        console.log(provas)

                        res.render("pais",{marcas:qres.results.bindings,pilotos:qres2.results.bindings,provas:provas,info:qres4.results.bindings[0],link:qres5.results.bindings[0].link.value})
                    })    
                })          
            })
        })
    })
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {

        var query = "INSERT DATA{\n"+
        "m:"+ fields.nome + " a m:Pais;\n"+
        '   m:nome "' + fields.nome + '";\n'+
        '   m:sigla "' + fields.sigla + '";\n'+
        '   m:imagem "paises/' + fields.nome.split(" ").join("") + '".\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('paises/'+ fields.nome.split(" ").join("")) 
        }) 

    })
})

module.exports = router;
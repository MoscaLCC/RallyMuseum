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
router.get('/:eq', function(req, res, next) {
    var eq = req.params.eq
    console.log(eq)

    var query = "select distinct ?pnome ?paplido ?proano ?pronome ?uri where {\n"+
                "m:"+eq+" m:éEquipaDe ?s.\n"+
                "?s m:temPiloto ?p;\n"+
                "m:participou ?prova;\n"+
                "m:imagem ?uri.\n"+
                '?p m:funcao "Piloto".\n'+
                "?p m:nome ?pnome;\n"+
                "m:aplido ?paplido.\n"+
                "?prova m:ano ?proano;\n"+
                "m:nome ?pronome.\n"+
                "}"

    var query2 = "select distinct ?nome where{\n"+
                 "m:"+eq+" m:nome ?nome.\n"+
                 "}"
                 

    client.query(query).execute().then(function(qres){
        client.query(query2).execute().then(function(qres2){
            var nome2 = qres2.results.bindings[0].nome.value.split(' ').join('_')
            var query3 = "select distinct ?link ?text where {\n"+
                 '{?s rdfs:label "'+qres2.results.bindings[0].nome.value +'"@en.} UNION {dbr:'+nome2+' dbo:wikiPageRedirects ?s}'+
                 '?s dbo:wikiPageExternalLink ?link.\n'+
                 '?s dbo:abstract ?text.'+
                 'FILTER (lang(?text) = "pt")'+
                 '}'
            client2.query(query3).execute().then(function(qres3){
                console.log(JSON.stringify(qres3))
                if(qres3.results.bindings[0])
                    res.render("equipa",{participacoes:qres.results.bindings,nome:qres2.results.bindings[0].nome.value, link:qres3.results.bindings[0].link.value, text:qres3.results.bindings[0].text.value}) 
                else
                    res.render("equipa",{participacoes:qres.results.bindings,nome:qres2.results.bindings[0].nome.value}) 
                
            })
        })
    })
    
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {
        
        var query = "INSERT DATA{\n"+
        "m:"+ fields.nome.split(" ").join("") + " a m:Equipa;\n"+
        '   m:nome "' + fields.nome.split(" ").join("") + '";\n'+
        '   m:imagem "equipas/' + fields.nome.split(" ").join("") + '".\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('equipas/'+fields.nome.split(" ").join("")) 
        }) 

    })
})

module.exports = router;
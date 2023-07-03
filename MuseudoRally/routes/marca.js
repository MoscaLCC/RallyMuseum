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
router.get('/', function(req, res, next) {
    var query = "select distinct ?nome ?imagem ?lat ?lng where{\n" +
        "?s a m:Marca.\n" +
        "?s m:nome ?nome.\n" +
        "?s m:lat ?lat.\n"+
        "?s m:lng ?lng.\n"+
        "?s m:imagem ?imagem.\n" +
    "}"


    client.query(query).execute().then(function(qres){
        console.log(JSON.stringify(qres))
        for (r in qres.results.bindings){
            qres.results.bindings[r].lat = qres.results.bindings[r].lat.value
            qres.results.bindings[r].lng = qres.results.bindings[r].lng.value
        }
        res.clearCookie('marks')
        console.log(JSON.stringify(qres))
        res.cookie('marks', JSON.stringify(qres))
        res.render("mapa",{info:qres.results.bindings})
    })
})



router.get('/:marc', function(req, res, next) {
    var marc = req.params.marc
    console.log(marc)

    var query = "select distinct ?uri ?mat ?mod ?vers where {\n"+
                "m:"+marc+" m:éMarcaDe ?o.\n"+ 
                "?o m:matricula ?mat.\n"+
                "?o m:modelo ?mod.\n"+
                "?o m:versao ?vers.\n"+
                "?part m:temCarro ?o.\n"+
                "?part m:imagem ?uri.\n"+
                "}order by ?mod ?vers"

    var query2 = "select distinct ?nome ?img ?pimg ?psig where {\n"+
                 "m:"+marc+" m:nome ?nome;\n"+
                 "m:imagem ?img;\n"+
                 "m:temPais ?p.\n"+
                 "?p m:imagem ?pimg;\n"+
                 "m:sigla ?psig.\n"+
                 "}"            

    client.query(query).execute().then(function(qres){
        client.query(query2).execute().then(function(qres2){
            var nome2 = qres2.results.bindings[0].nome.value.split(' ').join('_')
            var query3 = "select distinct ?link ?text where {\n"+
                        '{?s rdfs:label "'+qres2.results.bindings[0].nome.value +'"@en.} UNION {dbr:'+nome2+' dbo:wikiPageRedirects ?s}'+
                        'OPTIONAL{?s dbo:wikiPageExternalLink ?link.}\n'+
                        'OPTIONAL{?s dbo:abstract ?text. FILTER (lang(?text) = "pt")}'+
                        '}'
            client2.query(query3).execute().then(function(qres3){
                console.log(JSON.stringify(qres3))
                if(qres2.results.bindings[0]){
                    res.render("marca",{carros:qres.results.bindings,info:qres2.results.bindings[0], infodbp:qres3.results.bindings[0]})                
                }
                else{
                    res.render("marca",{carros:qres.results.bindings,info:qres2.results.bindings[0]})                
               
                }
            })
        })
    })
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {
        
        var query = "INSERT DATA{\n"+
        "m:"+ fields.nome.split(" ").join("") + " a m:Marca;\n"+
        '   m:nome "' + fields.nome.split(" ").join("") + '";\n'+
        '   m:imagem "marcas/' + fields.nome.split(" ").join("") + '";\n'+
        '   m:temPais  m:' + fields.pais.split(" ").join("") + '.\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('marcas/'+fields.nome.split(" ").join("")) 
        }) 

    })
})

module.exports = router;
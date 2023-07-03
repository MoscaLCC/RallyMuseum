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
router.get('/:pil', function(req, res, next) {
    var pil = req.params.pil
    
    console.log(pil)
    var query = "select ?nome ?aplido ?func ?sigla ?pimg where {\n"+
                "m:"+pil+" m:temPais ?pais;\n"+
                "m:nome ?nome;\n"+
                "m:aplido ?aplido;\n"+
                "m:funcao ?func.\n"+
                "?pais m:sigla ?sigla;\n"+
                "m:imagem ?pimg.\n"+
                "}"
                
    var query2 = "select distinct ?pimg ?ano ?nome where {\n"+
                 "{m:"+pil+" m:éPilotoDe ?p}UNION{m:"+pil+" m:éCopilotoDe ?p}\n"+
                 "?p m:participou ?prova.\n"+
                 "?p m:imagem ?pimg.\n"+
                 "?prova m:nome ?nome.\n"+
                 "?prova m:ano ?ano.\n"+
                 "}"
    
  
    client.query(query).execute().then(function(qres){
            console.log(qres)
            client.query(query2).execute().then(function(qres2){
                console.log(qres2)
                
                var piloto = qres.results.bindings[0].nome.value + " "  +qres.results.bindings[0].aplido.value                   
                var piloto2 = qres.results.bindings[0].nome.value + "_"  +qres.results.bindings[0].aplido.value
                var query3 = 'select distinct ?img ?link ?text ?dnasc ?frace ?fwin ?pod ?points ?races ?swin ?wins where {\n'+
                            '{?s foaf:name "'+piloto+'"@en} UNION{dbr:'+piloto2+' dbo:wikiPageRedirects ?s}\n'+
                            'OPTIONAL{?s dbo:thumbnail ?img.}\n'+
                            'OPTIONAL{?s dbo:wikiPageExternalLink ?link.}\n'+
                            'OPTIONAL{?s dbo:abstract ?text. FILTER(lang(?text) = "pt")}\n'+
                            'OPTIONAL{?s dbo:birthDate ?dnasc.}\n'+
                            'OPTIONAL{?s dbp:firstRace ?frace.}\n'+
                            'OPTIONAL{?s dbp:firstWin ?fwin.}\n'+
                            'OPTIONAL{?s dbp:podiums ?pod.}\n'+
                            'OPTIONAL{?s dbp:points ?points.}\n'+
                            'OPTIONAL{?s dbp:races ?races.}\n'+
                            'OPTIONAL{?s dbp:stagewins ?swin.}\n'+
                            'OPTIONAL{?s dbp:wins ?wins.}\n'+
                            '}'

                console.log(query3)
                client2.query(query3).execute().then(function(qres3){
                    console.log(qres3)
                        res.render("piloto",{info:qres.results.bindings[0],participacoes:qres2.results.bindings,infodbp:qres3.results.bindings[0]})
                }) 
        })
    })
    
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {
        
        var query = "INSERT DATA{\n"+
        "m:"+ fields.nome.split(" ").join("") + fields.aplido.split(" ").join("") + " a m:Piloto;\n"+
        "   m:temPais m:" + fields.nacionalidade.split(" ").join("") +";\n"+ 
        '   m:aplido "' + fields.aplido.split(" ").join("") + '";\n'+
        '   m:nome "' + fields.nome.split(" ").join("") + '";\n'+
        '   m:funcao "' + fields.funcao.split(" ").join("") + '".\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('piloto/'+fields.nome.split(" ").join("") + fields.aplido.split(" ").join("")) 
        }) 

    })
})
module.exports = router;
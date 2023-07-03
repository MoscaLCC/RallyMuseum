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
router.get('/:car', function(req, res, next) {
    var car = req.params.car
    var car2 = car.split(" ").join("-")
    console.log(car2)
    var query = "select ?modelo ?versao ?serie ?dec ?body ?chassi ?matr ?marc ?marci where {\n" +
                "m:"+car2+" m:temMarca ?marca;\n"+
                "m:modelo ?modelo;\n"+
                "m:versao ?versao;\n"+
                "m:serie ?serie;\n"+
                "m:body ?body;\n"+
                "m:chassi ?chassi;\n"+
                "m:matricula ?matr.\n"+
                "?marca m:nome ?marc.\n"+
                "?marca m:imagem ?marci.\n" +
                "OPTIONAL{m:"+car2+" m:decoracao ?dec.}\n"+
                "}"
    var query2 = "select distinct ?uri ?ano ?nome where {\n"+
                 "m:"+car2+" m:éCarroDe ?s.\n"+
                 "?s m:imagem ?uri.\n"+
                 "?s m:participou ?pr.\n"+
                 "?pr m:ano ?ano.\n"+
                 "?pr m:nome ?nome.\n"+
                 "}"
    console.log(query)
    client.query(query).execute().then(function(qres){
        client.query(query2).execute().then(function(qres2){ 
            res.render("carro",{info:qres.results.bindings[0],provas:qres2.results.bindings})
        })
    })
    
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {
        
        var query = "INSERT DATA{\n"+
        "m:"+ fields.matricula.split(" ").join("-") +" a m:Carro;\n"+
        "   m:temMarca m:" + fields.marca.split(" ").join("") +";\n"+ 
        '   m:modelo "' + fields.modelo.split(" ").join("") + '";\n'+
        '   m:serie "' + fields.serie.split(" ").join("") + '";\n'+
        '   m:versao "' + fields.versao.split(" ").join("") + '";\n'+
        '   m:decoracao "' + fields.decoracao.split(" ").join("") + '";\n'+
        '   m:body "' + fields.body.split(" ").join("") + '";\n'+
        '   m:matricula "' + fields.matricula.split(" ").join("") + '";\n'+
        '   m:chassi "' + fields.chassi.split(" ").join("") + '".\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('carro/'+fields.matricula.split(" ").join("-")) 
        }) 

    })
})

module.exports = router;
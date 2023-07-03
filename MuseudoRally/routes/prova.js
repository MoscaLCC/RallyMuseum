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
router.get('/:prov', function(req, res, next) {
    var prov = req.params.prov
    console.log(prov)
    var participantes
    var info
    var query = "select distinct ?pn ?pa ?pi ?cn ?ca ?ci ?part ?class where {\n"+
        "m:"+prov+" m:temParticipante ?participant.\n"+
        "?participant m:temPiloto ?pil.\n"+
        "?pil m:nome ?pn.\n"+
        "?pil m:aplido ?pa.\n"+
        "?pil m:temPais ?pp.\n"+
        "?pp m:imagem ?pi.\n"+
        "?participant m:temCopiloto ?co.\n"+
        "?co m:nome ?cn.\n"+
        "?co m:aplido ?ca.\n"+
        "?co m:temPais ?cp.\n"+
        "?cp m:imagem ?ci.\n"+
        "?participant m:imagem ?part.\n"+
        "?participant m:classificacao ?class.\n"+
        "}order by ?class\n"
    var query2 = "select ?imagem ?edicao ?cidade ?nome ?ano ?sigla ?img where {\n"+
                 "m:"+prov+" m:temPais ?pais.\n"+
                 "m:"+prov+" m:imagem ?imagem.\n"+
                 "m:"+prov+" m:edicao ?edicao.\n"+
                 "m:"+prov+" m:cidade ?cidade.\n"+
                 "m:"+prov+" m:nome ?nome.\n"+
                 "m:"+prov+" m:ano ?ano.\n"+
                 "?pais m:sigla ?sigla.\n"+
                 "?pais m:imagem ?img.\n"+
                 "}"    
  
    client.query(query).execute().then(function(qres){
            client.query(query2).execute().then(function(qres2){
                qres2.results.bindings[0].mapas = "https://www.rally-maps.com/Rally-de-Portugal-"+qres2.results.bindings[0].ano.value
                res.render("prova",{participantes:qres,info:qres2})
            })
    })
    
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {

        var idprova = fields.ano + "_" + fields.nome.split(" ").join("")


        var query = "INSERT DATA{\n"+
        "m:"+ idprova + " a m:Prova;\n"+
        "   m:temPais m:" + fields.pais.split(" ").join("") +";\n"+ 
        '   m:nome "' + fields.nome + '";\n'+
        '   m:ano ' + fields.ano + ';\n'+
        '   m:edicao ' + fields.edicao + ';\n'+
        '   m:edicao ' + fields.edicao + ';\n'+
        '   m:cidade "' + fields.cidade + '";\n'+
        '   m:imagem "provas/' + fields.imagem + '".\n'+
        '}'

        client.query(query).execute().then(function(err){
            res.redirect('prova/'+ idprova) 
        }) 

    })
})

module.exports = router;
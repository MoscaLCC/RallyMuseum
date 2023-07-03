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
router.get('/:part', function(req, res, next) {
    var part = req.params.part
    console.log(part)
    var query = "select ?class ?comp ?img ?num ?eqi ?temp ?pra ?prn ?pn ?pa ?cn ?ca ?eqn ?pri ?marc ?marci ?modelo ?versao ?serie ?dec ?body ?chassi ?matr ?ps ?cs ?pi ?ci where {\n" +
                "m:"+part+" m:classificacao ?class;\n"+
                "m:competicao ?comp;\n"+
                "m:imagem ?img;\n"+
                "m:numero ?num;\n"+
                "m:participou ?part;\n"+
                "m:temCarro ?carro;\n"+
                "m:temPiloto ?pil;\n"+
                "m:temCopiloto ?co;\n"+
                "m:temEquipa ?eq.\n"+
                "?part m:ano ?pra;\n"+
                "m:nome ?prn.\n"+
                "?pil m:nome ?pn;\n"+
                "m:aplido ?pa;\n"+
                "m:temPais ?pp.\n"+
                "?pp m:imagem ?pi.\n"+
                "?co m:nome ?cn;\n"+
                "m:aplido ?ca;\n"+
                "m:temPais ?cp.\n"+
                "?cp m:imagem ?ci.\n"+
                "?eq m:nome ?eqn.\n"+
                "?eq m:imagem ?eqi.\n"+
                "?carro m:temMarca ?marca;\n"+
                "m:modelo ?modelo;\n"+
                "m:versao ?versao;\n"+
                "m:serie ?serie;\n"+
                "m:body ?body;\n"+
                "m:chassi ?chassi;\n"+
                "m:matricula ?matr.\n"+
                "?marca m:nome ?marc.\n"+
                "?marca m:imagem ?marci.\n" +
                "?pp m:sigla ?ps.\n"+
                "?cp m:sigla ?cs.\n" +
                "?part m:imagem ?pri.\n"+
                "OPTIONAL{?carro m:decoracao ?dec.}\n"+
                "OPTIONAL{m:"+part+" m:tempo ?temp.}\n"+
                "}"
    console.log(query)
    client.query(query).execute().then(function(qres){
        console.log(JSON.stringify(qres))
        var ano = qres['results']['bindings'][0]['pra'].value
        var nome = qres['results']['bindings'][0]['prn'].value

        nome = nome.split(' ').join('')
        var uri = ano +"_"+nome 
        res.render("participante",{info:qres,uri:uri})
        console.log(qres)
    })
    
})

router.post('/', function(req, res, next) {
    var form= new formidable.IncomingForm();
    
    form.parse(req,function(err,fields,files) {

        var idprova = fields.anop + "_" + fields.nomep.split(" ").join("")
        var idgrupo = fields.anop + "_" + fields.nomep.split(" ").join("") + "_" + fields.piloto.charAt(0) + fields.ap.charAt(0)+ "_" + fields.copiloto.charAt(0) + fields.ac.charAt(0)+ "_" + fields.carro.split(" ").join("");
        console.log(idprova);
        console.log(idgrupo);

        var query = "INSERT DATA{\n"+
        "m:"+ idgrupo + " a m:GrupoParticipante;\n"+
        '   m:numero ' + fields.numero +';\n'+ 
        '   m:temPiloto m:' + fields.piloto.split(" ").join("") + fields.ap.split(" ").join("") + ';\n'+
        '   m:temCopiloto m:' + fields.copiloto.split(" ").join("") + fields.ac.split(" ").join("") + ';\n'+
        '   m:temCarro m:' + fields.carro.split(" ").join("-") + ';\n'+
        '   m:competicao "' + fields.competicao + '";\n'+
        '   m:tempo "' + fields.tempo + '";\n'+
        '   m:classificacao ' + fields.classificacao + ';\n'+
        '   m:imagem "GParticipantes/' + idprova + '";\n'+
        '   m:participou m:' + idprova + ';\n'+
        '   m:temEquipa m:' + fields.equipa.split(" ").join("") + '.\n'+
        '}'

        console.log(query)
        client.query(query).execute().then(function(err){
            res.redirect('GParticipantes/'+ idgrupo) 
        }) 

    })
})

module.exports = router;
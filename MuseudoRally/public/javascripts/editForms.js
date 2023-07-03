function ePiloto(){
    alert("Requesitos para registar um Piloto:\n -> O País da Nacionalidade já existir na BD.")
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/piloto" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
        <label class="w3-text-grey">Nome</label>
        <input class="w3-input w3-border" type="text" id="nome" name="nome" placeholder="Nome"/>
    </p>
    <p>
        <label class="w3-text-grey">Aplido</label>
        <input class="w3-input w3-border" type="text" id="aplido" name="aplido" placeholder="Aplido"/>
    </p>
    <p>
    <label class="w3-text-grey">Nacionalidade</label>
    <input class="w3-input w3-border" type="text" id="nacionalidade" name="nacionalidade" placeholder="Nacionalidade"/>
    </p>
    <p>
    <label class="w3-text-grey">Função</label>
    <input class="w3-input w3-border" type="text" id="funcao" name="funcao" placeholder="Função"/>
    </p>  
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Piloto"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}

function eEquipa(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/equipas" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Nome</label>
    <input class="w3-input w3-border" type="text" id="nome" name="nome" placeholder="Nome"/>
    </p>  
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Equipa"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}

function eCarro(){
    alert("Requesitos para registar um Carro:\n -> A Marca do carro já existir na BD.")
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/carro" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Marca</label>
    <input class="w3-input w3-border" type="text" id="marca" name="marca" placeholder="Marca"/>
    </p>
    <p>
    <label class="w3-text-grey">Modelo</label>
    <input class="w3-input w3-border" type="text" id="modelo" name="modelo" placeholder="Modelo"/>
    </p> 
    <p>
    <label class="w3-text-grey">Serie</label>
    <input class="w3-input w3-border" type="text" id="serie" name="serie" placeholder="Serie"/>
    </p>
    <p>
    <label class="w3-text-grey">Versão</label>
    <input class="w3-input w3-border" type="text" id="versao" name="versao" placeholder="Versão"/>
    </p>
    <p>
    <label class="w3-text-grey">Body</label>
    <input class="w3-input w3-border" type="text" id="body" name="body" placeholder="Body"/>
    </p>
    <p>
    <label class="w3-text-grey">Decoração</label>
    <input class="w3-input w3-border" type="text" id="decoracao" name="decoracao" placeholder="Decoração"/>
    </p>
    <p>
    <label class="w3-text-grey">Matricula</label>
    <input class="w3-input w3-border" type="text" id="matricula" name="matricula" placeholder="Matricula"/>
    </p>
    <p>
    <label class="w3-text-grey">Chassi</label>
    <input class="w3-input w3-border" type="text" id="chassi" name="chassi" placeholder="Chassi"/>
    </p>        
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Carro"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}

function eMarca(){
    alert("Requesitos para registar uma Marca:\n -> O País da Marca já existir na BD.")
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/marcas" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Nome</label>
    <input class="w3-input w3-border" type="text" id="nome" name="nome" placeholder="Nome"/>
    </p> 
    <p>
    <label class="w3-text-grey">País</label>
    <input class="w3-input w3-border" type="text" id="pais" name="pais" placeholder="País"/>
    </p> 
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Marca"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}

function eProva(){
    alert("Requesitos para registar uma Prova:\n -> O País da Prova já existir na BD.")
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/prova" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Nome</label>
    <input class="w3-input w3-border" type="text" id="nome" name="nome" placeholder="Nome"/>
    </p>
    <p>
    <label class="w3-text-grey">Ano</label>
    <input class="w3-input w3-border" type="number" id="ano" name="ano" placeholder="Ano"/>
    </p> 
    <p>
    <label class="w3-text-grey">Edição</label>
    <input class="w3-input w3-border" type="number" id="edicao" name="edicao" placeholder="Edição"/>
    </p>
    <p>
    <label class="w3-text-grey">Pais</label>
    <input class="w3-input w3-border" type="text" id="pais" name="pais" placeholder="Pais"/>
    </p>
    <p>
    <label class="w3-text-grey">Cidade</label>
    <input class="w3-input w3-border" type="text" id="cidade" name="cidade" placeholder="Cidade"/>
    </p>
    <p>
    <label class="w3-text-grey">Logo</label>
    <input class="w3-input w3-border" type="text" id="imagem" name="imagem" placeholder="Nome da Imagem"/>
    </p>       
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Prova"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}
function ePais(){
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/paises" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Nome</label>
    <input class="w3-input w3-border" type="text" id="nome" name="nome" placeholder="Nome"/>
    </p>
    <p>
    <label class="w3-text-grey">Sigla</label>
    <input class="w3-input w3-border" type="text" id="sigla" name="sigla" placeholder="Sigla"/>
    </p>
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Pais"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}
function eGrupoParticipante(){
    alert("Requesitos para registar um Grupo Participante:\n -> O Piloto já existir na BD;\n -> O Copiloto já existir na BD;\n -> O Carro já existir na BD;\n -> A Prova já existir na BD;\n -> A Equipa já existir na BD.")
    document.getElementById('divOps').innerHTML=`
<div style="width:100%;">
<form class="w3-container" action="/GParticipantes" method="post" enctype="multipart/form-data" id="forms"> 
    <p>
    <label class="w3-text-grey">Numero</label>
    <input class="w3-input w3-border" type="number" id="numero" name="numero" placeholder="Numero"/>
    </p>
    <p>
    <label class="w3-text-grey">Piloto</label>
    <input class="w3-input w3-border" type="text" id="piloto" name="piloto" placeholder="Nome do Piloto"/>
    <input class="w3-input w3-border" type="text" id="ap" name="ap" placeholder="Aplido do Piloto"/>
    </p>
    <p>
    <label class="w3-text-grey">Copiloto</label>
    <input class="w3-input w3-border" type="text" id="copiloto" name="copiloto" placeholder="Nome do Copiloto"/>
    <input class="w3-input w3-border" type="text" id="ac" name="ac" placeholder="Aplido do Copiloto"/>
    </p>
    <p>
    <label class="w3-text-grey">Carro</label>
    <input class="w3-input w3-border" type="text" id="carro" name="carro" placeholder="Matricula do Carro"/>
    </p>
    <p>
    <label class="w3-text-grey">Competição</label>
    <input class="w3-input w3-border" type="text" id="competicao" name="competicao" placeholder="Competição"/>
    </p>
    <p>
    <label class="w3-text-grey">Tempo</label>
    <input class="w3-input w3-border" type="text" id="tempo" name="tempo" placeholder="Tempo"/>
    </p>
    <p>
    <label class="w3-text-grey">Classificação</label>
    <input class="w3-input w3-border" type="number" id="classificacao" name="classificacao" placeholder="Classificação"/>
    </p>
    <p>
    <label class="w3-text-grey">Prova</label>
    <input class="w3-input w3-border" type="number" id="anop" name="anop" placeholder="Ano da prova"/>
    <input class="w3-input w3-border" type="text" id="nomep" name="nomep" placeholder="Nome da prova"/>
    </p>
    <p>
    <label class="w3-text-grey">Equipa</label>
    <input class="w3-input w3-border" type="text" id="equipa" name="equipa" placeholder="Nome da Equipa"/>
    </p>
    <br/>
    <center>
        <p class="w3-text-white">
            <input class="w3-btn w3-blue w3-round" type="submit" value="Registar Grupo Participante"/>
        </p> 
    </center>
    <br/>
</form>
</div>
    `
}

var latitude;
var longitude;

function enviarOcorrencia() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(obterLocalizacao, naoLiberouLocalizacao);
    }
}

function naoLiberouLocalizacao() {
    alert("Não posso abrir a ocorrencia sem saber sua localização");
}

function obterLocalizacao(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    let dateObj = new Date();
    let dado = {
        data_ocorrencia : dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate(),
        longitude : location.coords.longitude,
        latitude : location.coords.latitude,
        telefone_solicitante : document.frmOcorrencia.telefone.value,
        nome_solicitante : "COBOM averiguar",
        cpf_solicitante : "COBOM averiguar",
        natureza : obtemTipoOcorrencia(),
        descricao : document.frmOcorrencia.detalhes.value
    };
    console.log("dados a serem enviados ", JSON.stringify(dado));
    $.ajax({
        type: "POST",
        url: "https://www.novatrix.com.br/cobomocorrencias/ocorrencia",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(dado),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: sucesso,
        failure: function(errMsg) {
            console.log("Erro no envio: ", errMsg);
            alert("Houve um problema na comunicação. Por favor ligue 193");
        }
    });
}

function sucesso(data) {
    console.log("retorno: ", data);
    //document.location. = "registrado.html";
}

function obtemTipoOcorrencia() {
    let inicial, final
    if (window.history.length>=2) {
        inicial = window.history.go(-2);
        final = window.history.go(-1);
    }
    return inicial + "," + final;
}


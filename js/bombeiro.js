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
    let dado;
    dado.data_ocorrencia = dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate();
    dado.longitude = location.coords.longitude;
    dado.latitude = location.coords.latitude;
    dado.telefone_solicitante = document.frmOcorrencia.telefone.value;
    dado.nome_solicitante = "COBOM averiguar";
    dado.cpf_solicitante = "COBOM averiguar";
    dado.natureza = "incendio,casa";
    dado.descricao = document.frmOcorrencia.detalhes.value;

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
    document.location = "registrado.html";
}


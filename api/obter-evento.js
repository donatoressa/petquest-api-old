function obterEvento(req, res){

    var body = {
        tipoEvento: req.body.tipoEvento,
        animal: req.body.animal,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

   database.ref("eventos").once("value")
        .then(function (retorno) {

            var dados = filtrarEventos(retorno, body);
            res.status(200).send({
                codigo: 200,
                eventos: dados
            });
        })
        .catch(function (erro) {
            res.status(500).send({
                codigo: 500,
                mensagem: erro
            });
        });
}

function filtrarEventos(dadosBD, payload) {

    var saida = [];
    forEach(evento in dadosBD, function(){
        if (evento.latitude === payload.latitude &&
            evento.longitude === payload.longitude &&
            evento.tipoEvento === payload.tipoEvento &&
            evento.animal === payload.animal) {
                saida.push(evento);
        }
    });

    return saida;
}

exports.findAll = obterEvento;

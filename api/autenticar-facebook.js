var firebase = require("firebase");
var fs = require("fs");
var provider = new firebase.auth.FacebookAuthProvider();
var token = JSON.parse(fs.readFileSync("./key/fb-token.json")).chave;
var credential = firebase.auth.FacebookAuthProvider.credential(token);

function autenticar(req, res) {

    var autenticador = firebase.auth();

    autenticador.signInWithRedirect(provider);
    autenticador.getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

exports.findAll = autenticar;
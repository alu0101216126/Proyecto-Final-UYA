$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        $("#result").text("Hola, " + user.displayName);
    } else {
        console.log('No hay nadie logueado');
    }
    });
 });
$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        $("#result").text("Hola, " + user.displayName);
    } else {
        console.log('No hay nadie logueado');
    }
    });

    $("#logout").mouseup(function() {
        firebase.auth().signOut().then(() => {
            alert('Se ha cerrado la sesión correctamente');
        }).catch((error) => {
            alert('Error al cerrar sesión');
        });
    });
 });
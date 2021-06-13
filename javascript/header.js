$(document).ready(function() {

    $("#menu_events").mousedown(function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                alert('Para acceder al menú de eventos primero debe iniciar sesión')
                window.location.href = "login.html";
            } else {
                console.log(user.email);
            }
        });
    });

    $("#mobile_menu_events").mousedown(function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                alert('Para acceder al menú de eventos primero debe iniciar sesión')
                window.location.href = "login.html";
            } else {
                console.log(user.email);
            }
        });
    });
 });
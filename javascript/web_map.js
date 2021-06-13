$(document).ready(function() {

    $("#link_menu_events").mouseup(function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                alert('Para acceder al menú de eventos primero debe iniciar sesión')
                window.location.href = "login.html";
            }
        });
    });
 });
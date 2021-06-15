// When documents ready
$(document).ready(function() {

  function validation() {
    // Getting values from the form
    var name_register = $("#name_register").val();
    var surname_register = $("#surname_register").val();
    var email_register = $("#email_register").val();
    var password_register = $("#password_register").val();
    var repeat_password = $("#repeat-password").val();
    
    // Validate entries
    var correct = true;
    if (name_register.length == 0 || surname_register.length == 0 || !/@/.test(email_register) || email_register.length == 0 || password_register.length == 0 || repeat_password == 0) {
      alert('ERROR: Los campos obligatorios no pueden estar incompletos.');
      correct = false;
    } else if (password_register != repeat_password) {
      alert('ERROR: Las contraseñas introducidas no coinciden.')
      correct = false;
    } else if (/\s/.test(password_register) || !/[A-Z]/.test(password_register) || !/[a-z]/.test(password_register) || !/[0-9]/.test(password_register) || password_register.length < 7) {
      alert('ERROR: Las contraseñas deben tener una longitud de al menos 7 caracteres, no incluir espacios e incluir mínimo: una mayúscula, una minúscula y un número')
      correct = false;
    } else if (!$('#terms').is(':checked')) {
      alert('ERROR: Debe aceptar los términos y condiciones para registrarse.');
      correct = false;
    }
    return correct;
  }


  var firebaseConfig = {
    apiKey: "AIzaSyD22sKPOpu0lUzpLwmXejHW6LH9pRDog_U",
    authDomain: "uya-proyecto.firebaseapp.com",
    projectId: "uya-proyecto",
    storageBucket: "uya-proyecto.appspot.com",
    messagingSenderId: "67002661199",
    appId: "1:67002661199:web:ad0b0f06525665e0bfad3a",
    measurementId: "G-XLK6KBNR98"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    $("#register-button").mouseup(function() {
      
      // Create new user
      if (validation) {
        var name_register = $("#name_register").val();
        var email_register = $("#email_register").val();
        var password_register = $("#password_register").val();
        firebase.auth().createUserWithEmailAndPassword(email_register, password_register)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: name_register
          }).then(() => { 
            alert(email_register + ", te has registrado correctamente. Inicia sesión y disfruta de Focus on Study.");
            window.location.href = "login.html";
          }).catch(function(error) {
            alert("Error: " + error.message);
          });
        })
        .catch((error) => {
          alert("Error al realizar el registro: " + error.message + " Código de error:" + error.code);
        });
      }
    });


    $("#register-button").on('keypress',function(e) {
      if(e.which == 13) {        
        // Create new user
        if (validation) {
          var name_register = $("#name_register").val();
          var email_register = $("#email_register").val();
          var password_register = $("#password_register").val();
          firebase.auth().createUserWithEmailAndPassword(email_register, password_register)
          .then((userCredential) => {
            userCredential.user.updateProfile({
              displayName: name_register
            }).then(() => { 
              window.location.href = "login.html";
            }).catch(function(error) {
              alert("Error: " + error.message);
            });
          })
          .catch((error) => {
            alert("Error al realizar el registro: " + error.message + " Código de error:" + error.code);
          });
        }
      }
    });
    
    // Login with an existing user
    $("#login_button").mouseup(function() {
      var email_login = $("#email_login").val();
      var password_login = $("#password_login").val();
      firebase.auth().signInWithEmailAndPassword(email_login, password_login)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        window.location.href = "user_menu.html";
      })
      .catch((error) => {
        alert("ERROR: " + error.message);
      });
    });

    $("#login_button").on('keypress',function(e) {
      if(e.which == 13) {
        var email_login = $("#email_login").val();
        var password_login = $("#password_login").val();
        firebase.auth().signInWithEmailAndPassword(email_login, password_login)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          window.location.href = "user_menu.html";
        })
        .catch((error) => {
          alert("ERROR: " + error.message);
        });
      }
    });
});

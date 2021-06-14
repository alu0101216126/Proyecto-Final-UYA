$(document).ready(function() {

  // Initialize Firebase
  var db = firebase.firestore();
  var email;

  // Obtain the user logged email
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      email = user.email;
    } else {
      window.location.href = "login.html";
    }
  });

  $("#register-homework-button").mouseup(function() {
    
    // Getting values from the form
    var name_subject = $("#name_subject").val();
    var homework_register = $("#homework_register").val();
    var date_homework = $("#date_homework").val();
    
    // Save the homework in the database
    db.collection("homework").add({
      user: email,
      subject: name_subject,
      homework: homework_register,
      date: date_homework,
    })
    .then((_) => {
      alert("La tarea se ha guardado correctamente.");
      location.reload();
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
    });
  });

  $("#register-homework-button").on('keypress',function(e) {
    if(e.which == 13) { 
      // Getting values from the form
      var name_subject = $("#name_subject").val();
      var homework_register = $("#homework_register").val();
      var date_homework = $("#date_homework").val();
      
      // Save the homework in the database
      db.collection("homework").add({
        user: email,
        subject: name_subject,
        homework: homework_register,
        date: date_homework,
      })
      .then((_) => {
        alert("La tarea se ha guardado correctamente.");
        location.reload();
      })
      .catch((error) => {
        console.error("ERROR: ", error.message);
      });
    }
  });

  $("#register-exam-button").mouseup(function() {
    // Getting values from the form
    var name_subject_exam = $("#name_subject_exam").val();
    var lesson_exam = $("#lesson_exam").val();
    var date_exam = $("#date_exam").val();
    
    // Save the homework in the database
    db.collection("exams").add({
      user: email,
      subject: name_subject_exam,
      lesson: lesson_exam,
      date: date_exam,
    })
    .then((_) => {
      alert("El examen se ha guardado correctamente.");
      location.reload();
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
    });
  });

  $("#register-exam-button").on('keypress',function(e) {
    if(e.which == 13) {
      // Getting values from the form
      var name_subject_exam = $("#name_subject_exam").val();
      var lesson_exam = $("#lesson_exam").val();
      var date_exam = $("#date_exam").val();
      
      // Save the homework in the database
      db.collection("exams").add({
        user: email,
        subject: name_subject_exam,
        lesson: lesson_exam,
        date: date_exam,
      })
      .then((_) => {
        alert("El examen se ha guardado correctamente.");
        location.reload();
      })
      .catch((error) => {
        console.error("ERROR: ", error.message);
      });
    }
  });
});

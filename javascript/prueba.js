$(document).ready(function() {

  // Initialize Firebase
var db = firebase.firestore();
var result = '';
var array_homework = []; 
var array_exam = [];
var cont_homework = 0;
var cont_exam = 0;
var aux = '';

// Obtain the user logged email
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      db.collection("homework").where("user", "==", user.email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              aux = 'homework' + cont_homework;
              result += `<tr>
              <th class="db center">${cont_homework}</th>
              <th class="db center">${doc.data().subject}</th>
              <th class="db center">${doc.data().homework}</th>
              <th class="db center">${doc.data().date}</th>     
              </tr>
              `;
              array_homework.push(doc.id);
              cont_homework++;
          });
          $("#homework").html(result);
          result = '';
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      db.collection("exams").where("user", "==", user.email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              result += `<tr>
              <th class="db center">${cont_exam}</th>
              <th class="db center">${doc.data().subject}</th>
              <th class="db center">${doc.data().lesson}</th>
              <th class="db center">${doc.data().date}</th>  
            </tr>
            `;
            array_exam.push(doc.id);
            cont_exam++;
          });
          $("#exam").html(result);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


  } else {
      console.log('No hay nadie logueado');
  }

  $("#delete_button").mouseup(function() {
      $( "td"  ).each(function( index ) {
          var input = $( this )
          console.log( index + ": " + $( this ).text() );
         if($( input ).is(':checked')) console.log('hola');
        });
  });

});
});
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
                <th class="db center">${doc.data().subject}</th>
                <th class="db center">${doc.data().homework}</th>
                <th class="db center">${doc.data().date}</th> 
                <th class="db center" id="${aux}"><label><input type="checkbox" /><span></span></label></th>    
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
                <th class="db center">${doc.data().subject}</th>
                <th class="db center">${doc.data().lesson}</th>
                <th class="db center">${doc.data().date}</th>  
                <th class="db center" id="exam${cont_exam}"><label><input type="checkbox" /><span></span></label></th>  
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
        $( "input:checkbox"  ).each(function( index ) {
            if($( this ).is(':checked')) {
                if(index < array_homework.length) {
                  db.collection("homework").doc(array_homework[index]).delete().catch((error) => {
                      alert("Error al eliminar la tarea: ", error.message);
                  });
                  console.log(array_homework[index]);
                } else {
                    var index_aux = index - array_homework.length;  
                    db.collection("exams").doc(array_exam[index_aux]).delete().catch((error) => {
                        alert("Error al eliminar el examen: ", error.message);
                    });
                    console.log(index_aux, array_exam[index_aux]);
                }
            }
          });
          alert("¡Eventos eliminados!");
          location.reload();
    });

  });
  });
  

  
  
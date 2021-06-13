$(document).ready(function() {

    // Initialize Firebase
  var db = firebase.firestore();
  var result = '';
  var array_homework = []; 
  var array_exam = [];
  var cont_homework = 0;
  var cont_exam = 0;
  var aux = '';
  var cont_tab1 = 0;
  var cont_tab2 = 0;
  
  // Obtain the user logged email
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("homework").where("user", "==", user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                result += `<tr role="row">
                <td role="cell" class="db center" tabindex="${16+cont_tab1}">${doc.data().subject}</td>
                <td role="cell" class="db center" tabindex="${17+cont_tab1}">${doc.data().homework}</td>
                <td role="cell" class="db center" tabindex="${18+cont_tab1}">${doc.data().date}</td> 
                <td role="cell" class="db center" id="homework${cont_homework}"><label><input role="checkbox" type="checkbox" tabindex="${19+cont_tab1}"/><span></span></label></td>    
                </tr>
                `;
                array_homework.push(doc.id);
                cont_homework++;
                cont_tab1 = cont_tab1 + 4;
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
                result += `<tr role="row">
                <td role="cell" class="db center" tabindex="${66+cont_tab2}">${doc.data().subject}</td>
                <td role="cell" class="db center" tabindex="${67+cont_tab2}">${doc.data().lesson}</td>
                <td role="cell" class="db center" tabindex="${68+cont_tab2}">${doc.data().date}</td>  
                <td role="cell" class="db center" id="exam${cont_exam}"><label><input role="checkbox" type="checkbox" tabindex="${69+cont_tab2}"/><span></span></label></td>  
                </tr>
                `;
              array_exam.push(doc.id);
              cont_exam++;
              cont_tab2 = cont_tab2 + 4;
            });
            $("#exam").html(result);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
  
  
    } else {
        window.location.href = "login.html";
    }

    $("#delete_button").mousedown(function() {
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
            } else {
                console.log(""); 
            }
          });
          alert("¡Eventos eliminados!");
          location.reload();
    });

  });
  });



  
  

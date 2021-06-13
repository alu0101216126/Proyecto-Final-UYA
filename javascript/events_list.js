$(document).ready(function() {

    // Initialize Firebase
  var db = firebase.firestore();
  var result = '';

  // Obtain the user logged email
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection("homework").where("user", "==", user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                result += `<tr>
                <th class="db center">${doc.data().subject}</th>
                <th class="db center">${doc.data().homework}</th>
                <th class="db center">${doc.data().date}</th>   
            </tr>
            `
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
            </tr>
            `
            });
            $("#exam").html(result);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


    } else {
        console.log('No hay nadie logueado');
    }
  });
});


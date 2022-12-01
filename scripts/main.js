function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;
            //averageDuration = docRef.get(totalTime) / docRef.get(totalSessions);
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    // let level = userDoc.data().level;
                    let petName = userDoc.data().petName;
                    let totalExp = userDoc.data().totalExp;
                    let level = Math.floor(totalExp / 100) + 1;
                    let currentExp = Math.floor(userDoc.data().totalExp - ((level - 1) * 100));
                    let height = (10 * Math.pow(1.05, level)).toFixed(2);
                    //let totalSessions = userDoc.data().totalSessions;
                    //method #1:  insert with html only
                    document.getElementById("petName-goes-here").innerHTML = petName;    //using javascript
                    document.getElementById("level-goes-here").innerText = level;
                    document.getElementById("currentExp-goes-here").innerText = currentExp;
                    document.getElementById("height-goes-here").innerText = height;
                })
            // //method #1:  insert with html only

            //method #2:  insert using jquery
            // $("#name-goes-here").text(user_Name); //using jquery

        } else {
            console.log("no user is logged in")// No user is signed in.
        }
    });
}
populateInfo(); //run the function

function readQuote() {
    db.collection("quotes").doc("Thursday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(thursdayDoc => {                                                               //arrow notation
           console.log("current document data: " + thursdayDoc.data());                          //.data() returns data object
           document.getElementById("tip-goes-here").innerHTML = thursdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
      })
}
readQuote() 
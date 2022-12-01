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
                    let totalSessions = userDoc.data().totalSessions;
                    let totalTime = userDoc.data().totalTime;
                    let averageDuration = Math.floor(totalTime / totalSessions);
                    if (totalSessions == 0) {
                        averageDuration = 0;
                    }
                    let totalExp = userDoc.data().totalExp.toFixed(0);
                    let level = Math.floor(totalExp/100) + 1;
                    //let totalSessions = userDoc.data().totalSessions;
            //method #1:  insert with html only
                    document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    document.getElementById("level-goes-here").innerText = level;
                    document.getElementById("totalSessions-goes-here").innerText = totalSessions;
                    document.getElementById("totalTime-goes-here").innerText = totalTime + " minutes";
                    document.getElementById("averageDuration-goes-here").innerText = averageDuration + " minutes";
                    document.getElementById("totalExp-goes-here").innerText = totalExp;
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
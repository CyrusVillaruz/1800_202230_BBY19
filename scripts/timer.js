// Initialize constants
const el = document.querySelector(".clock");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "study");

let initial, totalsecs, percent, paused, mins, seconds;
let headerText = document.querySelector("h1");

var startBtnVisibility = document.querySelector(".start");
startBtnVisibility.style.display = "none";

var pauseBtnVisibility = document.querySelector(".pause");
var stopBtnVisibility = document.querySelector(".reset");
var formVisibility = document.querySelector(".studyForm");
var backToMainVisibility = document.querySelector(".back-to-main");

var numOfSessions = 0;

/**
 * When the user clicks on the start button, the script will internally
 * set the timer's duration to the user's inputs.
 */
startBtn.addEventListener("click", () => {
  headerText.innerHTML = "Session In Progress";
  pauseBtnVisibility.style.display = "block";
  stopBtnVisibility.style.display = "block";
  backToMainVisibility.style.display = "none";

  let btn = localStorage.getItem("btn");

  if (btn === "study") {
    mins =+ localStorage.getItem("studyTime") || 0; // Gets the time stored from localStorage (studyTime) and adds it to mins, or adds 1 to mins (mins set to 0 by default)
  } else {
    mins =+ localStorage.getItem("breakTime") || 0;
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(startTimer(), 60); //
  startBtn.style.transform = "scale(0)";
  paused = false;
});

function startTimer() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }

  if (seconds > 0) {
    percent = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(percent);
    seconds -= 30; // Saving time from testing.
    initial = window.setTimeout("startTimer()", 1000);

    // Changes the circle to red, and adds a pulsing animation to emphasize the session ending soon.
    if (seconds < 10) {
      circle.classList.add("danger");
      headerText.innerHTML = "Session Ending Soon";
    }
  } else {
    mins = 0;
    seconds = 0;

    backToMainVisibility.style.display = "flex";
    let btn = localStorage.getItem("btn");

    pauseBtnVisibility.style.display = "none";
    stopBtnVisibility.style.display = "none";
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const incrementTotalTime = firebase.firestore.FieldValue.increment(localStorage.getItem("studyTime"));
        const incrementNumberOfSessions = firebase.firestore.FieldValue.increment(1);
        const incrementPetExp = firebase.firestore.FieldValue.increment(calculatePetExp());
        
        const userRef = db.collection("users").doc(user.uid);
        const batch = db.batch();

        batch.set(userRef, { totalTime : incrementTotalTime }, { merge: true });
        batch.set(userRef, { totalSessions : incrementNumberOfSessions }, { merge: true });
        batch.set(userRef, { totalExp : incrementPetExp }, { merge: true });

        batch.commit();
      } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
      }
    });
    // Starts break only after a study session has finished
    if (btn === "study") {
      headerText.innerHTML = "Begin Break";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
    } else {
      startBtn.classList.remove("break");
      headerText.innerHTML = "Session Ended";
      localStorage.setItem("btn", "study");
      formVisibility.style.display = "flex";

      // Experimental code

    }
    startBtn.style.transform = "scale(1)";
    // numOfSessions++;
    // console.log("Number of Sessions: " + numOfSessions);
  }
}

function calculatePetExp() {
  let x = localStorage.getItem("studyTime");
  var exp;
  if (x <= 10) {
    exp = 0;
  } else {
    var exp = 6 * Math.sqrt(5 * (x - 10));
  }
  return exp;
}






// Initialize constants
const studyTimeInput = document.querySelector("#studyTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");

// Stores the user's input into the local storage.
studyTimeInput.value = localStorage.getItem("studyTime");
breakTimeInput.value = localStorage.getItem("breakTime");

// Internally sets the user's input into the studyTime and breakTime IDs
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("studyTime", studyTimeInput.value);
  localStorage.setItem("breakTime", breakTimeInput.value);
  formVisibility.style.display = "none";
  startBtnVisibility.style.display = "block";
});

// Resets the timer to 0 on click.
document.querySelector(".reset").addEventListener("click", () => {
  startBtn.style.transform = "scale(1)";
  clearTimeout(initial);
  setProgress(0);
  mindiv.textContent = "00";
  secdiv.textContent = "00";

  headerText.innerHTML = "Start a Session";
  formVisibility.style.display = "flex";
  backToMainVisibility.style.display = "flex";
  startBtnVisibility.style.display = "none";
  pauseBtnVisibility.style.display = "none";
  stopBtnVisibility.style.display = "none";
});

/**
 * Pauses the timer to the current time on click. The user can then resume the timer
 * by clicking on the resume button.
 */
pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }
  if (paused) { // Resumes the timer (paused acts as a flag)
    paused = false;
    initial = setTimeout("startTimer()", 60);

    pauseBtn.textContent = "pause";
    var pauseImg = "<img src=\"./img/navicon/pause-circle.svg\"/></i><p>Pause</p>"
    document.querySelector(".pause").innerHTML = pauseImg;
    pauseBtn.classList.remove("resume");
    headerText.innerHTML = "Session In Progress";
  } else {
    headerText.innerHTML = "Session Paused";
    clearTimeout(initial);
    var resumeImg = "<img src=\"./img/navicon/play-circle.svg\"/></i><p>Resume</p>"
    document.querySelector(".pause").innerHTML = resumeImg;
    pauseBtn.classList.add("resume");
    paused = true;
  }
});
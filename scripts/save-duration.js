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
    pauseBtn.classList.remove("resume");
  } else {
    clearTimeout(initial);
    pauseBtn.textContent = "resume";
    pauseBtn.classList.add("resume");
    paused = true;
  }
});
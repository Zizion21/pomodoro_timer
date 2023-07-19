// Timer functionality
let timerInterval;
let timerSeconds = 1500; // 25 minutes in seconds
let isTimerRunning = false;

function startTimer() {
  if (!isTimerRunning) {
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds = 1500;
  isTimerRunning = false;
  updateTimerDisplay();
}

function showNotification () {
  if(Notification.permission === 'granted'){
    new Notification('Pomodoro Timer', {
      body: 'The timer has ended✔️'
    })
  }
  else if(Notification.permission === 'denied'){
    Notification.requestPermission().then( function (permission){
      if(Notification.permission === 'granted'){
        showNotification()
      }
    })
  }
}

function updateTimer() {
  if (timerSeconds > 0) {
    timerSeconds--;
    updateTimerDisplay();
    updateProgressBar();
  } else {
    clearInterval(timerInterval);
    isTimerRunning = false;
    showNotification();
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.querySelector(".timer").textContent = formattedTime;
}

if(Notification.permission !== 'granted'){
  Notification.requestPermission();
}

function updateProgressBar() {
  const progressBarFill = document.querySelector(".progress-bar-fill");
  const progress = (timerSeconds / 1500) * 100; // Calculate progress percentage
  progressBarFill.style.width = `${progress}%`;
}

// Button event listeners
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("pauseButton").addEventListener("click", pauseTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

// Initial timer display
updateTimerDisplay();

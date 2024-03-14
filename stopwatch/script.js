let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let isRunning = false;

const display = document.getElementById("display");
const lapsDisplay = document.getElementById("laps");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");

function startStop() {
    if (!isRunning) {
        startTimer();
        startStopButton.textContent = "Stop";
        lapButton.disabled = false;
    } else {
        stopTimer();
        startStopButton.textContent = "Start";
        lapButton.disabled = true;
    }
    isRunning = !isRunning;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function reset() {
    stopTimer();
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    display.textContent = "00:00:00";
    lapsDisplay.textContent = "";
    startStopButton.textContent = "Start";
    lapButton.disabled = true;
}

function recordLap() {
    laps.push(elapsedTime);
    const lapTime = laps.length === 1 ? elapsedTime : elapsedTime - laps[laps.length - 2];
    const lapItem = document.createElement("div");
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
    lapsDisplay.appendChild(lapItem);
}

function formatTime(time) {
    const pad = num => num.toString().padStart(2, "0");
    const minutes = pad(Math.floor(time / (1000 * 60)));
    const seconds = pad(Math.floor((time / 1000) % 60));
    const milliseconds = pad(Math.floor((time % 1000) / 10));
    return `${minutes}:${seconds}:${milliseconds}`;
}

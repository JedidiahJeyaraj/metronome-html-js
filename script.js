import PreciseTimer from "./timer.js";

const tempoDisplay = document.querySelector(".tempo");
const tempoText = document.querySelector(".tempo-text");
const decreaseTempoBtn = document.querySelector(".decrease-tempo");
const increaseTempoBtn = document.querySelector(".increase-tempo");
const tempoSlider = document.querySelector(".slider");
const startStopBtn = document.querySelector(".start-stop");
const substractBeats = document.querySelector(".substract-beats");
const addBeats = document.querySelector(".add-beats");
const measureCount = document.querySelector(".measure-count");

const click1 = new Audio("./sounds/click1.mp3");
const click2 = new Audio("./sounds/click2.mp3");

let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = "Nice and Steady";

function updateTempoDisplay() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
  metronome.interval = 60000/bpm;
  if (bpm <= 40) {
    tempoTextString = "Super Slow";
  }
  if (bpm > 40 && bpm < 80) {
    tempoTextString = "Slow";
  }
  if (bpm > 80 && bpm < 120) {
    tempoTextString = "Getting there";
  }
  if (bpm > 120 && bpm < 180) {
    tempoTextString = "Nice and Steady";
  }
  if (bpm > 180 && bpm < 220) {
    tempoTextString = "Rock n' Roll";
  }
  if (bpm > 220 && bpm < 240) {
    tempoTextString = "Funky Stuff";
  }
  if (bpm > 240 && bpm < 260) {
    tempoTextString = "Relax Dude";
  }
  if (bpm > 260 && bpm <= 280) {
    tempoTextString = "Eddie Van Halen";
  }
  tempoText.textContent = tempoTextString;
}

function updateBeatsPerMeasureDisplay() {
  measureCount.textContent = beatsPerMeasure;
  count = 0;
}

decreaseTempoBtn.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  updateTempoDisplay();
});

increaseTempoBtn.addEventListener("click", () => {
  if (bpm >= 280) {
    return;
  }
  bpm++;
  updateTempoDisplay();
});

tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  updateTempoDisplay();
});

substractBeats.addEventListener("click", () => {
  if (beatsPerMeasure <= 2) {
    return;
  }
  beatsPerMeasure--;
  updateBeatsPerMeasureDisplay();
});

addBeats.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) {
    return;
  }
  beatsPerMeasure++;
  updateBeatsPerMeasureDisplay();
});

startStopBtn.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    startStopBtn.textContent = "STOP";
  } else {
    metronome.stop();
    isRunning = false;
    startStopBtn.textContent = "START";
  }
});

function playClick() {
  if (count === beatsPerMeasure) {
    count = 0;
  }
  if (count === 0) {
    click1.play();
    click1.currentTime = 0;
  } else {
    click2.play();
    click2.currentTime = 0;
  }
  count++;
}

const metronome = new PreciseTimer(playClick, 60000 / bpm, {
  immediate: true,
});

// metronome.start()

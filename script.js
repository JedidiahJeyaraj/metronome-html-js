const bpm = 120;

const playMetronome = () => {
  setInterval(() => {
    const click = new Audio("./sounds/metronome-click.wav");
    click.play();
  }, Math.round(60000 / bpm));
};

document.getElementById("start").addEventListener("click", playMetronome);

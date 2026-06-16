const CHECK_INTERVAL_MS = 100;

let enabled = false;
let speedRate = 4;
let timer = null;

function applySpeed() {
  const video = document.querySelector("video");

  if (video) {
    video.playbackRate = speedRate;
  }
}

function resetSpeed() {
  document.querySelectorAll("video").forEach((video) => {
    video.playbackRate = 1;
  });
}

function start() {
  if (timer) {
    return;
  }

  applySpeed();
  timer = setInterval(applySpeed, CHECK_INTERVAL_MS);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  resetSpeed();
}

function setEnabled(nextEnabled) {
  enabled = nextEnabled;

  if (enabled) {
    start();
  } else {
    stop();
  }
}

function setSpeedRate(nextSpeedRate) {
  speedRate = nextSpeedRate;

  if (enabled) {
    applySpeed();
  }
}

chrome.storage.local.get({ enabled: false, speedRate: 4 }, ({ enabled: savedEnabled, speedRate: savedSpeedRate }) => {
  setSpeedRate(savedSpeedRate);
  setEnabled(savedEnabled);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") {
    return;
  }

  if (changes.speedRate) {
    setSpeedRate(Number(changes.speedRate.newValue));
  }

  if (changes.enabled) {
    setEnabled(Boolean(changes.enabled.newValue));
  }
});

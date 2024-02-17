const video = document.querySelector("video");
const banner = document.querySelector("#banner");
const videoContent = document.querySelector("#videoContent");
const playPause = document.querySelector("#playPause");
const iconPlayPause = document.querySelector("#iconPlayPause");
const progress = document.querySelector("progress");
const videoTime = document.querySelector("#videoTime");
const totalVideoTime = document.querySelector("#totalVideoTime");

// Parametre de base sur la video
video.loop = true;
video.volume = 0.5;
video.disableRemotePlayback;
progress.value = 0;

let isPlaying = false;

// Temps actuel de la video
video.addEventListener("timeupdate", () => {
  progress.value = video.currentTime / video.duration;
  const currentTime = formatTime(video.currentTime);
  videoTime.textContent = currentTime;
});

// Durée totale de la video
video.addEventListener("loadedmetadata", function () {
  const currentTimeTotal = formatTime(video.duration);
  totalVideoTime.textContent = currentTimeTotal;
});

// Convertisseur
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Pouvoir mettre en route ou en pause la video
function playPauseVideo() {
  if (isPlaying === false) {
    video.play();
    iconPlayPause.className = "fa-solid fa-pause";
    isPlaying = true;
  } else {
    video.pause();
    iconPlayPause.className = "fa-solid fa-play";
    isPlaying = false;
  }
}
playPause.addEventListener("click", () => playPauseVideo());
video.addEventListener("click", () => playPauseVideo());

// Regler le volume de la video
const volume = document.querySelector("#volume");
const volumeRange = document.querySelector("#volumeRange");
const iconVolume = document.querySelector("#iconVolume");
let isMuted = false;
let tmp = 50;
function volumeVideo() {
  if (isMuted === false) {
    tmp = volumeRange.value; // Enregistre la hauteur du song
    volumeRange.value = 0;
    video.volume = 0;
    iconVolume.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  } else {
    volumeRange.value = tmp;
    video.volume = 1;
    iconVolume.className = "fa-solid fa-volume-high";
    isMuted = false;
  }
}

// coupée ou remettre le song de la video
volume.addEventListener("click", () => volumeVideo());
volumeRange.addEventListener("change", () => {
  video.volume = volumeRange.value / 100;
  if (volumeRange.value / 0) {
    iconVolume.className = "fa-solid fa-volume-high";
    isMuted = false;
  } else if (volumeRange.value >= 0) {
    iconVolume.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  }
});

// Remetre la video a 0
document.querySelector("#restart").addEventListener("click", () => {
  video.currentTime = 0;
});

// Gerer la vitesse de la video
const speedVideo = document.querySelector("#speedVideo");
speedVideo.addEventListener("change", () => {
  video.playbackRate = speedVideo.value;
});

// Les racourcci clavier
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      playPauseVideo();
      break;
    case "ArrowLeft":
      video.currentTime -= 5;
      break;
    case "ArrowRight":
      video.currentTime += 5;
      break;
  }
});

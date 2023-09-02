const video = document.querySelector("video");
video.loop = true;
video.volume = 0.5;

const progress = document.querySelector("progress")

video.addEventListener("timeupdate", () => {
    progress.value = video.currentTime / video.duration;
})

const playPause = document.querySelector("#playPause");
const iconPlayPause = document.querySelector("#iconPlayPause");
let isPlaying = true;
function playPauseVideo() {
    if (isPlaying) {
        video.pause();
        iconPlayPause.className = "fa-solid fa-play";
        isPlaying = false;
    } else {
        video.play();
        iconPlayPause.className = "fa-solid fa-pause";
        isPlaying = true;
    }
}

playPause.addEventListener("click", () => playPauseVideo())
video.addEventListener("click", () => playPauseVideo())

const volume = document.querySelector("#volume");
const volumeRange = document.querySelector("#volumeRange");
const iconVolume = document.querySelector("#iconVolume");

let isMuted = false;
let tmp = 50;
function volumeVideo() {
    if (isMuted === false) {
        tmp = volumeRange.value;
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

volume.addEventListener("click", () => volumeVideo())

const restart = document.querySelector("#restart").addEventListener("click", () => {
    video.currentTime = 0;
})

volumeRange.addEventListener("change", () => {
    video.volume = volumeRange.value / 100;
    if (volumeRange.value / 0) {
        iconVolume.className = "fa-solid fa-volume-high";
        isMuted = false;
    } else if (volumeRange.value >= 0) {
        iconVolume.className = "fa-solid fa-volume-xmark";
        isMuted = true;
    }
})


const fullScreen = document.querySelector("#fullScreen");
fullScreen.addEventListener("click", () => openFullscreen())

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

const listSpeed = document.querySelector(".list_speed");
const readingSpeed = document.querySelector("#readingSpeed").addEventListener("click", () => {
    if (listSpeed.style.display === "flex") {
        listSpeed.style.display = "none";
    } else {
        listSpeed.style.display = "flex";
    }
})

const speeds = document.querySelectorAll("li");

// keyboard shortcut
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "Space":
            playPauseVideo();
            break
        case "ArrowLeft":
            video.currentTime -= 10;
            break
        case "ArrowRight":
            video.currentTime += 10;
            break
        case "KeyF":
                openFullscreen();
            break
    }
})
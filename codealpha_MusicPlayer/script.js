const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".img-area img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const mainAudio = document.querySelector("#main-audio");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const musicList = document.querySelector(".music-list");
const moreMusicBtn = document.querySelector("#more-music");
const closemoreMusic = document.querySelector("#close");

const colorThief = new ColorThief();

let songIndex = 0;

let allMusic = [
  {
    name: "God's Plan",
    artist: "Drake",
    img: "images/cover1.jpg",
    src: "songs/song1.mp3",
  },
  {
    name: "Faded",
    artist: "Alan Walker",
    img: "images/cover2.jpg",
    src: "songs/song2.mp3",
  },
  {
    name: "Heat Waves",
    artist: "Glass Animals",
    img: "images/cover3.jpg",
    src: "songs/song3.mp3",
  },
];

window.addEventListener("load", () => {
  loadMusic(songIndex);
  playingSong();
});

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb].name;
  musicArtist.innerText = allMusic[indexNumb].artist;
  musicImg.src = allMusic[indexNumb].img;
  mainAudio.src = allMusic[indexNumb].src;
}

musicImg.addEventListener("load", function () {
  try {
    const color = colorThief.getColor(musicImg);

    const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    const gradient = `linear-gradient(180deg, rgba(${color[0]},${color[1]},${color[2]}, 1) 0%, #1a1a1a 100%)`;

    document.documentElement.style.setProperty("--theme-color", rgbColor);
    document.documentElement.style.setProperty("--theme-bg", gradient);
  } catch (e) {
    console.log("Image not loaded yet or CORS error", e);
  }
});

function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").className = "fa-solid fa-pause";
  mainAudio.play();
}

function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").className = "fa-solid fa-play";
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
  playingSong();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > allMusic.length - 1) songIndex = 0;
  loadMusic(songIndex);
  playMusic();
  playingSong();
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) songIndex = allMusic.length - 1;
  loadMusic(songIndex);
  playMusic();
  playingSong();
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  if (duration) {
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".current");
    let musicDuartion = document.querySelector(".duration");

    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    if (totalSec) musicDuartion.innerText = `${totalMin}:${totalSec}`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  }
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
  playingSong();
});

mainAudio.addEventListener("ended", () => {
  nextBtn.click();
});

const volumeSlider = document.querySelector("#volume-slider");
const volumeIcon = document.querySelector(".volume-container i");
let recentVolume = 1;
let isMuted = false;

volumeIcon.addEventListener("click", () => {
  if (isMuted) {
    mainAudio.volume = recentVolume;
    volumeSlider.value = recentVolume * 100;
    volumeIcon.className = "fa-solid fa-volume-high";
    isMuted = false;
  } else {
    recentVolume = mainAudio.volume;
    mainAudio.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  }
});

volumeSlider.addEventListener("input", () => {
  mainAudio.volume = volumeSlider.value / 100;
  if (volumeSlider.value == 0) {
    volumeIcon.className = "fa-solid fa-volume-xmark";
    isMuted = true;
  } else {
    volumeIcon.className = "fa-solid fa-volume-high";
    isMuted = false;
  }
});

const ulTag = document.querySelector("ul");
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="duration-${i}" class="audio-duration">...</span> 
                <audio id="audio-${i}" src="${allMusic[i].src}" preload="metadata"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDurationTag = ulTag.querySelector(`#duration-${i}`);
  let liAudioTag = ulTag.querySelector(`#audio-${i}`);
  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
  });
}

function playingSong() {
  const allLiTags = ulTag.querySelectorAll("li");
  for (let j = 0; j < allLiTags.length; j++) {
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
    }
    if (allLiTags[j].getAttribute("li-index") == songIndex) {
      allLiTags[j].classList.add("playing");
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  songIndex = getLiIndex;
  loadMusic(songIndex);
  playMusic();
  playingSong();
}

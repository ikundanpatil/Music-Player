const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");

const title = document.querySelector(".song-info h1");
const artist = document.querySelector(".song-info p");
const albumCover = document.querySelector(".album-section img");
const duration = document.getElementById("duration");

// Playlist
const songs = [
  {
    title: "Zulfein",
    artist: "Mehul Mahesh",
    src: "./Audio/Zulfein - Mehul Mahesh.mp3",
    cover: "./Album Poster/album2.jpg",
  },
  {
    title: "Kasoor",
    artist: "Prateek Kuhad",
    src: "./Audio/Kasoor-Acoustic.mp3",
    cover: "./Album Poster/album3.jpg",
  },
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    src: "./Audio/Dooron Dooron Unplugged Paresh Pahuja 320 Kbps.mp3",
    cover: "./Album Poster/album4.jpg",
  },
  {
    title: "Love Me Not",
    artist: "Ravyn Lenae",
    src: "./Audio/Ravyn_Lenae_-_Love_Me_Not.mp3",
    cover: "./Album Poster/album1.jpg",
  },
];

let currentSong = 0;

// Load selected song
function loadSong(index) {
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;
  albumCover.src = song.cover;
  albumCover.alt = song.title + " album cover";

  audio.src = song.src;
  progress.value = 0;
  currentTime.textContent = "0:00";
}

// Update progress and time
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);

  currentTime.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
});

// Seek through the song
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Next song
document.getElementById("next").addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play().catch(() => {});
});

// Previous song
document.getElementById("previous").addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play().catch(() => {});
});

// Automatically play next song when current song ends
audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play().catch(() => {});
});

// Update total duration when a song loads
audio.addEventListener("loadedmetadata", () => {
  if (!isFinite(audio.duration)) return;

  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60);

  duration.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
});

// By My Own

function loadSong(index) {
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;

  albumCover.src = song.cover;
  albumCover.alt = song.title + " album cover";

  albumCover.onerror = () => {
    console.log("Image not found:", albumCover.src);
  };

  audio.src = song.src;
  progress.value = 0;
  currentTime.textContent = "0:00";
}

loadSong(currentSong);

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch((error) => {
      console.error("Unable to play song:", error);
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playButton.innerHTML = '<i data-lucide="pause"></i>';
  lucide.createIcons();
});

audio.addEventListener("pause", () => {
  playButton.innerHTML = '<i data-lucide="play"></i>';
  lucide.createIcons();
});

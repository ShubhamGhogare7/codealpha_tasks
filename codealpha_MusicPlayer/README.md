# 🎵 Glassmorphism Music Player

A modern, fully functional web-based music player featuring a premium **Glassmorphism UI** and **Dynamic Theming**. The application extracts the dominant color from the album art in real-time and adapts the interface (gradients, buttons, progress bars) to match the song's vibe.

## ✨ Key Features

- **Dynamic Theming:** Uses `ColorThief.js` to extract dominant colors from album covers and apply them to the UI variables automatically.
- **Glassmorphism UI:** Modern aesthetic using CSS `backdrop-filter: blur()`, translucency, and soft shadows.
- **Audio Controls:** Play, pause, next, previous, and click-to-seek progress bar.
- **Playlist System:** A slide-up drawer listing all songs with auto-calculated duration.
- **Volume Manager:** Custom slider with a mute toggle feature.
- **Smart Icons:** Play/Pause and Mute/Unmute icons toggle state dynamically.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure and Audio API.
- **CSS3:** CSS Variables (`var(--theme-color)`), Flexbox, Animations, and Media Queries.
- **JavaScript (ES6):** DOM Manipulation, Event Listeners, and Asynchronous logic.
- **Library:** [ColorThief](for image color extraction).
- **Icons:** [FontAwesome 6]

## 📂 Project Structure

/glass-music-player
│
├── images/ # Album art (.jpg/.png)
├── songs/ # Audio files (.mp3)
├── index.html # Main structure
├── style.css # Styling and animations
├── script.js # Logic (Audio API, ColorThief, UI)
└── README.md # Documentation

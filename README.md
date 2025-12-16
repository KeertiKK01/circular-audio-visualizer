🎧 Circular Audio Visualizer with Streaming Transcription

📌 Project Overview : 
This project demonstrates a real-time circular audio visualizer with dual-ring animation and live speech transcription, built as part of a full-stack internship assignment.
The system streams audio in small continuous chunks to a backend using WebSockets, while simultaneously rendering a smooth visualizer and displaying live spoken text on the frontend.

🚀 Features
- 🎤 Microphone access using MediaStream API
- 🎧 Real-time frequency analysis using Web Audio API (AnalyserNode)
- 🎨 Dual-ring circular audio visualizer (inner + outer rings)
- ⚡ Smooth 60 FPS animation
- 🗣️ Live speech-to-text display
- 🔁 WebSocket-based audio streaming architecture
- ☁️ Deployed on Render (Frontend + Backend)

🛠️ Tech Stack
# Frontend
  - HTML5
  - CSS3
  - JavaScript
  - Web Audio API
  - MediaRecorder API
  - Browser Speech Recognition API

# Backend
  - Java
  - Spring Boot (WebFlux)
  - WebSockets (Netty)
  - Docker
    
# Deployment
  - Render (Static Site + Web Service)
  - GitHub

🧩 Architecture
Browser (Mic + Visualizer)
        ↓ WebSocket (WSS)
Spring Boot WebFlux Backend

▶️ How It Works
- User clicks Start Mic
- Browser requests microphone permission
- Audio frequencies are analyzed in real time
- Dual-ring circular visualizer reacts instantly
- Audio chunks are sent to backend via WebSocket
- Spoken words appear live on the screen

🌐 Live Demo: https://circular-audio-visualizer.onrender.com/

📦 How to Run Locally
Frontend : Open index.html using Live Server

Backend : 
   - mvn clean package
  - java -jar target/streaming-backend-0.0.1-SNAPSHOT.jar

👤 Author
Keerti Kushwaha

📝 Notes
-  Browser-based speech recognition is used for demo purposes.
-  Backend is designed to be Gemini API–ready for real-time transcription.
-  The architecture supports low-latency, scalable streaming.

🏁 Conclusion : 
This project demonstrates practical knowledge of real-time audio processing, reactive backend design, and modern UI/UX principles, aligned with real-world streaming system requirements.

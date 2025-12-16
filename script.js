// ================== ELEMENTS ==================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const transcriptDiv = document.getElementById("transcript");
const startBtn = document.getElementById("startBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================== VARIABLES ==================
let audioCtx, analyser, dataArray;
let socket;

// ================= BUTTON CLICK =================
startBtn.addEventListener("click", async () => {

  // 🔗 BACKEND WEBSOCKET CONNECT (Render URL)
  socket = new WebSocket(
    "https://streaming-backend-0qu2.onrender.com/"
  );

  socket.onopen = () => {
    console.log("✅ WebSocket connected to backend");
  };

  socket.onmessage = (event) => {
    console.log("📨 From backend:", event.data);
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
  };

  // 🎤 MIC ACCESS
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // 🔊 AUDIO CONTEXT
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  // 🎧 SEND AUDIO CHUNKS TO BACKEND (DEMO STREAM)
  const recorder = new MediaRecorder(stream);

  recorder.ondataavailable = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("audio-chunk");
    }
  };

  recorder.start(300); // small continuous chunks

  // 🟢 START VISUALIZER
  draw();

  // 🗣️ SPEECH TO TEXT (REAL WORDS – DEMO)
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      transcriptDiv.innerText = text;
    };

    recognition.start();
  } else {
    transcriptDiv.innerText = "Speech recognition not supported in this browser";
  }
});

// ================= CIRCULAR VISUALIZER =================
function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  // Clear background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const bars = 120;

  // 🔵 INNER RING
  const innerBaseRadius = 140;
  const innerMaxLength = 60;

  // 🔴 OUTER RING
  const outerBaseRadius = 220;
  const outerMaxLength = 120;

  for (let i = 0; i < bars; i++) {
    const angle = (i / bars) * Math.PI * 2;

    const value = dataArray[i];
    const normalized = value / 255;

    /* ---------- INNER RING ---------- */
    const innerLen = normalized * innerMaxLength;

    const ix1 = cx + Math.cos(angle) * innerBaseRadius;
    const iy1 = cy + Math.sin(angle) * innerBaseRadius;

    const ix2 = cx + Math.cos(angle) * (innerBaseRadius + innerLen);
    const iy2 = cy + Math.sin(angle) * (innerBaseRadius + innerLen);

    ctx.strokeStyle = `hsl(${i * 3}, 100%, 45%)`;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(ix1, iy1);
    ctx.lineTo(ix2, iy2);
    ctx.stroke();

    /* ---------- OUTER RING ---------- */
    const outerLen = normalized * outerMaxLength;

    const ox1 = cx + Math.cos(angle) * outerBaseRadius;
    const oy1 = cy + Math.sin(angle) * outerBaseRadius;

    const ox2 = cx + Math.cos(angle) * (outerBaseRadius + outerLen);
    const oy2 = cy + Math.sin(angle) * (outerBaseRadius + outerLen);

    ctx.strokeStyle = `hsl(${i * 3 + 120}, 100%, 60%)`;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(ox1, oy1);
    ctx.lineTo(ox2, oy2);
    ctx.stroke();
  }
}

// ================= RESIZE =================
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

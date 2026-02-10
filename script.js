// =============================================
// Valentine Proposal – Interactive Logic
// =============================================

// Progressive messages when NO is clicked
const NO_MESSAGES = [
  "No 🙃",
  "Are you sure? 🥺",
  "Come on…",
  "I want you 💗",
  "You're breaking my heart 💔",
  "You're not escaping 😏",
  "Nice try 😘",
  "Say yes already! 🥰",
  "Last chance… just say yes 💖",
];

let noCount = 0;

// DOM elements
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const subtitle = document.getElementById("subtitle");
const proposal = document.getElementById("proposal");
const success = document.getElementById("success");
const confettiContainer = document.getElementById("confetti");
const mainContainer = document.getElementById("main-container");

// =============================================
// YES button handler – show success state
// =============================================
function handleYes() {
  proposal.style.display = "none";
  success.style.display = "flex";
  spawnConfetti();
}

// =============================================
// NO button handler – cycle messages, move button
// =============================================
function handleNo() {
  noCount++;

  // Auto-accept after exhausting all messages
  if (noCount >= NO_MESSAGES.length) {
    handleYes();
    return;
  }

  // Update NO button text
  noBtn.textContent = NO_MESSAGES[noCount];

  // Shrink NO button, grow YES button
  const noSize = Math.max(14 - noCount, 10);
  noBtn.style.fontSize = noSize + "px";
  noBtn.style.opacity = Math.max(1 - noCount * 0.12, 0.4);

  const yesSize = 18 + noCount * 2;
  const yesPadV = 16 + noCount * 3;
  const yesPadH = 44 + noCount * 6;
  yesBtn.style.fontSize = yesSize + "px";
  yesBtn.style.padding = yesPadV + "px " + yesPadH + "px";

  // Update subtitle
  subtitle.textContent = noCount >= 3
    ? "You know you want to say yes… 💕"
    : "Think about it… 🥰";
  subtitle.classList.add("fade-in");

  // Shake the NO button
  noBtn.classList.add("shake");
  setTimeout(function () {
    noBtn.classList.remove("shake");
  }, 600);

  // Move NO button to random position
  moveNoButton();
}

// =============================================
// Move NO button randomly within viewport
// =============================================
function moveNoButton() {
  var rect = mainContainer.getBoundingClientRect();
  var btnW = noBtn.offsetWidth;
  var btnH = noBtn.offsetHeight;
  var maxX = (rect.width - btnW) / 2;
  var maxY = 80; // keep within reasonable vertical range
  var x = (Math.random() * 2 - 1) * maxX;
  var y = (Math.random() * 2 - 1) * maxY;
  noBtn.style.transform = "translate(" + x + "px, " + y + "px)";
}

// =============================================
// Hover/touch evasion – move after first NO
// =============================================
function handleNoHover() {
  if (noCount > 0) {
    moveNoButton();
  }
}

// =============================================
// Confetti – spawn emoji particles on success
// =============================================
function spawnConfetti() {
  var shapes = ["❤️", "💖", "💕", "✨", "🌹", "💗"];
  for (var i = 0; i < 40; i++) {
    var span = document.createElement("span");
    span.className = "confetti-piece";
    span.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = (14 + Math.random() * 20) + "px";
    span.style.setProperty("--duration", (2 + Math.random() * 3) + "s");
    span.style.setProperty("--delay", (Math.random() * 1.5) + "s");
    confettiContainer.appendChild(span);
  }
}

// =============================================
// Floating hearts background – spawned on load
// =============================================
(function createFloatingHearts() {
  var container = document.getElementById("floating-hearts");
  for (var i = 0; i < 15; i++) {
    var span = document.createElement("span");
    span.className = "floating-heart";
    span.textContent = "💕";
    var size = 12 + Math.random() * 24;
    var opacity = 0.15 + Math.random() * 0.35;
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = size + "px";
    span.style.setProperty("--duration", (5 + Math.random() * 8) + "s");
    span.style.setProperty("--delay", (Math.random() * 10) + "s");
    span.style.setProperty("--opacity", opacity);
    container.appendChild(span);
  }
})();

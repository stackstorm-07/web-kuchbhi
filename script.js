/* ---------- HELPERS ---------- */
const $ = id => document.getElementById(id);
const $$ = cls => document.querySelector(cls);

/* ---------- STATE ---------- */
let studyHistory = JSON.parse(localStorage.getItem("studyHistory")) || [];
let generatedOTP = "";

/* ---------- LOGIN MODAL ---------- */
function openLogin() {
  $("loginModal").style.display = "flex";
}

function sendOTP() {
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const phone = $("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  alert("Demo OTP: " + generatedOTP); // Replace with SMS API later

  localStorage.setItem("user", JSON.stringify({ name, email, phone }));

  $("step1").style.display = "none";
  $("step2").style.display = "block";
}

function verifyOTP() {
  const otp = $("otp").value.trim();
  if (otp === generatedOTP) {
    const user = JSON.parse(localStorage.getItem("user"));
    $("loginBtn").innerText = `Hi, ${user.name} 👋`;
    $("loginModal").style.display = "none";
    $("step1").style.display = "block";
    $("step2").style.display = "none";
    $("otp").value = "";
  } else {
    alert("Invalid OTP. Please try again.");
  }
}

/* ---------- AI + YouTube FETCH ---------- */
async function fetchAIExplanation(topic) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: `Explain "${topic}" clearly for fast exam revision with key points.` }],
        temperature: 0.5,
        max_tokens: 400
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return `${topic} is explained in a simplified way for revision (default fallback).`;
  }
}

async function fetchYoutubeLinks(topic) {
  const API_KEY = "YOUR_YOUTUBE_API_KEY";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(topic)}&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);
  } catch (err) {
    console.error(err);
    return [`https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`];
  }
}

/* ---------- AI STUDY MODULE ---------- */
async function generateStudy() {
  const topic = $("topicInput").value.trim();
  if (!topic) { alert("Please enter a topic"); return; }

  const output = $$(".output");
  output.style.display = "block";
  $("topicTitle").innerText = topic;

  // AI Explanation
  $("explanation").innerText = "Loading explanation...";
  const explanation = await fetchAIExplanation(topic);
  $("explanation").innerText = explanation;

  // Google search link
  const googleLink = $("googleLink");
  googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(topic)}`;
  googleLink.innerText = `🔎 Search "${topic}" on Google`;
  googleLink.target = "_blank";

  // YouTube links
  const youtubeLinksContainer = $("youtubeLink");
  youtubeLinksContainer.innerHTML = "Loading YouTube links...";
  const youtubeLinks = await fetchYoutubeLinks(topic);
  youtubeLinksContainer.innerHTML = "";
  youtubeLinks.forEach((link, idx) => {
    youtubeLinksContainer.innerHTML += `<a href="${link}" target="_blank">▶ YouTube Video ${idx + 1}</a><br>`;
  });

  // Sample questions
  const questions = [
    `What is ${topic}?`,
    `Why is ${topic} important for exams?`,
    `Mention one real-life application of ${topic}`,
    `Give an example to illustrate ${topic}.`,
    `List the key points to remember about ${topic}.`
  ];
  const list = $("questions");
  list.innerHTML = "";
  questions.forEach(q => list.innerHTML += `<li>${q}</li>`);

  saveProgress(topic);
  $("topicInput").value = "";
}

/* ---------- PROGRESS TRACKING ---------- */
function saveProgress(topic) {
  const entry = { topic, time: new Date().toISOString(), status: "learning" };
  studyHistory.push(entry);
  localStorage.setItem("studyHistory", JSON.stringify(studyHistory));
  updateProgressUI();
}

function updateProgressUI() {
  const container = $("progressList");
  if (!container) return;
  container.innerHTML = "";
  studyHistory.slice().reverse().forEach(p => {
    container.innerHTML += `
      <div class="progress-item">
        <strong>${p.topic}</strong>
        <span>${new Date(p.time).toLocaleString()}</span>
      </div>`;
  });
}

/* ---------- SEARCH IN STUDY HISTORY ---------- */
function searchStudy(e) {
  if (e.key !== "Enter") return;
  const query = e.target.value.toLowerCase();
  const container = $("progressList");
  const filtered = studyHistory.filter(s => s.topic.toLowerCase().includes(query));
  container.innerHTML = filtered.length === 0 ? "<p>No topics found</p>" :
    filtered.map(p => `<div class="progress-item"><strong>${p.topic}</strong><span>${new Date(p.time).toLocaleString()}</span></div>`).join('');
}

/* ---------- INITIAL LOAD ---------- */
updateProgressUI();
$("topicInput").addEventListener("keydown", e => { if (e.key === "Enter") generateStudy(); });

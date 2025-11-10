window.onload = function () {
  const audio = document.getElementById("readingAudio");
  audio.volume = 0.1; // Set volume between 0.0 (mute) and 1.0 (full)
};
  

function showStoryExplorer() {
  const section = document.getElementById("storyExplorer");
  const isVisible = section.style.display === "block";


  section.style.display = isVisible ? "none" : "block";

  // If hiding, also close any open story windows and stop speech
  if (isVisible) {
    document.body.classList.remove("story-active");
    const openWindows = section.querySelectorAll(".story-window");
    openWindows.forEach(win => win.style.display = "none");
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
  }
}

    function openStory(storyId) {
      document.getElementById(storyId).style.display = "block";
    }
let currentUtterance = null;

function listenToStory(storyId) {
  const storyText = document.getElementById(storyId).querySelector("p").textContent;
  currentUtterance = new SpeechSynthesisUtterance(storyText);
  speechSynthesis.speak(currentUtterance);
}

function closeStory(storyId) {
  document.getElementById(storyId).style.display = "none";
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
    currentUtterance = null;
  }
}
function openStory(storyId) {
  document.body.classList.add("story-active");
  document.getElementById(storyId).style.display = "block";
}

function closeStory(storyId) {
  document.body.classList.remove("story-active");
  document.getElementById(storyId).style.display = "none";
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
  }
}
let readingQuizIndex = 0;
let selectedReadingQuestions = [];


const readingQuestionPool = [
  {
    question: "☁️ What did Coco the cloud ask everyone?",
    options: ["Where am I?", "What do you need from me?", "Can I rain now?", "Do you like clouds?"],
    answer: 1
  },
  {
    question: "☁️ What did the flowers need from Coco?",
    options: ["Sunlight", "Rain", "Shade", "Dreams"],
    answer: 1
  },
  {
    question: "🌙 Who did Luna help?",
    options: ["A squirrel", "A sleepy owl", "A lost cat", "A little star"],
    answer: 1
  },
  {
    question: "🌙 How did Luna help the owl?",
    options: ["She flew him home", "She gave him a map", "She lit the path", "She sang a song"],
    answer: 2
  },
  {
    question: "🌈 Where was Red hiding?",
    options: ["In a rose", "In a rainbow", "In a cloud", "In a lemon"],
    answer: 0
  },
  {
    question: "🌈 Who helped the rainbow get its colors back?",
    options: ["A unicorn", "A butterfly", "A bird", "A cloud"],
    answer: 1
  },
  {
    question: "🌱 What did the soil tell the seed?",
    options: ["Be brave", "Be patient", "Be thirsty", "Be tall"],
    answer: 1
  },
  {
    question: "🌱 What did the seed become?",
    options: ["A flower", "A bush", "A tall tree", "A rainbow"],
    answer: 2
  }
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startReadingQuiz() {
  document.getElementById("readingQuiz").style.display = "block";
  document.getElementById("storyExplorer").style.display = "none";
  readingQuizIndex = 0;
  selectedReadingQuestions = shuffleArray(readingQuestionPool).slice(0, 5);
  showReadingQuestion();
}

function showReadingQuestion() {
  const q = selectedReadingQuestions[readingQuizIndex];
  if (!q) return;

  document.getElementById("quizQuestion").textContent = `${readingQuizIndex + 1}. ${q.question}`;
  const optionsDiv = document.getElementById("quizOptions");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === q.answer) {
        btn.style.backgroundColor = "#66ff66";
        btn.textContent += " ✅";
      } else {
        btn.style.backgroundColor = "#ff6666";
        btn.textContent += " ❌";
      }
      document.getElementById("nextQuestionBtn").style.display = "inline-block";
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
    };
    optionsDiv.appendChild(btn);
  });

  document.getElementById("nextQuestionBtn").style.display = "none";
}

function nextReadingQuestion() {
  readingQuizIndex++;
  if (readingQuizIndex < selectedReadingQuestions.length) {
    showReadingQuestion();
  } else {
    document.getElementById("quizQuestion").textContent = "🎉 You've finished the quiz!";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("nextQuestionBtn").style.display = "none";
  }
}

function closeReadingQuiz() {
  document.getElementById("readingQuiz").style.display = "none";
  document.getElementById("quizQuestion").textContent = "";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("nextQuestionBtn").style.display = "none";}
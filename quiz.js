let quizIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedQuestions = [];

const quizQuestionPool = [
  // 🌈 Reading
  {
    question: "☁️ What did Coco the cloud ask everyone?",
    options: ["Where am I?", "What do you need from me?", "Can I rain now?", "Do you like clouds?"],
    answer: 1
  },
  {
    question: "🌙 Who did Luna help?",
    options: ["A squirrel", "A sleepy owl", "A lost cat", "A little star"],
    answer: 1
  },

  // 🧪 Science
  {
    question: "🌱 What helps plants grow?",
    options: ["Moonlight", "Rain", "Wind", "Snow"],
    answer: 1
  },
  {
    question: "☁️ What forms clouds?",
    options: ["Dust", "Water vapor", "Air", "Sunlight"],
    answer: 1
  },

  // ➕ Maths
  {
    question: "➕ What is 3 + 4?",
    options: ["5", "6", "7", "8"],
    answer: 2
  },
  {
    question: "🧮 What comes after 9?",
    options: ["10", "11", "8", "12"],
    answer: 0
  },

  // 🎨 Art
  {
    question: "🎨 What color do you get when you mix red and blue?",
    options: ["Green", "Purple", "Orange", "Yellow"],
    answer: 1
  },
  {
    question: "🖌️ What tool do you use to paint?",
    options: ["Hammer", "Brush", "Spoon", "Stick"],
    answer: 1
  }
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  quizIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedQuestions = shuffleArray(quizQuestionPool).slice(0, 5);
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = selectedQuestions[quizIndex];
  if (!q) return;

  document.getElementById("quizQuestion").textContent = `${quizIndex + 1}. ${q.question}`;
  const optionsDiv = document.getElementById("quizOptions");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (i === q.answer) {
        btn.style.backgroundColor = "#66ff66";
        btn.textContent += " ✅";
        correctCount++;
      } else {
        btn.style.backgroundColor = "#ff6666";
        btn.textContent += " ❌";
        wrongCount++;
      }
      document.getElementById("nextBtn").style.display = "inline-block";
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      updateScore();
    };
    optionsDiv.appendChild(btn);
  });

  document.getElementById("nextBtn").style.display = "none";
}

function nextQuizQuestion() {
  quizIndex++;
  if (quizIndex < selectedQuestions.length) {
    showQuizQuestion();
  } else {
    document.getElementById("quizQuestion").textContent = "🎉 Quiz Complete!";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
  }
}

function updateScore() {
  document.getElementById("scoreTracker").textContent = `✅ Correct: ${correctCount} | ❌ Wrong: ${wrongCount}`;
}

function restartQuiz() {
  document.getElementById("quizQuestion").textContent = "";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("scoreTracker").textContent = "✅ Correct: 0 | ❌ Wrong: 0";
  startQuiz();
}

// Start quiz on page load
window.onload = startQuiz;

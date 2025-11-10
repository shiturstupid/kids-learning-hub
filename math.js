let currentAnswer = 0;
let currentMode = "";

//Show Learn Addition Section
function showLearnAddition() {
  document.getElementById("learnAddition").style.display = "block";
  document.getElementById("gameArea").style.display = "none";
}

//Start Addition Game
function startAdditionGame() {
  currentMode = "addition";
  document.getElementById("learnAddition").style.display = "none";
  document.getElementById("gameTitle").textContent = "➕ Addition Game";
  document.getElementById("gameArea").style.display = "block";
  generateQuestion();
}

// Start Subtraction Game
function startSubtractionGame() {
  currentMode = "subtraction";
  document.getElementById("learnSubtraction").style.display = "none";
  document.getElementById("gameTitle").textContent = "➖ Subtraction Game";
  document.getElementById("gameArea").style.display = "block";
  generateQuestion();
}



function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;

  let questionText = "";

  if (currentMode === "addition") {
    currentAnswer = num1 + num2;
    questionText = `What is ${num1} + ${num2}?`;
  } else if (currentMode === "subtraction") {
    const max = Math.max(num1, num2);
    const min = Math.min(num1, num2);
    currentAnswer = max - min;
    questionText = `What is ${max} - ${min}?`;
  }

  document.getElementById("questionBox").textContent = questionText;
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").textContent = "";
}

//Check User Answer
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);
  const feedback = document.getElementById("feedback");

  if (userAnswer === currentAnswer) {
    feedback.textContent = "✅ Correct! Great job!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Try again!`;
    feedback.style.color = "red";
  }

  setTimeout(generateQuestion, 1500);
}
function showLearnSubtraction() {
  document.getElementById("learnSubtraction").style.display = "block";
  document.getElementById("learnAddition").style.display = "none";
  document.getElementById("gameArea").style.display = "none";
}
let quizQuestions = [];
let currentQuizIndex = 0;
let score = 0;

function startQuiz() {
  quizQuestions = generateQuizQuestions(5);
  currentQuizIndex = 0;
  score = 0;

  document.getElementById("learnAddition").style.display = "none";
  document.getElementById("learnSubtraction").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("gameTitle").textContent = "🧩 Math Quiz";

  //Hide hint and calculator ONLY for quiz
  document.getElementById("hintButton").style.display = "none";
  document.getElementById("calculator").style.display = "none";

  showQuizQuestion();
}

function generateQuizQuestions(count) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const isAddition = Math.random() > 0.5;

    let questionText, answer;
    if (isAddition) {
      questionText = `What is ${num1} + ${num2}?`;
      answer = num1 + num2;
    } else {
      const max = Math.max(num1, num2);
      const min = Math.min(num1, num2);
      questionText = `What is ${max} - ${min}?`;
      answer = max - min;
    }

    questions.push({ question: questionText, answer });
  }
  return questions;
}

function showQuizQuestion() {
  if (currentQuizIndex >= quizQuestions.length) {
    document.getElementById("questionBox").textContent = `🎉 Quiz Complete! You scored ${score}/${quizQuestions.length}`;
    document.getElementById("answerInput").style.display = "none";
    document.querySelector("button").style.display = "none";
    return;
  }

  const current = quizQuestions[currentQuizIndex];
  document.getElementById("questionBox").textContent = current.question;
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").style.display = "inline-block";
  document.querySelector("button").onclick = checkQuizAnswer;

  document.getElementById("feedback").textContent = "";
}
function checkQuizAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);
  const correctAnswer = quizQuestions[currentQuizIndex].answer;
  const feedback = document.getElementById("feedback");

  if (userAnswer === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Incorrect. The correct answer was ${correctAnswer}.`;
    feedback.style.color = "red";
  }

  currentQuizIndex++;
  setTimeout(showQuizQuestion, 1500);
}

let calcInput = "";

function press(value) {
  calcInput += value;
  document.getElementById("calcDisplay").value = calcInput;
}

function clearCalc() {
  calcInput = "";
  document.getElementById("calcDisplay").value = "";
}

function calculate() {
  try {
    // Only allow digits, + and - signs
    const sanitized = calcInput.replace(/[^0-9+\-]/g, "");

    // Split into tokens (numbers and operators)
    const tokens = sanitized.match(/(\d+|\+|\-)/g);
    if (!tokens) throw new Error("Invalid input");

    let result = parseInt(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNum = parseInt(tokens[i + 1]);

      if (operator === "+") result += nextNum;
      else if (operator === "-") result -= nextNum;
      else throw new Error("Unsupported operator");
    }

    document.getElementById("calcDisplay").value = result;
    calcInput = result.toString();
  } catch {
    document.getElementById("calcDisplay").value = "Error";
    calcInput = "";
  }
}


function revealCalculator() {
  document.getElementById("calculator").style.display = "block";
  document.getElementById("hintButton").style.display = "none";
}

let frogGameInterval = null;
let frogGameAnimation = null;
let frogGameRunning = false;

function startFrogGame() {
  if (frogGameRunning) return; // prevent multiple starts
  frogGameRunning = true;

  const wrapper = document.getElementById("frogGameWrapper");
  const canvas = document.getElementById("frogGameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreDisplay = document.getElementById("frogScore");
  const closeBtn = document.getElementById("closeFrogGame");

  wrapper.style.display = "block";
  scoreDisplay.textContent = "";
  let frogX = canvas.width / 2 - 25;
  let score = 0;
  let apples = [];

  const frogImg = new Image();
  frogImg.src = "frog.png";
  const appleImg = new Image();
  appleImg.src = "apple.png";

  function spawnApple() {
    apples.push({ x: Math.random() * (canvas.width - 30), y: 0 });
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }

  const numberWords = {
    1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
    6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
    11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen",
    15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen",
    19: "Nineteen", 20: "Twenty"
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frogImg, frogX, canvas.height - 50, 50, 50);

    apples.forEach((apple, index) => {
      apple.y += 2;
      ctx.drawImage(appleImg, apple.x, apple.y, 30, 30);

      if (
        apple.y > canvas.height - 60 &&
        apple.x > frogX - 20 &&
        apple.x < frogX + 50
      ) {
        apples.splice(index, 1);
        score++;
        scoreDisplay.textContent = `🍎 Apples Caught: ${score}`;
        speak(score === 20 ? "Well done!" : numberWords[score] || score.toString());
      }
    });

    frogGameAnimation = requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") frogX -= 20;
    if (e.key === "ArrowRight") frogX += 20;
  });

  frogGameInterval = setInterval(spawnApple, 1500);
  draw();
}

function closeFrogGame() {
  const wrapper = document.getElementById("frogGameWrapper");
  const scoreDisplay = document.getElementById("frogScore");

  wrapper.style.display = "none";
  scoreDisplay.textContent = "";
  speechSynthesis.cancel();

  if (frogGameInterval) clearInterval(frogGameInterval);
  if (frogGameAnimation) cancelAnimationFrame(frogGameAnimation);

  frogGameRunning = false;
}



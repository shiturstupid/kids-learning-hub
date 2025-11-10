function closePlantExplanation() {
  const explanation = document.getElementById("plantExplanation");
  if (explanation) {
    explanation.style.display = "none";
  }
}


let plantStage = 0;
const plantStages = ["branch.png", "someleaves.png", "fullleaves.png", "fullplant.png"];

function showPlants() {
  const plantsSection = document.getElementById("plantsSection");
  const explanation = document.getElementById("plantExplanation");
  const showBtn = document.getElementById("showPlantExplanation");

  // Show the whole section
  plantsSection.style.display = "block";

  // Reset explanation visibility
  if (explanation) explanation.style.display = "block";
  if (showBtn) showBtn.style.display = "none";

  // Hide other sections
  document.getElementById("spaceSection").style.display = "none";
  document.getElementById("scienceQuiz").style.display = "none";
}


function startPlantGame() {
  plantStage = 0;

  if (!document.getElementById("plantGameWindow")) {
    const container = document.createElement("div");
    container.id = "plantGameWindow";
    container.style.marginTop = "20px";

    const img = document.createElement("img");
    img.id = "plantImage";
    img.src = plantStages[plantStage];
    img.alt = "Plant Stage";
    img.width = 200;
    container.appendChild(img);

    const btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "10px";

    const waterBtn = document.createElement("button");
    waterBtn.textContent = "💧 Water";
    waterBtn.onclick = giveWater;
    btnContainer.appendChild(waterBtn);

    const sunBtn = document.createElement("button");
    sunBtn.textContent = "☀️ Sun";
    sunBtn.onclick = giveSun;
    btnContainer.appendChild(sunBtn);

    container.appendChild(btnContainer);

    const message = document.createElement("p");
    message.id = "plantMessage";
    message.style.fontWeight = "bold";
    message.style.color = "#007700";
    message.style.marginTop = "10px";
    container.appendChild(message);

    const closeBtn = document.createElement("button");
    closeBtn.id = "closePlantGame";
    closeBtn.textContent = "❌ Close";
    closeBtn.style.marginTop = "10px";
    closeBtn.onclick = closePlantGame;
    container.appendChild(closeBtn);

    document.getElementById("plantsSection").appendChild(container);
  } else {
    document.getElementById("plantImage").src = plantStages[plantStage];
    document.getElementById("plantMessage").textContent = "";
    document.getElementById("plantGameWindow").style.display = "block";
  }
}

function giveWater() {
  growPlant();
}

function giveSun() {
  growPlant();
}

function growPlant() {
  if (plantStage < plantStages.length - 1) {
    plantStage++;
    document.getElementById("plantImage").src = plantStages[plantStage];
    if (plantStage === plantStages.length - 1) {
      document.getElementById("plantMessage").textContent = "🌟 Well done! Your plant is fully grown!";
    }
  }
}

function closePlantGame() {
  const gameWindow = document.getElementById("plantGameWindow");
  if (gameWindow) {
    gameWindow.style.display = "none";
    plantStage = 0;
    document.getElementById("plantImage").src = plantStages[plantStage];
    document.getElementById("plantMessage").textContent = "";
  }
}


function showSpace() {
  document.getElementById("spaceSection").style.display = "block";
  document.getElementById("spaceExplanation").style.display = "block";
  document.getElementById("plantsSection").style.display = "none";
  document.getElementById("scienceQuiz").style.display = "none";
}
function closeSpaceSection() {
  document.getElementById("spaceExplanation").style.display = "none";
  document.getElementById("spaceGameWindow").style.display = "none";
  document.getElementById("rocketAnimation").innerHTML = "";
}


function closeSpaceExplanation() {
  document.getElementById("spaceExplanation").style.display = "none";
  document.getElementById("showSpaceExplanation").style.display = "inline-block";
}

function showSpaceExplanation() {
  document.getElementById("spaceExplanation").style.display = "block";
  document.getElementById("showSpaceExplanation").style.display = "none";
}

function startSpaceGame() {
  document.getElementById("spaceGameWindow").style.display = "block";
  document.getElementById("rocketAnimation").innerHTML = "";
}

function launchRocket() {
  const rocket = document.createElement("div");
  rocket.textContent = "🚀";
  rocket.style.fontSize = "3rem";
  rocket.style.position = "relative";
  rocket.style.animation = "flyUp 3s ease-out forwards";
  document.getElementById("rocketAnimation").appendChild(rocket);
}
let currentQuestionIndex = 0;
let quizQuestions = [];

function startScienceQuiz() {
  document.getElementById("scienceQuiz").style.display = "block";
  document.getElementById("plantsSection").style.display = "none";
  document.getElementById("spaceSection").style.display = "none";
  currentQuestionIndex = 0;}


let selectedQuestions = [];

const questionPool = [
  { question: "🌱 What do plants need to grow?", options: ["Sunlight, water, soil", "Moonlight, milk, sand", "Air, fire, metal", "Rainbows, sugar, wind"], answer: 0 },
  { question: "🌱 What part of the plant absorbs water?", options: ["Leaves", "Roots", "Stem", "Flowers"], answer: 1 },
  { question: "🌱 What helps plants catch sunlight?", options: ["Roots", "Leaves", "Seeds", "Branches"], answer: 1 },
  { question: "🌱 What do plants make using sunlight?", options: ["Food", "Water", "Air", "Soil"], answer: 0 },
  { question: "🌱 What is the green pigment in leaves called?", options: ["Chlorophyll", "Oxygen", "Nitrogen", "Carbon"], answer: 0 },

  { question: "🚀 Which planet is called the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
  { question: "🚀 What is the center of our solar system?", options: ["Moon", "Earth", "Sun", "Mars"], answer: 2 },
  { question: "🚀 Which planet has rings?", options: ["Mars", "Saturn", "Venus", "Mercury"], answer: 1 },
  { question: "🚀 What do astronauts wear in space?", options: ["Raincoats", "Space suits", "Lab coats", "Swimsuits"], answer: 1 },
  { question: "🚀 What is the name of our galaxy?", options: ["Andromeda", "Milky Way", "Solar System", "Universe"], answer: 1 },

  { question: "💧 What is water made of?", options: ["Oxygen and nitrogen", "Hydrogen and oxygen", "Carbon and helium", "Salt and sugar"], answer: 1 },
  { question: "💧 What is the process of water turning into vapor?", options: ["Condensation", "Evaporation", "Freezing", "Melting"], answer: 1 },
  { question: "💧 What do we call frozen water?", options: ["Steam", "Rain", "Ice", "Fog"], answer: 2 },
  { question: "💧 What is the water cycle?", options: ["A type of bike", "How water moves through Earth", "A rainstorm", "A swimming pool"], answer: 1 },
  { question: "💧 What collects rainwater in nature?", options: ["Mountains", "Rivers", "Clouds", "Lakes"], answer: 3 },

  { question: "🌞 What gives us light and heat?", options: ["Moon", "Stars", "Sun", "Fire"], answer: 2 },
  { question: "🌞 What causes day and night?", options: ["Sun moving", "Earth rotating", "Moonlight", "Clouds"], answer: 1 },
  { question: "🌞 What do solar panels collect?", options: ["Wind", "Water", "Sunlight", "Air"], answer: 2 },
  { question: "🌞 What is a star?", options: ["A planet", "A ball of gas", "A moon", "A comet"], answer: 1 },
  { question: "🌞 What is gravity?", options: ["A type of gas", "A force that pulls things down", "A kind of light", "A space suit"], answer: 1 }
];

function startScienceQuiz() {
  document.getElementById("scienceQuiz").style.display = "block";
  document.getElementById("plantsSection").style.display = "none";
  document.getElementById("spaceSection").style.display = "none";

  currentQuestionIndex = 0;
  selectedQuestions = shuffleArray(questionPool).slice(0, 5);
  showQuestion();
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function showQuestion() {
  const q = selectedQuestions[currentQuestionIndex];
  document.getElementById("quizQuestion").textContent = `${currentQuestionIndex + 1}. ${q.question}`;
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

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("quizQuestion").textContent = "🎉 You've finished the quiz!";
    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("nextQuestionBtn").style.display = "none";
  }
}

function closeScienceQuiz() {
  document.getElementById("scienceQuiz").style.display = "none";
  document.getElementById("quizQuestion").textContent = "";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("nextQuestionBtn").style.display = "none";
}

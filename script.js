// Define the quiz questions
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correct: 3
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Computing Style Sheets"
      ],
      correct: 1
    },
    {
      question: "Who is known as the father of computers?",
      options: ["Charles Babbage", "Alan Turing", "John von Neumann", "Bill Gates"],
      correct: 0
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 2
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
      correct: 0
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correct: 2
    }
  ];
  
  // Get DOM elements
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const scoreEl = document.getElementById("score");
  const currentQuestionEl = document.getElementById("current-question");
  const totalQuestionsEl = document.getElementById("total-questions");
  const summaryEl = document.getElementById("summary");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  
  document.getElementById("start-btn").addEventListener("click", startQuiz);
  
  function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    totalQuestionsEl.textContent = questions.length;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
  }
  
  function showQuestion() {
    resetOptions();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(index, button));
      optionsEl.appendChild(button);
    });
    currentQuestionEl.textContent = currentQuestionIndex + 1;
  }
  
  function resetOptions() {
    optionsEl.innerHTML = "";
    nextBtn.classList.add("hidden");
  }
  
  function selectAnswer(selectedIndex, button) {
    // If the user clicks on an option, prevent re-selection
    if (button.classList.contains("selected")) return;
  
    // Change the button color to show it is selected
    button.classList.add("selected");
  
    // Store the user's answer
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = optionsEl.querySelectorAll("button");
  
    // Disable all options after selection and color the correct one
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) {
        btn.classList.add("correct");
      } else if (index === selectedIndex) {
        btn.classList.add("wrong");
      }
    });
  
    // Save user answer
    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      selected: selectedIndex,
      correct: correctIndex
    });
  
    // Update score if correct
    if (selectedIndex === correctIndex) {
      score++;
    }
  
    // Show the next button
    nextBtn.classList.remove("hidden");
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
  
  function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
  
    userAnswers.forEach(answer => {
      const result = document.createElement("div");
      result.classList.add("question-summary");
      result.textContent = `${answer.question} - You selected: ${questions[answer.correct].options[answer.selected]}`;
      summaryEl.appendChild(result);
    });
  }
  
  restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });
  
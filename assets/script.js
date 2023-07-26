const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
var starter = document.getElementById("starter");
var startQuizBtn = document.getElementById("startQuizBtn");
var queContainer = document.getElementById("queContainer");

startQuizBtn.addEventListener("click", () => {
  starter.style.display = "none";
  queContainer.style.display = "block";
  startCountdown(); // Start the countdown when the quiz begins
});

let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 50; // Time limit for each question (in seconds)
let timer; // Variable to store the timer

const quizContainer = document.getElementById("quiz");
const quizCompletedContainer = document.getElementById("quizCompleted");

function showQuizQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
      <div class="quiz-question">${question.questionText}</div>
      <div class="quiz-options">
        ${question.options.map((option) => `<div class="quiz-option">${option}</div>`).join("")}
      </div>
    `;
    const options = document.querySelectorAll(".quiz-option");
    options.forEach((option, index) => {
      option.addEventListener("click", () => checkAnswer(index, options));
    });
  } else {
    showQuizCompleted();
  }
}

function startCountdown() {
  let timeLeft = timeLimit;
  timer = setInterval(() => {
    const timerElement = document.querySelector(".timer");
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000); // 1000 ms = 1 second
}

function resetCountdown() {
  clearInterval(timer);
  startCountdown();
}

function handleTimeout() {
  const question = questions[currentQuestionIndex];
  const answerMessage = document.createElement("div");
  answerMessage.classList.add("answer-message");
  answerMessage.textContent = "Time's up!";
  quizContainer.appendChild(answerMessage);
  options.forEach((option) => option.removeEventListener("click", checkAnswer));
  setTimeout(() => {
    currentQuestionIndex++;
    showQuizQuestion();
    resetCountdown(); // Start the countdown for the next question
  }, 1500);
}

function checkAnswer(selectedOptionIndex, options) {
  const question = questions[currentQuestionIndex];
  const selectedOption = options[selectedOptionIndex];
  const answerMessage = document.createElement("div");
  answerMessage.classList.add("answer-message");
  if (question.answer === selectedOption.textContent) {
    answerMessage.textContent = "Correct!";
    score++;
  } else {
    answerMessage.textContent = "Incorrect!";
    score--; // Decrement the score for incorrect answers
    timeLimit -= 10; // Deduct 10 seconds from the remaining time for incorrect answers
  }
  quizContainer.appendChild(answerMessage);
  options.forEach((option) => option.removeEventListener("click", checkAnswer));
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      // Last question completed, show the quiz completed message
      clearInterval(timer); // Stop the timer when the last question is completed
      showQuizCompleted();
    } else {
      showQuizQuestion();
      resetCountdown(); // Start the countdown for the next question
    }
  }, 1500);
}

function showQuizCompleted() {
  quizContainer.style.display = "none";
  quizCompletedContainer.style.display = "block";
  quizCompletedContainer.textContent = `Quiz Completed! Your Score: ${score} out of ${questions.length}`;
}

showQuizQuestion();


// var starter = document.getElementById("starter");
// var startQuizBtn = document.getElementById("startQuizBtn");
// var queContainer = document.getElementById("queContainer");

// startQuizBtn.addEventListener("click", ()=>{
//   starter.style.display="none";
//   queContainer.style.display="block";
// });

// let currentQuestionIndex = 0;
// let score = 0;

// const quizContainer = document.getElementById("quiz");
// const quizCompletedContainer = document.getElementById("quizCompleted");

// function showQuizQuestion() {
//   if (currentQuestionIndex < questions.length) {
//     const question = questions[currentQuestionIndex];
//     quizContainer.innerHTML = `
//       <div class="quiz-question">${question.questionText}</div>
//       <div class="quiz-options">
//         ${question.options.map((option) => `<div class="quiz-option">${option}</div>`).join("")}
//       </div>
//     `;
//     const options = document.querySelectorAll(".quiz-option");
//     options.forEach((option, index) => {
//       option.addEventListener("click", () => checkAnswer(index, options));
//     });
//   } else {
//     showQuizCompleted();
//   }
// }

// function checkAnswer(selectedOptionIndex, options) {
//   const question = questions[currentQuestionIndex];
//   const selectedOption = options[selectedOptionIndex];
//   const answerMessage = document.createElement("div");
//   answerMessage.classList.add("answer-message");
//   if (question.answer === selectedOption.textContent) {
//     answerMessage.textContent = "Correct!";
//     score++;
//   } else {
//     answerMessage.textContent = "Incorrect!";
//   }
//   quizContainer.appendChild(answerMessage);
//   options.forEach((option) => option.removeEventListener("click", checkAnswer));
//   setTimeout(() => {
//     currentQuestionIndex++;
//     showQuizQuestion();
//   }, 1500);
// }

// function showQuizCompleted() {
//   quizContainer.style.display = "none";
//   quizCompletedContainer.style.display = "block";
//   quizCompletedContainer.textContent = `Quiz Completed! Your Score: ${score} out of ${questions.length}`;
// }

// showQuizQuestion();










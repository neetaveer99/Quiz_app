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
const quizContainer = document.getElementById("quiz");
const quizCompletedContainer = document.getElementById("quizCompleted");

startQuizBtn.addEventListener("click", () => {
  starter.style.display = "none";
  queContainer.style.display = "block";
  startCountdown(); // Start the countdown when the quiz begins
   showQuizQuestion();                            
});

let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 50; // Time limit for each question (in seconds)
let timer; // Variable to store the timer
let optionsEventListeners = []; // Array to store the current event listeners




function showQuizQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
      <h2 class="quiz-question">${question.questionText}</h2>
      <div class="quiz-options">
        ${question.options
          .map(
            (option) => `<button class="quiz-option">${option}</button>`
          )
          .join("")}
      </div>
      <hr>
    `;
    const options = document.querySelectorAll(".quiz-option");

    // Remove previous event listeners
    optionsEventListeners.forEach((listener) => {
      options.forEach((option, index) => {
        option.removeEventListener("click", listener);
      });
    });

    optionsEventListeners = []; // Clear the array
  // Add new event listeners
    options.forEach((option, index) => {
      const listener = () => checkAnswer(index, options);
      optionsEventListeners.push(listener);
      option.addEventListener("click", listener);
    });
  } else {
    showQuizCompleted();
  }
}




let timeLeft = timeLimit;
function startCountdown() {
  
  timer = setInterval(() => {
    const timerElement = document.querySelector(".timer");
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft > 0) {
      timeLeft--;
    }
    else if(timeLeft == 0){
      showQuizCompleted();
    }
    else {
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
  options.forEach((option) =>
    option.removeEventListener("click", checkAnswer)
  );
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
    timeLeft -= 10; // Deduct 10 seconds from the remaining time for incorrect answers
    if (timeLeft < 0) {
      timeLeft = 0; // Ensure timeLeft doesn't go negative
    }
  }
  quizContainer.appendChild(answerMessage);
  options.forEach((option) =>
    option.removeEventListener("click", checkAnswer)
  );
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
  }, 600);
}

function showQuizCompleted() {
  quizContainer.style.display = "none";
  quizCompletedContainer.style.display = "block";

  // Calculate total time taken
  const totalTimeTaken = timeLimit * questions.length - timer;

   quizCompletedContainer.innerHTML = `
    <h2>All Done!</h2>
    <p>Your Score: ${score} out of ${questions.length}</p>
    <div class="score-border-text">
        Enter initials: <input type='text' id="initials" size=5 />
        <button type='button' class="score-border-button" onclick="submitScore()">Submit</button>
    </div>
  `;
}



function submitScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    saveScoreToLocalStorage(initials);
    showHighscores();
  }
}

function saveScoreToLocalStorage(initials) {
  const scoreData = {
    initials: initials,
    score: score,
    timeTaken: timeLimit * questions.length - timer
  };

  // Fetch existing scores from local storage (if any)
  const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];

  // Add the new score data to the existing scores array
  existingScores.push(scoreData);

  // Save the updated scores back to local storage
  localStorage.setItem("quizScores", JSON.stringify(existingScores));
}

function showHighscores() {
  // Fetch scores from local storage (if any)
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // Display the leaderboard
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = "";
  scores.forEach((scoreData, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = ` ${scoreData.initials} - Score: ${scoreData.score} `;
    leaderboardList.appendChild(listItem);
  });

  // Show the leaderboard and hide other sections
  leaderboardContainer.style.display = "block";
  starter.style.display = "none";
  queContainer.style.display = "none";
  quizCompletedContainer.style.display = "none";
}

leaderboardLink.addEventListener("click", () => {
  showHighscores();
});

const goBackBtn = document.getElementById("goBackBtn");
goBackBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  timeLimit = 50;
  timeLeft = timeLimit; 
  clearInterval(timer);
  leaderboardContainer.style.display = "none";
  starter.style.display = "block";
  quizCompletedContainer.style.display = "none";
  
  showQuizQuestion(); // Add this line to show the quiz questions again
  quizContainer.style.display = "block";
});




const clearHighscoresBtn = document.getElementById("clearHighscoresBtn");
clearHighscoresBtn.addEventListener("click", () => {
  localStorage.removeItem("quizScores");
location.reload();
});

showQuizQuestion();



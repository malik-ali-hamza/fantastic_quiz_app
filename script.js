const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Control Power Unit", "Compute Performance Utility", "Central Performance Unit"],
        answer: 0
    },
    {
        question: "True or False: RAM is permanent memory.",
        options: ["True", "False"],
        answer: 1
    },
    {
        question: "Which one is a programming language?",
        options: ["HTML", "CSS", "Python", "WiFi"],
        answer: 2
    },
    {
        question: "IoT stands for?",
        options: ["Internet of Tools", "Internet of Things", "Input Output Transfer", "Item of Technology"],
        answer: 1
    },
    {
        question: "True or False: SSD is faster than HDD.",
        options: ["True", "False"],
        answer: 0
    }
];

let index = 0;
let score = 0;
let autoNextTimeout;

// Start quiz
function startQuiz() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "flex";
    loadQuestion();
}

// Load question dynamically
function loadQuestion() {
    const q = questions[index];
    document.getElementById("questionText").innerText = q.question;

    let optionsHTML = "";
    q.options.forEach((opt, i) => {
        optionsHTML += `<button class='option-btn' onclick='checkAnswer(${i})'>${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
    document.getElementById("feedback").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
}

// Check answer and give feedback
function checkAnswer(selected) {
    const correct = questions[index].answer;

    if (selected === correct) {
        document.getElementById("feedback").innerText = "Correct!";
        document.getElementById("feedback").style.color = "lightgreen";
        score++;
    } else {
        document.getElementById("feedback").innerText = "Wrong!";
        document.getElementById("feedback").style.color = "red";
    }

    document.getElementById("nextBtn").style.display = "block";

    // Auto next after 1.5 seconds
    autoNextTimeout = setTimeout(() => nextQuestion(), 1500);
}

// Move to next question
function nextQuestion() {
    clearTimeout(autoNextTimeout);
    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results screen
function showResults() {
    const msg = score >= 4 ? "Great job!" : "Try again!";

    document.getElementById("quizScreen").style.display = "none";

    document.getElementById("resultScreen").style.display = "flex";
    document.getElementById("resultScreen").innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <h3>${msg}</h3>
        <button class="start-btn" onclick="location.reload()">Restart Quiz</button>
    `;
}

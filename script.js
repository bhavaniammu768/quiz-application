const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C"],
        answer: "JavaScript"
    },
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "CSS is used for?",
        options: ["Logic", "Database", "Styling", "Server"],
        answer: "Styling"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const scoreBox = document.getElementById("scoreBox");

function loadQuestion() {
    let q = questions[currentQuestion];
    questionEl.textContent = (currentQuestion + 1) + ". " + q.question;

    optionBtns.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.disabled = false;
    });
}

function checkAnswer(button) {
    if (button.textContent === questions[currentQuestion].answer) {
        score++;
    }

    optionBtns.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionEl.textContent = "";
    document.querySelector(".options").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    scoreBox.textContent = "Your Score: " + score + " / " + questions.length;
}

loadQuestion();


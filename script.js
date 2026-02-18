const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi"
    },
    {
        question: "Which language runs in a web browser?",
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
        question: "CSS is mainly used for?",
        options: ["Logic", "Database", "Styling", "Server"],
        answer: "Styling"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "<!-- -->", "#", "**"],
        answer: "//"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        answer: "Netscape"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const scoreBox = document.getElementById("scoreBox");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    let q = questions[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;

    optionBtns.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.classList.remove("correct", "wrong");
        btn.disabled = false;
    });
}

function checkAnswer(button) {
    clearInterval(timer);

    if (button.textContent === questions[currentQuestion].answer) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");

        optionBtns.forEach(btn => {
            if (btn.textContent === questions[currentQuestion].answer) {
                btn.classList.add("correct");
            }
        });
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
    clearInterval(timer);
    questionEl.textContent = "Quiz Completed 🎉";
    document.querySelector(".options").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    timerEl.style.display = "none";
    scoreBox.textContent = `Your Score: ${score} / ${questions.length}`;
    restartBtn.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector(".options").style.display = "block";
    document.getElementById("nextBtn").style.display = "inline-block";
    timerEl.style.display = "block";
    restartBtn.style.display = "none";
    scoreBox.textContent = "";
    loadQuestion();
}

loadQuestion();


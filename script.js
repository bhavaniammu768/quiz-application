const users = { admin: "1234", student: "python" };

let questions = [
 {q:"Python is a ___ language.", o:["Compiled","Interpreted","Binary","Machine"], a:1},
 {q:"Which symbol is used for comments?", o:["//","#","<!--","**"], a:1},
 {q:"Which keyword defines a function?", o:["func","def","function","define"], a:1},
 {q:"Which data type is immutable?", o:["List","Set","Dictionary","Tuple"], a:3},
 {q:"Output of print(2**3)?", o:["6","8","9","5"], a:1},
 {q:"Which loop is used in Python?", o:["for","foreach","do-while","repeat"], a:0},
 {q:"Which file extension for Python?", o:[".pt",".py",".p",".python"], a:1},
 {q:"Which keyword is used to handle errors?", o:["try","catch","error","handle"], a:0},
 {q:"Which is a Python IDE?", o:["VS Code","Notepad","Paint","Word"], a:0},
 {q:"Which operator is used for floor division?", o:["/","//","%","**"], a:1},
 {q:"Which keyword creates class?", o:["function","object","class","def"], a:2},
 {q:"Which is mutable?", o:["Tuple","String","List","Int"], a:2},
 {q:"print(type(10)) gives?", o:["int","str","float","bool"], a:0},
 {q:"Which keyword exits loop?", o:["break","stop","exit","end"], a:0},
 {q:"Which function gets input?", o:["input()","get()","scan()","read()"], a:0},
 {q:"Which symbol is used for list?", o:["{}","()","[]","<>"], a:2},
 {q:"Which module handles math?", o:["math","calc","number","digit"], a:0},
 {q:"Which keyword imports module?", o:["include","import","using","require"], a:1},
 {q:"Which is correct variable?", o:["1var","var_1","var-1","var 1"], a:1},
 {q:"Which converts to integer?", o:["int()","str()","float()","bool()"], a:0},
 {q:"Which loop runs fixed times?", o:["while","for","do","repeat"], a:1},
 {q:"Which is not keyword?", o:["pass","eval","break","continue"], a:1},
 {q:"Which stores key-value?", o:["List","Tuple","Dict","Set"], a:2},
 {q:"Which operator checks equality?", o:["=","==","!=","<>"], a:1},
 {q:"Which is correct print?", o:["print 'Hi'","print(HI)","print(\"Hi\")","echo Hi"], a:2},
 {q:"Which handles files?", o:["open()","file()","read()","write()"], a:0},
 {q:"Which is Boolean?", o:["0","1","True","None"], a:2},
 {q:"Which deletes variable?", o:["remove","delete","del","clear"], a:2},
 {q:"Which symbol is modulo?", o:["/","%","//","**"], a:1},
 {q:"Which is not data type?", o:["int","float","char","list"], a:2}
];

let index = 0, score = 0, timer, timeLeft = 15;

function login() {
    let u = username.value, p = password.value;
    if (users[u] === p) {
        loginBox.style.display = "none";
        quizBox.style.display = "block";
        shuffleQuestions();
        loadQuestion();
    } else {
        loginError.innerText = "Invalid login!";
    }
}

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    resetTimer();
    let q = questions[index];
    question.innerText = q.q;
    options.innerHTML = "";
    q.o.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option";
        btn.onclick = () => checkAnswer(btn, i);
        options.appendChild(btn);
    });
}

function checkAnswer(btn, i) {
    clearInterval(timer);
    let correct = questions[index].a;
    document.querySelectorAll(".option").forEach((b, idx) => {
        b.disabled = true;
        if (idx === correct) b.classList.add("correct");
        if (idx === i && i !== correct) b.classList.add("wrong");
    });
    if (i === correct) score++;
}

function nextQuestion() {
    index++;
    if (index < questions.length) loadQuestion();
    else {
        question.innerText = "Quiz Finished!";
        options.innerHTML = "";
        scoreBox.innerText = `Score: ${score} / ${questions.length}`;
        restartBtn.style.display = "block";
    }
}

function restartQuiz() {
    index = score = 0;
    shuffleQuestions();
    restartBtn.style.display = "none";
    scoreBox.innerText = "";
    loadQuestion();
}

function resetTimer() {
    timeLeft = 15;
    timer = setInterval(() => {
        timerDiv.innerText = `Time: ${timeLeft--}`;
        if (timeLeft < 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

const timerDiv = document.getElementById("timer");


let questions = [
 {q:"Python is a ___ language.", o:["Compiled","Interpreted","Machine","Low-level"], a:1},
 {q:"Which symbol is used for comments?", o:["//","#","<!--","**"], a:1},
 {q:"Which keyword defines a function?", o:["function","def","fun","define"], a:1},
 {q:"Which data type is immutable?", o:["List","Set","Tuple","Dictionary"], a:2},
 {q:"Output of print(2 ** 3)?", o:["6","8","9","5"], a:1},
 {q:"Which loop is used in Python?", o:["for","foreach","repeat","do-while"], a:0},
 {q:"Which file extension is used?", o:[".pt",".py",".p",".python"], a:1},
 {q:"Which keyword handles exceptions?", o:["try","catch","error","handle"], a:0},
 {q:"Which is a Python IDE?", o:["VS Code","MS Word","Paint","Excel"], a:0},
 {q:"Which operator is floor division?", o:["/","//","%","**"], a:1},
 {q:"Which keyword creates a class?", o:["class","def","object","new"], a:0},
 {q:"Which is mutable?", o:["Tuple","String","List","Int"], a:2},
 {q:"print(type(5)) gives?", o:["int","str","float","bool"], a:0},
 {q:"Which keyword exits loop?", o:["stop","break","exit","end"], a:1},
 {q:"Which function takes user input?", o:["input()","scan()","get()","read()"], a:0},
 {q:"Which symbol is used for list?", o:["{}","()","[]","<>"], a:2},
 {q:"Which module is used for math?", o:["math","calc","num","digit"], a:0},
 {q:"Which keyword imports module?", o:["import","include","using","require"], a:0},
 {q:"Which variable name is valid?", o:["1var","var-1","var_1","var 1"], a:2},
 {q:"Which converts string to integer?", o:["int()","str()","float()","bool()"], a:0},
 {q:"Which loop runs fixed times?", o:["while","for","do","repeat"], a:1},
 {q:"Which is not a keyword?", o:["pass","eval","break","continue"], a:1},
 {q:"Which stores key-value pairs?", o:["List","Tuple","Dictionary","Set"], a:2},
 {q:"Which checks equality?", o:["=","==","!=","<>"], a:1},
 {q:"Correct print syntax?", o:["print 'Hi'","print(Hi)","print(\"Hi\")","echo Hi"], a:2},
 {q:"Which function opens file?", o:["open()","file()","read()","write()"], a:0},
 {q:"Which is Boolean value?", o:["0","1","True","None"], a:2},
 {q:"Which deletes variable?", o:["remove","delete","del","clear"], a:2},
 {q:"Which operator is modulus?", o:["/","%","//","**"], a:1},
 {q:"Which is not a data type?", o:["int","float","char","list"], a:2}
];

let index = 0, score = 0;
let timeLeft = 15, timer;

shuffleQuestions();
loadQuestion();

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    resetTimer();
    let q = questions[index];
    document.getElementById("question").innerText = q.q;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.o.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option";
        btn.onclick = () => checkAnswer(btn, i);
        optionsDiv.appendChild(btn);
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
    if (index < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("scoreBox").innerText =
            `Score: ${score} / ${questions.length}`;
        document.getElementById("restartBtn").style.display = "block";
    }
}

function restartQuiz() {
    index = 0;
    score = 0;
    shuffleQuestions();
    document.getElementById("scoreBox").innerText = "";
    document.getElementById("restartBtn").style.display = "none";
    loadQuestion();
}

function resetTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time: ${timeLeft}`;
        if (timeLeft < 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

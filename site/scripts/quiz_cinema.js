// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [{
    question: "What is the first rule of Fight Club?",
    choiceA: "No shirts, no shoes",
    choiceB: "Recommend it to a friend",
    choiceC: "Do not talk about Fight Club",
    choiceD: "If it's your first night, you have to fight",
    correct: "C",
    progress: "1"
}, {
    question: "Who played the Joker in The Dark Knight?",
    choiceA: "Matt Damon",
    choiceB: "Heath Ledger",
    choiceC: "Ansel Elgort",
    choiceD: "Joey Lawrence",
    correct: "B",
    progress: "2"
}, {
    question: "What kind of doctor is Dr. Schultz in Django Unchained?",
    choiceA: " Proctologist",
    choiceB: " Dentist",
    choiceC: " Surgeon",
    choiceD: "Cardiologist",
    correct: "B",
    progress: "3"
}, {
    question: "What fictional African nation is the setting for most of Black Panther?",
    choiceA: "Guadec",
    choiceB: "Zamunda",
    choiceC: "Kalubya",
    choiceD: "Wakanda",
    correct: "D",
    progress: "4"
}, {
    question: "Complete the Jaws quote: “You’re gonna need a bigger...”",
    choiceA: " “...boat.” ",
    choiceB: " “...deck.” ",
    choiceC: " “...line.” ",
    choiceD: " “...harpoon.” ",
    correct: "A",
    progress: "5"
    }, {
    question: "Who directed The Departed?",
    choiceA: "Christopher Nolan",
    choiceB: "Steven Spielberg",
    choiceC: "Martin Scorsese",
    choiceD: "Clint Eastwood",
    correct: "C",
    progress: "6"
}, {
    question: "Who wants “the precious” in The Lord of the Rings trilogy?",
    choiceA: " Gimli",
    choiceB: " Boromir",
    choiceC: " Gollum ",
    choiceD: " Aragorn",
    correct: "C",
    progress: "7"
}, {
    question: "Which of these is NOT a member of the Guardians of the Galaxy?",
    choiceA: " Star-Lord",
    choiceB: " Groot",
    choiceC: " Gamora",
    choiceD: " Uhura",
    correct: "D",
    progress: "8"
}, {
    question: "Complete this There Will Be Blood quote: “I drink your...”",
    choiceA: "“...coffee.”",
    choiceB: "“...milkshake.”",
    choiceC: " “...cocoa.”",
    choiceD: "“...milk.”",
    correct: "B",
    progress: "9"
}, {
    question: "Who played Michael Corleone in The Godfather trilogy?",
    choiceA: "Al Pacino",
    choiceB: "Robert De Niro ",
    choiceC: "James Woods",
    choiceD: "Joe Pesci",
    correct: "A",
    progress: "10"
}
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
const numberOfQuestions = questions.length;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    progress.innerHTML = "<p>Question " + q.progress + "/" + numberOfQuestions + "</p>";
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}


// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


// checkAnswer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
    } else {
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}


// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);
    const scoreFinal = score;

    // choose the image based on the scorePerCent
    let grade = (scorePerCent >= 80) ? "Excellent!" :
        (scorePerCent >= 60) ? "Very Good!" :
        (scorePerCent >= 40) ? "Good :-)" :
        (scorePerCent >= 20) ? "You can do better!" :
        "You might need some training...";

    scoreDiv.innerHTML = "<p>You've got " + scoreFinal + " correct answer(s)</p>";
    scoreDiv.innerHTML += "<P>" + grade + "</p>";
}

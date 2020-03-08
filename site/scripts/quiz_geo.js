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
    question: "What is the body of water that borders Greece, Turkey and Southern Italy?",
    choiceA: "Red Sea",
    choiceB: "Mediterranean Sea",
    choiceC: "Aegean Sea",
    choiceD: "Black Sea",
    correct: "C",
    progress: "1"
}, {
    question: "Which European country was reunified in 1990?",
    choiceA: "Austria",
    choiceB: "Russia",
    choiceC: "Switzerland",
    choiceD: "Germany",
    correct: "D",
    progress: "2"
}, {
    question: "Which Desert dominates a large area of Northern Africa?",
    choiceA: "Kalahari",
    choiceB: "Sahara",
    choiceC: "Gobi",
    choiceD: "Atacama",
    correct: "B",
    progress: "3"
}, {
    question: "What is the formal language of Libya?",
    choiceA: "English",
    choiceB: "Spanish",
    choiceC: "Arabic",
    choiceD: "Dutch",
    correct: "C",
    progress: "4"
}, {
    question: "The currents of which Ocean create the El Nino effect?",
    choiceA: "Pacific",
    choiceB: "Indian",
    choiceC: "Atlantic",
    choiceD: "Arctic",
    correct: "A",
    progress: "5"
    }, {
    question: "In which Canadian province is Montreal located?",
    choiceA: "Vancouver",
    choiceB: "Ontario",
    choiceC: "Quebec",
    choiceD: "Nova Scotia",
    correct: "C",
    progress: "6"
}, {
    question: "What is the capital of South Korea?",
    choiceA: "Tokyo",
    choiceB: "Beijing",
    choiceC: "Seoul",
    choiceD: "Phnom Penh",
    correct: "C",
    progress: "7"
}, {
    question: "How many countries in South America",
    choiceA: "20",
    choiceB: "15",
    choiceC: "14",
    choiceD: "12",
    correct: "B",
    progress: "8"
}, {
    question: "How many states starting with the letter A in the USA?",
    choiceA: "3",
    choiceB: "4",
    choiceC: "5",
    choiceD: "7",
    correct: "D",
    progress: "9"
}, {
    question: "What is the currency of Sweden?",
    choiceA: "Euro",
    choiceB: "Krona",
    choiceC: "Franc",
    choiceD: "Pound",
    correct: "B",
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

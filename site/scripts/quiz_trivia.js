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
    question: "The Plaka is the oldest quarter of which city?",
    choiceA: "Athens",
    choiceB: "Prague",
    choiceC: "Rome",
    choiceD: "Vienna",
    correct: "A",
    progress: "1"
}, {
    question: "What is an axolotl?",
    choiceA: "A nerve in the brain",
    choiceB: "A multi-axled vehicle",
    choiceC: "A type of mortice lock",
    choiceD: "A species of salamander",
    correct: "D",
    progress: "2"
}, {
    question: "The Panama Canal was officially opened by which US president?",
    choiceA: "Calvin Coolidge",
    choiceB: "Herbert Hoover",
    choiceC: "Theodore Roosevelt",
    choiceD: "Woodrow Wilson",
    correct: "D",
    progress: "3"
}, {
    question: "In which opera did Maria Callas make her last appearance at Covent Garden?",
    choiceA: "Carmen",
    choiceB: "Tosca",
    choiceC: "Madame Butterfly",
    choiceD: "La Boheme",
    correct: "B",
    progress: "4"
}, {
    question: "After Adam, Eve, Cain and Abel who is the next person mentioned in the Bible?",
    choiceA: "Enoch",
    choiceB: "Jubal",
    choiceC: "Lamech",
    choiceD: "Zillah",
    correct: "A",
    progress: "5"
    }, {
    question: "What is a kudzu?",
    choiceA: "Antelope",
    choiceB: "Bird",
    choiceC: "Jewish settlement",
    choiceD: "Climbing plant",
    correct: "A",
    progress: "6"
}, {
    question: "Outlawed from 1603 to 1774, which Scottish clan was known as the ‘Faceless Clan’?",
    choiceA: "Campbell",
    choiceB: "MacGregor",
    choiceC: "MacLeod",
    choiceD: "MacDonald",
    correct: "B",
    progress: "7"
}, {
    question: "From which country does tennis player Andres Gomez, winner of the 1990 French Championships, come?",
    choiceA: "Ecuador",
    choiceB: "Peru",
    choiceC: "Portugal",
    choiceD: "Spain",
    correct: "A",
    progress: "8"
}, {
    question: "Which US city is located on the Maumee River at Lake Erie?",
    choiceA: "Detroit",
    choiceB: "Toledo",
    choiceC: "Cleveland",
    choiceD: "Buffalo",
    correct: "B",
    progress: "9"
}, {
    question: "Lisbon stands at the mouth of which river?",
    choiceA: "Seine",
    choiceB: "Duoro",
    choiceC: "Rio Grande",
    choiceD: "Tagus",
    correct: "D",
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

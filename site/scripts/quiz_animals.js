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
    question: "What animal has the longest lifespan?",
    choiceA: "Elephant",
    choiceB: "Blue Whale",
    choiceC: "Giant Tortoise",
    choiceD: "Locust",
    correct: "C",
    progress: "1"
}, {
    question: "What is the only mammal capable of true flight?",
    choiceA: "Bat",
    choiceB: "Flying Squirrel",
    choiceC: "Ocelot",
    choiceD: "Hummingbird",
    correct: "A",
    progress: "2"
}, {
    question: "What is the fastest flying bird in the world?",
    choiceA: "Harpy Eagle",
    choiceB: "Peregrine Falcon",
    choiceC: "Hoorned Sungem Roosevelt",
    choiceD: "Spine-Tailed Swift",
    correct: "B",
    progress: "3"
}, {
    question: "A newborn kangaroo is about the size of a ...?",
    choiceA: "Lima Bean",
    choiceB: "Plum",
    choiceC: "Grapefruit",
    choiceD: "Watermelon",
    correct: "A",
    progress: "4"
}, {
    question: "What is the gestation period of a blue whale?",
    choiceA: "4-6 months",
    choiceB: "10-12 months",
    choiceC: "16-18 months",
    choiceD: "2 years",
    correct: "B",
    progress: "5"
    }, {
    question: "What is the smallest mammal in the world?",
    choiceA: "Western Harvest Mouse",
    choiceB: "Numbat",
    choiceC: "Pygmy Marmoset",
    choiceD: "Bumblebee Bat",
    correct: "D",
    progress: "6"
}, {
    question: "What is the largest of the great apes?",
    choiceA: "Orangutan",
    choiceB: "Western Lowland Gorilla",
    choiceC: "Eastern Lowland Gorilla",
    choiceD: "Mountain Gorilla",
    correct: "D",
    progress: "7"
}, {
    question: "What is the world's most poisonous spider?",
    choiceA: "Brown Recluse",
    choiceB: "Brazilian Wandering Spider",
    choiceC: "Sydney Funnel Spider",
    choiceD: "Daddy-Longlegs",
    correct: "B",
    progress: "8"
}, {
    question: "How many times can a hummingbird flap its wings per second?",
    choiceA: "20",
    choiceB: "40",
    choiceC: "80",
    choiceD: "160",
    correct: "C",
    progress: "9"
}, {
    question: "What animal has the highest blood pressure?",
    choiceA: "Giraffe",
    choiceB: "Blue Whale",
    choiceC: "Elephant",
    choiceD: "Flea",
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

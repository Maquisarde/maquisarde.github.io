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
    question: "Where is Rihanna originally from?",
    choiceA: "South Africa",
    choiceB: "Barbados",
    choiceC: "Venezuela",
    choiceD: "Mauritius",
    correct: "B",
    progress: "1"
}, {
    question: "Justin Timberlake is married to...",
    choiceA: "Cameron Diaz",
    choiceB: "Britney Spears",
    choiceC: "Amanda Seyfried",
    choiceD: "Jessica Biel",
    correct: "D",
    progress: "2"
}, {
    question: "Beyonce was a member of which group?",
    choiceA: "Black Eyed Peas",
    choiceB: "TLC",
    choiceC: "Spice Girls",
    choiceD: "Destiny's Child",
    correct: "D",
    progress: "3"
}, {
    question: "In which opera did Maria Callas make her last appearance at Covent Garden?",
    choiceA: "Andrew",
    choiceB: "Alexander",
    choiceC: "Robert",
    choiceD: "Drew",
    correct: "D",
    progress: "4"
}, {
    question: "Who was Katy Perry married to?",
    choiceA: "Travis Mccoy",
    choiceB: "Orlando Bloom",
    choiceC: "Russell Brand",
    choiceD: "John Mayer",
    correct: "C",
    progress: "5"
    }, {
    question: "When was Adam Levine born?",
    choiceA: "March 16 1983",
    choiceB: "August 28 1980",
    choiceC: "November 13 1981",
    choiceD: "March 18 1979",
    correct: "D",
    progress: "6"
}, {
    question: "What is Kim Kardashian's height?",
    choiceA: "1,59 m",
    choiceB: "1,65 m",
    choiceC: "1,52 m",
    choiceD: "1,71 m",
    correct: "A",
    progress: "7"
}, {
    question: "Where was Drake born?",
    choiceA: "Toronto, Canada",
    choiceB: "New York, America",
    choiceC: "London, United Kingdom",
    choiceD: "Sydney, Australia",
    correct: "A",
    progress: "8"
}, {
    question: " Paris Hilton's family is famous for...",
    choiceA: "Owning an expensive clothing line",
    choiceB: "Her father is an actor",
    choiceC: "A reality show",
    choiceD: "Owning an expensive hotel line",
    correct: "D",
    progress: "9"
}, {
    question: "What does Jay-Z use to carry in an empty VHS box?",
    choiceA: "Condoms",
    choiceB: "Drugs",
    choiceC: "Cash",
    choiceD: "A Gun",
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

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
    question: "Who sings SexyBack?",
    choiceA: "Justin Timberlake",
    choiceB: "Usher",
    choiceC: "Justin Bieber",
    choiceD: "Enrique Iglesias",
    correct: "A",
    progress: "1"
}, {
    question: "Which mathematical symbol is not the name of an Ed Sheeran album?",
    choiceA: "Plus",
    choiceB: "Multiply",
    choiceC: "Divide",
    choiceD: "Subtract",
    correct: "D",
    progress: "2"
}, {
    question: "Complete the Mark Ronson song title: Uptown...",
    choiceA: "Beat",
    choiceB: "Girl",
    choiceC: "Funk",
    choiceD: "Tunes",
    correct: "C",
    progress: "3"
}, {
    question: "What is the song that launched Justin Bieber to superstardom",
    choiceA: "What Do You Mean?",
    choiceB: "Baby",
    choiceC: "Sorry",
    choiceD: "Love Yourself",
    correct: "B",
    progress: "4"
}, {
    question: "Which Taylor Swift album is Shake It Off on?",
    choiceA: "Speak Now",
    choiceB: "Taylor Swift",
    choiceC: "Red",
    choiceD: "1989",
    correct: "D",
    progress: "5"
    }, {
    question: "Which Beatle performed a James Bond theme song?",
    choiceA: "John Lennon",
    choiceB: "Paul McCartney",
    choiceC: "George Harrison",
    choiceD: "Ringo Starr",
    correct: "B",
    progress: "6"
}, {
    question: "Who sings Call Me Maybe?",
    choiceA: "Taylor Swift",
    choiceB: "Carly Rae Jepsen",
    choiceC: "Lana Del Rey",
    choiceD: "Rihanna",
    correct: "B",
    progress: "7"
}, {
    question: "Complete the Rihanna lyric: “We found love in a...”",
    choiceA: "Hopeless place",
    choiceB: "Deadly place",
    choiceC: "Dangerous place",
    choiceD: "Ravaged place",
    correct: "A",
    progress: "8"
}, {
    question: "In which video does Michael Jackson play a zombie?",
    choiceA: "Bad",
    choiceB: "Beat It",
    choiceC: "Speed Demon",
    choiceD: "Thriller",
    correct: "D",
    progress: "9"
}, {
    question: "Which movie is Can't Stop the Feeling from?",
    choiceA: "Suicide Squad",
    choiceB: "Pitch Perfect 2",
    choiceC: "Trolls",
    choiceD: "Zootopia",
    correct: "C",
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

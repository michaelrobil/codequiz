const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const retakIt = document.getElementById("retakeIt");

// create our questions
let questions = [{
    question: "What is the correct HTML element for playing audio files?",
    imgSrc: "img/html.png",
    choiceA: "h1",
    choiceB: "em",
    choiceC: "audio",
    correct: "C"
}, {
    question: "Which HTML element defines the title of a document?",
    imgSrc: "img/css.png",
    choiceA: "meter",
    choiceB: "header",
    choiceC: "title",
    correct: "C"
}, {
    question: "What is the correct HTML element to define emphasized text?",
    imgSrc: "img/js.png",
    choiceA: "em",
    choiceB: "h1",
    choiceC: "br",
    correct: "A"
}, {
    question: "Which HTML element is used to display a scalar measurement within a range?",
    imgSrc: "img/html.png",
    choiceA: "footer",
    choiceB: "meter",
    choiceC: "nav",
    correct: "B"
}, {
    question: "Which of these elements are all <table> elements?",
    imgSrc: "img/html.png",
    choiceA: "title",
    choiceB: "tr",
    choiceC: "textarea",
    correct: "B"
}];
// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
var userInitials;

// Reset button
var fullReset = document.getElementById("retakeIt");
fullReset.addEventListener('click', function(e) {
    location.reload();
}, false);

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);
// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}
// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
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
// check answer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        // The remain time out of 15 will be added as score
        score = ((questionTime - (count - 1)) + score);

        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // The penlty of wrong answer is subtract 15 point
        score -= 15;
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
        userInitials = prompt("Enter your initials to save your score.");
        // Store the user initials and score to the localstorage
        var existingEntries = JSON.parse(localStorage.getItem("user"));
        if (existingEntries == null) { existingEntries = []; }
        console.log(existingEntries);
        var userInitials;
        var entry = {
            "title": userInitials,
            "text": score
        };
        localStorage.setItem("entry", JSON.stringify(entry));
        existingEntries.push(entry);
        localStorage.setItem("user", JSON.stringify(existingEntries));
    }
}
// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // Show the score
    scoreDiv.innerHTML = "<p>" + "Your score is " + score + "</p>";
}
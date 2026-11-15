import { createRoot } from "react-dom/client";
import { Header, Footer, Spacer } from "./util/common";
import { StrictMode, useState } from "react";
import generateQuiz from "./scripts/generatequiz";
import { Question } from "./util/quizcards";

const testData = await getTestData();
const questions = getQuestionsCount();

const quiz = generateQuiz(testData, questions);

let userResults = [];

async function getTestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number.parseInt(urlParams.get("id"));

    if (sessionStorage.currentTest && JSON.parse(sessionStorage.currentTest).id === id) {
        return JSON.parse(sessionStorage.currentTest);
    }

    const testData = await getTest(id);
    sessionStorage.currentTest = JSON.stringify(testData);
    return testData;
}

function onQuizComplete() {
    sessionStorage.quizResults = JSON.stringify(userResults);
    window.location.replace("/tests/quiz-complete.html");
}

function getQuestionsCount() {
    const urlParams = new URLSearchParams(window.location.search);
    const qs = Number.parseInt(urlParams.get("questions"));

    return Number.parseInt(qs);
}

export default function App() {
    const [question, setQuestion] = useState(0);
    document.title = `${testData.name} | Вопрос ${question} из ${questions}`;

    function onAnswer(ans) {
        let q = quiz[question];
        console.log(ans, question, q);
        q.userAnswer = ans;
        userResults.push(q);
        if (question === quiz.length - 1) {
            onQuizComplete();
        }
        setQuestion((q) => q + 1);
    }

    return <>
        <Header />
        <main>
            <h1>Вопрос {question + 1}</h1>
            <Spacer />
            <Question question={question} onAnswer={onAnswer} quiz={quiz} />
        </main>
        <Footer />
    </>;
}

createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
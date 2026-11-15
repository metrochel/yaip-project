import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer, Spacer } from "./util/common";
import { Question } from "./util/quizcards.jsx";

const quiz = JSON.parse(sessionStorage.quizResults);

function Questions() {
    const quizElements = quiz.map((q, i) => {
        const correct = q.userAnswer === q.question.id;
        let correctText;
        if (correct) {
            correctText = <em className="correct-text">Правильно</em>
        } else {
            correctText = <em className="incorrect-text">Неправильно</em>
        }
        return <>
            <h2>Вопрос {i + 1} - {correctText}</h2>
            <Question key={q.question.id} question={i} quiz={quiz} answer={q.userAnswer} />
            <Spacer />
        </>
    });

    return <>{quizElements}</>;
}

function Results() {
    let correct = [];
    let incorrect = [];

    for (const question of quiz) {
        if (question.userAnswer === question.question.id)
            correct.push(question);
        else
            incorrect.push(question);
    }

    return <>
        <h3>Итого:</h3>
        <ul>
            <li className="correct-text">Правильно: {correct.length}</li>
            <li className="incorrect-text">Неправильно: {incorrect.length}</li>
        </ul>
    </>;
}

function ReturnToTestBtn() {
    return <button className="nav-button"
        onClick={() => {
            const test = JSON.parse(sessionStorage.currentTest);
            window.location.replace(`/tests/test.html?id=${test.id}`);
        }}>Вернуться к тесту</button>
}

export default function App() {
    return <>
        <Header />
        <main>
            <h1>Результаты</h1>
            <Spacer />
            <Questions />
            <Results />
            <ReturnToTestBtn />
        </main>
        <Footer />
    </>;
}

createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
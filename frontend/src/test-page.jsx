import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer, Spacer, CloseBtn } from "./util/common";
import getTest from "./scripts/gettestdata";
import { dateToStr, signedDaysStr } from "./util/commonfuncs";
import { FactoidCard } from "./util/factoidcards";
import './style/teststyle.css';
import { SliderInputControl } from "./util/formcontrols";

const testData = await getTestData();

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

function constructFactoidCards() {
    const factoids = testData.factoids;

    const factoidCards = factoids.map((factoid) => <FactoidCard key={factoid.id} id={factoid.id} name={factoid.name} content={factoid.content} />);

    return factoidCards;
}

function generateQuiz() {
    const testId = testData.id;
    const questionsCnt = document.getElementById("questions-cnt").value;

    window.location.href = `/tests/quiz.html?id=${testId}&questions=${questionsCnt}`;
}

function GenerateQuizPopup({ref}) {
    function close() {
        ref.current.classList.remove('open');
    }

    return <div className="quiz-popup" ref={ref}>
        <form onSubmit={(e) => {e.preventDefault(); generateQuiz();}}>
            <caption>
                <strong>Подготовка к тесту</strong>
                <CloseBtn onClose={close} />
            </caption>
            <SliderInputControl id="questions-cnt" label="Количество вопросов" min={1} max={testData.factoids.length} />
            <button>Начать</button>
        </form>
    </div>;
}

function TestButtons({popupRef}) {
    function open() {
        popupRef.current.classList.add("open");
    }

    return <div className="test-buttons">
        <button onClick={open}>Подготовиться</button>
        <button>Скачать файл подготовки</button>
    </div>;
}

export default function App() {
    if (testData === undefined || testData === null) {
        window.location.replace("/index.html");
    }
    document.title = testData.name;

    const popupRef = useRef(null);

    return <>
        <GenerateQuizPopup ref={popupRef} />

        <Header />
        <main>
            <h1>{testData.name}</h1>
            <h3>{testData.discipline}</h3>
            <p>{dateToStr(testData.due)} ({signedDaysStr(testData.due)})</p>
            <Spacer />
            <TestButtons popupRef={popupRef} />
            <Spacer />

            <h3>Вопросы</h3>
            <section>
                {constructFactoidCards()}
            </section>
        </main>
        <Footer />
    </>;
}

createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
import { createRoot } from "react-dom/client";
import { StrictMode, useState } from "react";
import { Header, Footer, Spacer } from "./util/common";
import { DateInputControl, NumberInputControl, SelectionControl, SubmitBtnControl, TextInputControl } from "./util/formcontrols"; 
import QuestionCard from "./util/questioncards";
import './style/addteststyle.css';
import './style/liststyle.css';
import loadDisciplines from "./scripts/loaddisciplines";

function AddQuestionsBtn({click}) {
    return <button type="button" className="add-test-btn" onClick={click}>Добавить вопрос</button>
}

function Questions() {
    const [questions, setQuestions] = useState([]);

    function addQuestionCard() {
        const idx = questions.length;
        setQuestions([...questions, <QuestionCard key={idx} idx={idx}/>]);
    }

    return <>
        <section>
            {questions}
        </section>
        <AddQuestionsBtn click={addQuestionCard} />
    </>;
}

export default function App() {
    if (!sessionStorage.getItem("disciplines")) {
        loadDisciplines(null, {});
    }
    const selection = JSON.parse(sessionStorage.getItem("disciplines"))
        .map((discipline) => { return {name: discipline.id, displayName: discipline.name}; });
    
    const urlParams = new URLSearchParams(window.location.search);

    let preselectId = null;
    if (urlParams.get("discipline")) {
        preselectId = Number.parseInt(urlParams.get("discipline"));
    }

    return <>
        <Header />
        <main>
            <h1>Создать тест</h1>
            <form>
                <TextInputControl id="name" label="Имя теста" required={true}/>
                <SelectionControl id="discipline" label="Дисциплина" 
                    selection={selection} preselected={preselectId} />
                <DateInputControl id="due" label="Дата теста" required={true} />
                <NumberInputControl id="maxGrade" label="Максимальный балл" required={true} min={1} max={100} />
                <Spacer />
                    <h2>Вопросы теста</h2>
                <Questions />
                <SubmitBtnControl />
            </form>
        </main>
        <Footer />
    </>;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
)
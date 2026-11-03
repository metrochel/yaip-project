import { createRoot } from "react-dom/client";
import { StrictMode, useState } from "react";
import { Header, Footer, Spacer } from "./util/common";
import { DateInputControl, NumberInputControl, SelectionControl, SubmitBtnControl, TextInputControl } from "./util/formcontrols"; 
import QuestionCard from "./util/questioncards";
import './style/addteststyle.css';
import './style/liststyle.css';
import loadDisciplines from "./scripts/loaddisciplines";
import createTest from "./scripts/createtest";

async function onFormSubmit(questions) {
    const name = document.getElementById("name").value;
    const discipline = Number.parseInt(document.getElementById("discipline").value);
    const due = document.getElementById("due").value;
    const maxGrade = Number.parseInt(document.getElementById("maxGrade").value);

    let uniqueQs = [];
    for (const question of questions) {
        if (!(question in uniqueQs)) {
            uniqueQs.push(question);
        }
    }

    const stringifiedQs = uniqueQs.map((q) => {
        if (typeof(q) === typeof([])) {
            return `{${q}}`;
        }
        if (typeof(q) === typeof(0)) {
            return `${q}`;
        }
    });
    
    const questionIdsStr = stringifiedQs.join(";");
    
    const id = await createTest(name, discipline, due, maxGrade, questionIdsStr);
    console.log(id);
}

function AddQuestionsBtn({click}) {
    return <button type="button" className="add-test-btn" onClick={click}>Добавить вопрос</button>
}

function Questions({ onAdd, onChange }) {
    const [questions, setQuestions] = useState([]);

    function addQuestionCard() {
        onAdd();
        const idx = questions.length;
        setQuestions([...questions, <QuestionCard key={idx} idx={idx}
            onChange={(val) => onChange(idx, val)}/>]);
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

    const [questions, setQuestions] = useState([]);

    return <>
        <Header />
        <main>
            <h1>Создать тест</h1>
            <form onSubmit={(e) => {e.preventDefault(); onFormSubmit(questions);}}>
                <TextInputControl id="name" label="Имя теста" required={true}/>
                <SelectionControl id="discipline" label="Дисциплина" 
                    selection={selection} preselected={preselectId} />
                <DateInputControl id="due" label="Дата теста" required={true} />
                <NumberInputControl id="maxGrade" label="Максимальный балл" required={true} min={1} max={100} />
                <Spacer />
                    <h2>Вопросы теста</h2>
                <Questions 
                    onChange={(idx, value) => {
                        setQuestions(q => [...(q.slice(0, idx)), value, ...(q.slice(idx + 1))]); 
                    }}
                    onAdd={() => {
                        setQuestions(q => [...q, null]); 
                    }}
                    />
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
);
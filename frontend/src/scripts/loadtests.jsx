import { createRoot } from 'react-dom/client';
import TestCard from '../util/testcards';

function today() {
    let curDate = new Date(Date.now());
    curDate.setHours(0);
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    return curDate.valueOf();
}

function generateDueText(due) {
    if (due < today()) {
        return "";
    }
    const msInDay = 1000 * 60 * 60 * 24;
    let diff = Math.floor((due - today()) / msInDay);
    if (diff == 0) {
        return "Сегодня";
    } else if (diff == 1) {
        return "Завтра";
    } else if (diff == 2) {
        return "Послезавтра";
    } else if (diff == 3 || diff == 4) {
        return `${diff} дня`
    } else {
        return `${diff} дней`;
    }
}

function putSpinner(root) {
    root.render(
        <img src={null} alt="Загрузка..." className="spinner" />
    );
}

async function getTests() {
    if (!sessionStorage.getItem("tests")){
        sessionStorage.setItem("tests", JSON.stringify([
            {
                id: 0, 
                name: "Тест", 
                discipline: "Дисциплина", 
                due: Date.UTC(2026, 9, 21)
            }, 
            {
                id: 1, 
                name: "Тест 2", 
                discipline: "Дисциплина", 
                due: Date.UTC(2026, 9, 22)
            },
            {
                id: 2,
                name: "Тест 3",
                discipline: "Дисциплина 3",
                due: Date.UTC(2026, 9, 18),
                passed: true,
                score: 18,
                maxScore: 20
            },
            {
                id: 3,
                name: "Тест 4",
                discipline: "Дисциплина 4",
                due: Date.UTC(2026, 9, 18),
                passed: false,
                score: 8,
                maxScore: 20
            }
        ]));
        console.log("Тесты обновлены");
    }
    return JSON.parse(sessionStorage.getItem("tests"));
}

function renderTests(tests, root, filter) {
    const filteredTests = tests.filter(t =>
        filter.pastOnly && t.due < Date.now() ||
        filter.dueOnly && t.due > Date.now() ||
        filter.passed && t.passed ||
        filter.failed && t.failed
    );
    const testItems = filteredTests.map(test => 
    <TestCard 
        key={test.id} 
        name={test.name} 
        discipline={test.discipline} 
        due={generateDueText(test.due)} 
        score={test.score}
        maxScore={test.maxScore}
        passed={test.passed}
        allowedEdit={filter.allowedEdit} 
        />);
    root.render(testItems.length ? (<>{testItems}</>) : (<p>Тестов нет</p>));
}

export default async function loadTests(sectionId, filter) {
    const element = document.getElementById(sectionId);
    const root = createRoot(element);
    
    putSpinner(root);
    
    const tests = await getTests();

    renderTests(tests, root, filter);
}
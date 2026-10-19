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
    await fetch("/api/thing");
    return [
        {
            id: 0, 
            name: "Тест", 
            discipline: "Дисциплина", 
            due: Date.UTC(2026, 9, 18)
        }, 
        {
            id: 1, 
            name: "Тест 2", 
            discipline: "Дисциплина", 
            due: Date.UTC(2026, 9, 20)
        }
    ];
}

function renderTests(tests, root) {
    const testItems = tests.map(test => <TestCard 
        key={test.id} name={test.name} discipline={test.discipline} due={generateDueText(test.due)} allowedEdit={false} />);
    root.render(<>{testItems}</>);
}

export default async function loadTests(sectionId) {
    console.log("Загружаю тесты.");

    const element = document.getElementById(sectionId);
    const root = createRoot(element);
    
    putSpinner(root);
    
    const tests = await getTests();
    root.render(<h1>fdhjkafhjk</h1>)
    renderTests(tests, root);
}
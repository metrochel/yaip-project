import { createRoot } from 'react-dom/client';
import TestCard from '../util/testcards';
import { apiQuery } from '../util/apireq';



function putSpinner(root) {
    root.render(
        <img src={null} alt="Загрузка..." className="spinner" />
    );
}

async function getTests() {
    const testsKey = "tests";
    if (!sessionStorage.getItem(testsKey)) {
        const tests = await apiQuery("/tests/list");
        if (!tests) return null;
        sessionStorage.setItem(testsKey, JSON.stringify(tests));
        console.log("Тесты обновлены");
        return tests;
    }
    return JSON.parse(sessionStorage.getItem(testsKey));
}

function renderTests(tests, root, filter) {
    if (!tests) {
        root.render(<p>Тестов нет</p>);
        return;
    }

    const filteredTests = tests.filter(t =>
        filter.pastOnly && t.due < Date.now() ||
        filter.dueOnly && t.due > Date.now() ||
        filter.passed && t.passed ||
        filter.failed && t.failed ||
        filter.discipline != undefined && t.discipline == filter.discipline
    )
        .sort((a, b) => Math.abs(a.due) - Math.abs(b.due));

    if (!filteredTests) {
        root.render(<p>Тестов нет</p>);
        return;
    }

    const testItems = filteredTests.map(test => 
    <TestCard 
        key={test.id} 
        id={test.id}
        name={test.name} 
        discipline={test.discipline} 
        due={generateDueText(test.due)} 
        grade={test.grade}
        maxGrade={test.maxGrade}
        passed={test.passed}
        allowedEdit={filter.allowedEdit} 
        />);
    root.render(testItems.length ? (<>{testItems}</>) : (<p>Тестов нет</p>));
}

export default async function loadTests(sectionId, filter) {
    if (!sectionId) {
        await getTests();
        return;
    }
    
    const element = document.getElementById(sectionId);
    const root = createRoot(element);
    
    putSpinner(root);
    
    const tests = await getTests();

    renderTests(tests, root, filter);
}
import { Header, Footer, Spacer, CaptionBtns } from './util/common';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import loadTests from './scripts/loadtests';
import loadFactoids from './scripts/loadfactoids';
import loadDisciplines from './scripts/loaddisciplines';

const discipline = await getDisciplineData();

async function getDisciplineData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    if (!sessionStorage.getItem("disciplines")) {
        await loadDisciplines(null, {});
    }
    const disciplines = JSON.parse(sessionStorage.getItem("disciplines"));
    for (const discipline of disciplines) {
        if (discipline.id == id)
            return discipline;
    }

    return undefined;
}

function KnowledgeHeader() {
    return (
    <div className="caption">
        <h2>Знания</h2>
        <CaptionBtns 
            addOnClick={() => window.location.href = `/factoid/create-factoid?id=${discipline.id}`}
            />
    </div>
    );
}

function TestsHeader() {
    return (
    <div className="caption">
        <h2>Предстоящие тесты</h2>
        <CaptionBtns />
    </div>
    );
}

export default function App() {
    if (!discipline) {
        window.location.replace("/index.html");
    }

    document.title = discipline.name;

    return <>
        <Header />
        <main>
            <h1>{discipline.name}</h1>
            <Spacer />
            <KnowledgeHeader />
            <section id="factoids">

            </section>
            <Spacer />
            <TestsHeader />
            <section id="tests">
                
            </section>
        </main>
        <Footer />
    </>;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
setTimeout(() => {
    loadTests("tests", {
        dueOnly: true,
        discipline: discipline.id
    });
    loadFactoids("factoids", discipline.id);
}, 250);
import { Header, Footer, Spacer, CaptionBtns } from "./util/common";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import loadTests from "./scripts/loadtests";
import loadDisciplines from './scripts/loaddisciplines';

export function TestsHeader() {
    return (
        <div className="caption">
            <h1>Тесты</h1>
            <CaptionBtns />
        </div>
    );
}

export function DisciplinesHeader() {
    return (
        <div className="caption">
            <h1>База знаний</h1>
            <CaptionBtns addOnClick={() => window.location.assign("/discipline/create-discipline.html")} />
        </div>
    );
}

export default function App() {
    return (
        <>
            <Header />
            <main>
                <TestsHeader/>
                <section id="tests">

                </section>
                <Spacer />
                <DisciplinesHeader />
                <section id="disciplines">

                </section>
            </main>
            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
setTimeout(() => {
    loadTests("tests", {
        allowedEdit: true,
        dueOnly: true,
    });
    loadDisciplines("disciplines", {});
}, 250);
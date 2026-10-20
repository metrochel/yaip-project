import { StrictMode } from "react";
import { Header, Footer, Spacer, CaptionBtns } from "./util/common";
import { createRoot } from 'react-dom/client';
import loadTests from './scripts/loadtests';

function UpcomingTestsHeader() {
    return (
        <div className="caption">
            <h2>Предстоящие</h2>
            <CaptionBtns />
        </div>
    )
}

function CompletedTestsHeader() {
    return (
        <div className="caption">
            <h2>Прошедшие</h2>
            <CaptionBtns />
        </div>
    );
}

export default function App() {
    return (
        <>
            <Header />
            <main>
                <h1>Тесты</h1>
                <UpcomingTestsHeader />
                <section id="upcoming-tests">

                </section>
                <Spacer />
                <CompletedTestsHeader />
                <section id="completed-tests">

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
    loadTests("upcoming-tests", {dueOnly: true});
    loadTests("completed-tests", {pastOnly: true});
}, 250);
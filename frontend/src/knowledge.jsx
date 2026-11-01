import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer, Spacer } from './util/common';
import Search from "./util/knowledgesearch";
import loadDisciplines from './scripts/loaddisciplines';

export default function App() {
    return (
        <>
        <Header />
        <main>
            <h1>База знаний</h1>
            <Search />
            <Spacer />
            <h2>Дисциплины</h2>
            <section id="disciplines">

            </section>
        </main>
        <Footer />
        </>
    );
}

createRoot(document.getElementById("root"))
    .render(<StrictMode>
        <App />
    </StrictMode>);
setTimeout(() => {
    loadDisciplines("disciplines", {});
}, 250);
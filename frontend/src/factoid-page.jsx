import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Header, Footer, Spacer } from "./util/common";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { apiQuery } from "./util/apireq";
import loadDisciplines from "./scripts/loaddisciplines";
import "katex/dist/katex.css";

const factoid = await getFactoidData();

async function getFactoidData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const data = apiQuery(`/factoid/get?id=${id}`);
    if (!data) {
        window.location.replace("/index.html");
    }

    return data;
}

function disciplineName() {
    const id = factoid.discipline;

    if (!sessionStorage.getItem("disciplines")) {
        loadDisciplines(null, {});
    }

    const disciplinesList = JSON.parse(sessionStorage.getItem("disciplines"));
    for (const discipline of disciplinesList) {
        if (discipline.id === id) {
            return discipline.name;
        }
    }
}

export default function App() {
    document.title = factoid.name;

    return <>
        <Header />
        <main>
            <h1>{factoid.name}</h1>
            <h3>{disciplineName()}</h3>
            <h3>Модуль {factoid.module}</h3>
            <Spacer />
            <Markdown 
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}>{factoid.content}
                </Markdown>
        </main>
        <Footer />
    </>;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
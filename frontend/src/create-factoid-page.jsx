import { createRoot } from "react-dom/client";
import { StrictMode, useState } from "react";
import { Header, Footer, Spacer } from './util/common';
import { TextInputControl, NumberInputControl, 
    SelectionControl, SubmitBtnControl } from "./util/formcontrols";
import loadDisciplines from "./scripts/loaddisciplines";
import createFactoid from "./scripts/createfactoid";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.css';

function LiveMarkdownEditor() {
    const [md, setMd] = useState("");

    return <>
        <textarea id="content" name="content" required={true}
            value={md} onChange={(e) => setMd(st => e.target.value)}
            placeholder="Код Markdown..."></textarea>
        <Spacer />
        <div className="markdown">
            <Markdown 
                remarkPlugins={[remarkMath, remarkGfm]} 
                rehypePlugins={[rehypeKatex]}>
                {md}
            </Markdown>
        </div>
    </>;
}

export default function App() {
    const urlParams = new URLSearchParams(window.location.search);
    let preselectId = null;
    if (urlParams.get("id")) {
        preselectId = Number.parseInt(urlParams.get("id"));
    }

    if (!sessionStorage.disciplines) {
        loadDisciplines(null, {});
    }
    const disciplineList = JSON.parse(sessionStorage.disciplines).map(d => {
        return {name: d.id, displayName: d.name}
    });

    return <>
        <Header />
        <main>
            <h1>Добавление знаний</h1>
            <form>
                <TextInputControl id="name" label="Название" required={true}/>
                <SelectionControl id="discipline" label="Дисциплина" 
                    selection={disciplineList} preselected={preselectId} />
                <NumberInputControl id="module" label="Модуль" required={true} min={1} />
                <Spacer />
                <LiveMarkdownEditor />
                <SubmitBtnControl />
            </form>
        </main>
        <Footer />
    </>;
}

function getFactoid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.values();
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.search) return;
    const [name, discipline, module, content] = getFactoid();
    const id = await createFactoid(name, discipline, module, content);
    // window.location.replace(`/factoid/factoid.html?id=${id}`);
});
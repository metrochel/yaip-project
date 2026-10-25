import { createRoot } from "react-dom/client";
import { StrictMode, useState } from "react";
import { Header, Footer, Spacer } from './util/common';
import { TextInputControl, NumberInputControl, 
    SelectionControl, SubmitBtnControl } from "./util/formcontrols";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.css'

function LiveMarkdownEditor() {
    const [md, setMd] = useState("");

    return <>
        <textarea id="content" name="content" 
            value={md} onChange={(e) => setMd(st => e.target.value)}></textarea>
        <Spacer />
        <Markdown 
            remarkPlugins={[remarkMath, remarkGfm]} 
            rehypePlugins={[rehypeKatex]}>
            {md}
        </Markdown>
    </>;
}

export default function App() {
    const urlParams = new URLSearchParams(window.location.search);
    let preselectId = null;
    if (urlParams.get("id")) {
        preselectId = Number.parseInt(urlParams.get("id"));
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

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
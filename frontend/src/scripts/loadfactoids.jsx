import { createRoot } from "react-dom/client";
import { apiQuery } from "../util/apireq";
import { Spinner } from "../util/common";
import { firstSentence } from "../util/commonfuncs";
import Markdown from "react-markdown";
import { FactoidCard } from "../util/factoidcards";



function putSpinner(root) {
    root.render(<Spinner />);
}

async function getFactoids(discipline) {
    return await apiQuery(`/factoid/list?discipline=${discipline}`);
}

function renderFactoids(root, factoids) {
    if (!factoids.length) {
        root.render(<p>Знаний нет</p>);
        return;
    }

    const factoidList = factoids.map((fcs, idx) => 
        <ModuleSection key={idx} moduleNo={idx + 1} factoids={fcs} />);

    root.render(<>{factoidList}</>);
}

export default async function loadFactoids(sectionId, discipline) {
    if (!sectionId) {
        await getFactoids(discipline);
    }
    const root = createRoot(document.getElementById(sectionId));

    putSpinner(root);

    const factoids = await getFactoids(discipline);

    renderFactoids(root, factoids);
}
import { createRoot } from "react-dom/client";
import { Spinner } from "../util/common";
import DisciplineCard from "../util/disciplinecards";
import { apiQuery } from "../util/apireq";

function putSpinner(root) {
    root.render(<Spinner />)
}

async function getDisciplines() {
    const disciplinesKey = "disciplines"
    if (!sessionStorage.getItem(disciplinesKey)) {
        const disciplines = await apiQuery("/disciplines/list");
        if (!disciplines) return null;
        sessionStorage.setItem(disciplinesKey, JSON.stringify(disciplines));
        console.log("Дисциплины обновлены");
        return disciplines;
    }
    return JSON.parse(sessionStorage.getItem(disciplinesKey));
}

function renderDisciplines(root, disciplines, filter) {
    if (!disciplines) {
        root.render(<p>Дисциплин нет</p>);
        return;
    }
    const filteredDiscips = disciplines.filter((d) => true);

    const discipItems = filteredDiscips.map(d => (
        <DisciplineCard
            key={d.id}
            name={d.name}
            teacher={d.teacher}
        />
    ));

    root.render(<>{discipItems}</>);
}

export default async function loadDisciplines(sectionId, filter) {
    const element = document.getElementById(sectionId);
    const root = createRoot(element);

    putSpinner(root);

    const disciplines = await getDisciplines();
    renderDisciplines(root, disciplines, filter);
}
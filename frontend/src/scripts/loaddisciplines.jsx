import { createRoot } from "react-dom/client";
import { Spinner } from "../util/common";
import DisciplineCard from "../util/disciplinecards";

function putSpinner(root) {
    root.render(<Spinner />)
}

async function getDisciplines() {
    const disciplinesKey = "disciplines"
    if (!sessionStorage.getItem(disciplinesKey)) {
        sessionStorage.setItem(disciplinesKey, JSON.stringify([
            {
                id: 0,
                name: "Дисциплина 1",
                teacher: "Преподаватель 1"
            }
        ]));
    }
    return JSON.parse(sessionStorage.getItem(disciplinesKey));
}

function renderDisciplines(root, disciplines, filter) {
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
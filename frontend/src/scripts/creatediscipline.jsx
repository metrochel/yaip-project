import { apiQuery } from "../util/apireq"; 
import loadDisciplines from './loaddisciplines';

async function updateDisciplines(id, name, teacher) {
    let disciplines = JSON.parse(sessionStorage.getItem("disciplines"));
    if (!disciplines) {
        await loadDisciplines(null, {});
        return;
    }

    disciplines.push({id: id, name: name, teacher: teacher});
    sessionStorage.setItem("disciplines", JSON.stringify(disciplines));
}

export default async function createDiscipline(name, teacher) {
    console.log(`Создаю дисциплину ${name} преподавателя ${teacher}.`);

    try {
        const response = await apiQuery("/disciplines/create", {name: name, teacher: teacher});
        const id = response.id;
        console.log(`ID новой дисциплины: ${id}`);
        updateDisciplines(id, name, teacher);
        return id;
    }
    catch {
        console.error("Не удалось создать дисциплину.");
        return null;
    }
}
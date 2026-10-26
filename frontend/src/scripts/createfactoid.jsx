import { apiQuery } from "../util/apireq";

export default async function createFactoid(name, discipline, module, content) {
    console.log(`Создаю знание ${name} модуля ${module} дисциплины ${discipline}.`);

    const result = await apiQuery("/factoid/create", {
        name: name,
        discipline: discipline,
        module: module,
        content: content
    });

    if (!result.created) {
        console.error("Не удалось создать знание.");
        return;
    }

    return result.id;
}
import { apiQuery } from "../util/apireq";

export default async function createTest(name, discipline, due, maxGrade, questions) {
    const result = await apiQuery("/tests/create", 
        {
            name: name,
            discipline: discipline,
            due: due,
            maxGrade: maxGrade,
            questions: questions
        }
    );

    return result.id;
}
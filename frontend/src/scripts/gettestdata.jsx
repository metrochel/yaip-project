import { apiQuery } from "../util/apireq";

export default async function getTest(id) {
    const testData = apiQuery(`/tests/get?id=${id}`);

    return testData;
}
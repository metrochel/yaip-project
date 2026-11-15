function randomizeList(list, cnt, exclude=(x) => false) {
    let randomEls = [];
    let randomIndices = [];
    for (let i = 0; i < cnt; i++) { 
        let randomIdx = Math.floor(Math.random() * list.length);
        if (randomIdx === list.length)
            randomIdx = list.length - 1;
        while (randomIndices.includes(randomIdx) || exclude(list[randomIdx])) {
            randomIdx ++;
            if (randomIdx >= list.length)
                randomIdx = 0;
        }

        randomIndices.push(randomIdx);
        randomEls.push(list[randomIdx]);
    }

    return randomEls;
}

function getAnsPerQ(randomFacts, allFacts) {
    if (randomFacts.length <= allFacts.length) {
        return randomFacts.length;
    }

    return 4;
}

function generateQuestions(randomFacts, allFacts) {
    const ansPerQ = getAnsPerQ(randomFacts, allFacts);

    let questions = [];

    for (const factoid of randomFacts) {
        const correctAns = factoid;
        const incorrectAnss = randomizeList(allFacts, ansPerQ - 1, (factoid) => factoid.id === correctAns.id);

        questions.push({question: correctAns, answers: randomizeList([correctAns, ...incorrectAnss], ansPerQ)});
    }

    return questions;
}

export default function generateQuiz(test, questionsCnt) {
    const randomFactoids = randomizeList(test.factoids, questionsCnt);

    const questions = generateQuestions(randomFactoids, test.factoids);
    return questions;
}
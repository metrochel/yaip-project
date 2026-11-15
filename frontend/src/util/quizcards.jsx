import '../style/quizstyle.css';

export function QuestionPrompt({ question, quiz }) {
    const qData = quiz[question];

    return <h3>Что такое <em>{qData.question.name.toLowerCase()}</em>?</h3>;
}

export function Answer({ answerData, onAnswer, answer, correct }) {
    const disabled = answer != undefined;
    let className = "";
    if (answer != undefined) {
        console.log(answer, correct);
        if (answerData.id === correct)
            className = "correct-ans";
        else if (answerData.id === answer && answer != correct) {
            className = "incorrect-ans";
        }
    }

    return <button className={className} onClick={() => onAnswer(answerData.id)}
        disabled={disabled}>{answerData.content}</button>;
}

export function AnswerPanel({ question, onAnswer, quiz, answer }) {
    const qData = quiz[question];

    const ansBtns = qData.answers.map((ans) => <Answer key={ans.id} answerData={ans} onAnswer={onAnswer} answer={answer} correct={qData.question.id} />);

    return <div className="answer-panel">
        {ansBtns}
    </div>;
}

export function Question({ question, onAnswer, quiz, answer }) {
    return <>
        <QuestionPrompt quiz={quiz} question={question} />
        <AnswerPanel quiz={quiz} question={question} onAnswer={onAnswer} answer={answer} />
    </>;
}
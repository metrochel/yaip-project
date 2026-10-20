import "../style/liststyle.css";

function PassedBubble() {
    return (
        <div className="test-passed">
            <img src={null} alt="Сдан"></img>
            <p>Сдан</p>
        </div>
    );
}

function FailedBubble() {
    return (
        <div className="test-failed">
            <img src={null} alt="Не сдан"></img>
            <p>Не сдан</p>
        </div>
    );
}

function DueBubble({ due }) {
    return (
        <div className="test-soon">
            <img src={null} alt="Скоро" />
            <p>{due}</p>
        </div>
    )
}

function GradesText({ score, maxScore, passed }) {
    return (
        <>
        <p>{score} из {maxScore}</p>
        •
        <p className={passed ? "success-text" : "fail-text"}>
            {Math.floor((score / maxScore) * 100)}%
        </p>
        </>
    );
}

function EditBtn() {
    return (
        <button className="edit-btn">
            <img src={null} alt="Редактировать" />
        </button>
    );
}

export default function TestCard({name, discipline, due, score, maxScore, passed, allowedEdit}) {
    const isDue = due != "";
    return (
        <div className="test-card">
            <h2>{name}</h2>
            <h3>{discipline}</h3>
            {!isDue ? (
                passed ? (<PassedBubble />) : (<FailedBubble />)
            ) : (<DueBubble due={due} />)
            }
            <div className="grades">
                {!isDue ? <GradesText score={score} maxScore={maxScore} passed={passed} /> : <></>}
                {!passed || due != "" ? <button>Подготовиться</button> : <></>}
            </div>
        </div>
    );
}
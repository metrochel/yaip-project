import "../style/liststyle.css";

export default function TestCard({name, discipline, due, allowedEdit}) {
    return (
        <div className="test-card">
            <h2>{name}</h2>
            <h3>{discipline}</h3>
            <div className="test-soon">
                <img src={null} alt="Скоро" />
                <p>{due}</p>
            </div>
            <button>Подготовиться</button>
        </div>
    );
}
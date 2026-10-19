import "../style/liststyle.css";

export default function DisciplineCard({name, teacher, items}) {
    return (
        <div className="discipline-card">
            <h2>{name}</h2>
            <h3>{teacher}</h3>
            <button>Перейти</button>
        </div>
    )
}
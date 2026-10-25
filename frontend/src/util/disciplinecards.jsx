import "../style/liststyle.css";



export default function DisciplineCard({id, name, teacher, items}) {
    return (
        <div className="discipline-card">
            <h2>{name}</h2>
            <h3>{teacher}</h3>
            <button onClick={() => {
                window.location.href = `/discipline/discipline.html?id=${id}`
            }}>Перейти</button>
        </div>
    )
}
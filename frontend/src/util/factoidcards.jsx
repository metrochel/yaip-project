import Markdown from "react-markdown";
import '../style/cardstyle.css';

export function FactoidCard({id, name, content}) {
    return <div className="factoid-card" key={id}>
        <h3>{name}</h3>
        <Markdown>{content}</Markdown>
        <button onClick={() => {
            window.location.href = `/factoid/factoid.html?id=${id}`;
        }}>Подробнее</button>
    </div>;
}

export function ModuleSection({moduleNo, factoids}) {
    const factoidCards = factoids.map((factoid) =>
        <FactoidCard key={factoid.id} id={factoid.id} name={factoid.name} content={factoid.content} />
    );

    return <>
        <h2>Модуль {moduleNo}</h2>
        <section id="module-tests">
            {factoidCards}
        </section>
    </>;
}
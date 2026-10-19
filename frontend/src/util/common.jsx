import "../style/mainpagestyle.css";

export function Header() {
    return (
        <header>
            <div className="title-card">
                <img src={null} alt="Кнопка левой панели"/>
                <a href="index.html">
                    <h2 id="top">Имя проекта</h2>
                </a>
            </div>
            <div className="user-card">
                <img src={null} alt="Аватар пользователя"/>
                <h3>Пользователь</h3>
            </div>
        </header>
    )
}

export function Footer() {
    return (
        <footer>
            <div className="link-stack">
                <a href="index.html">Главная</a>
                <a href="tests.html">Тесты</a>
                <a href="knowledge.html">База знаний</a>
            </div>
            <a href="#top">Наверх</a>
        </footer>
    );
}

export function Spacer() {
    return <p className="break"></p>;
}

export function CaptionBtns() {
    return (
        <div className="caption-btns">
            <button className="add-button">
                <img src={null} alt="Добавить" />
            </button>
            <button className="filter-button">
                <img src={null} alt="Фильтр" />
            </button>
        </div>
    );
}
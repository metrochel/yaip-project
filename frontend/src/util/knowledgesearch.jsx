import '../style/searchstyle.css';

export default function Search() {
    return <search>
        <input type="search" placeholder="Поиск..." />
        <button type="button" id="search-button">Поиск</button>
    </search>;
}
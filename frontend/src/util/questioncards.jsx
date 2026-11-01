import { useRef, useState } from 'react';
import { NumberInputControl } from './formcontrols';
import Search from './knowledgesearch';

function QuestionRadioButton({ value, label, onClick, checked }) {
    return <div className="radio-button">
        <input type="radio" name="card-type" value={value} onClick={onClick} checked={checked} />
        <label>{label}</label>
    </div>;
}

function QuestionTab({ ref, children }) {
    return <div className="tab" ref={ref}>
        {children}
    </div>
}

function AddFactoidBtn() {
    return <button type="button" id="add-factoid-btn">Добавить ещё</button>
}

export default function QuestionCard({idx}) {
    const tabs = [null, useRef(null), useRef(null), useRef(null)];
    const [activeTab, setActiveTab] = useState(1);

    function activateTab(tab) {
        tabs[tab].current.scrollIntoView({container: "nearest", inline: "start"});
        setActiveTab(tab);
    }

    return <div className="question-card">
        <h2>Карточка вопроса {idx + 1}</h2>
        <fieldset>
            <legend>Тип группы вопросов</legend>
            <QuestionRadioButton value="module" label="Модуль" onClick={() => activateTab(1)} />
            <QuestionRadioButton value="singlefact" label="Одно знание" onClick={() => activateTab(2)} />
            <QuestionRadioButton value="manyfacts" label="Несколько знаний" onClick={() => activateTab(3)} />
        </fieldset>
        <div className="tabs">
            <QuestionTab ref={tabs[1]}>
                <NumberInputControl label="Номер модуля" min={1} required={activeTab === 1} />
            </QuestionTab>
            <QuestionTab ref={tabs[2]}>
                <p>Одно знание</p>
                <Search />
            </QuestionTab>
            <QuestionTab ref={tabs[3]}>
                <p>Несколько знаний</p>
                <Search />
                <AddFactoidBtn />
            </QuestionTab>
            <div></div>
        </div>
    </div>;
}
import '../style/formstyle.css';

export function TextInputControl({id, label, required}) {
    return <div className="form-box">
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} name={id} required={required}></input>
        {required ? <p>Обязательно для заполнения</p> : <></>}
    </div>;
}

export function NumberInputControl({id, label, required, min, max}) {
    return <div className="form-box">
        <label htmlFor={id}>{label}</label>
        <input type="number" id={id} name={id} required={required}
            min={min} max={max}></input>
    </div>
}

export function SelectionControl({id, label, selection, preselected}) {
    const selectItems = selection.map(element => {
        if (!element.displayName) element.displayName = element.name;
        return (
        <option 
            key={element.name}
            value={element.name} 
            >{element.displayName}</option>
        );
    });

    return <div className="form-box">
        <label htmlFor={id}>{label}</label>
        <select defaultValue={preselected} name={id}>
            {selectItems}
        </select>
    </div>;
}

export function SubmitBtnControl() {
    return <button type="submit">Отправить</button>;
}
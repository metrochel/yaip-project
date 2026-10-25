import '../style/formstyle.css';

export function TextInputControl({id, label, required}) {
    return <div className="form-box">
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} name={id} required={required}></input>
    </div>;
}

export function SubmitBtnControl() {
    return <button type="submit">Отправить</button>;
}
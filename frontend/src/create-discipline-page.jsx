import { StrictMode } from 'react';
import { Header, Footer, Spacer } from './util/common';
import { createRoot } from 'react-dom/client';
import { TextInputControl, SubmitBtnControl } from './util/formcontrols';
import createDiscipline from './scripts/creatediscipline';

async function onFormSubmit() {
    const name = document.getElementById("name").value;
    const teacher = document.getElementById("teacher").value;

    const id = await createDiscipline(name, teacher);
    window.location.replace(`/discipline/discipline.html?id=${id}`);
}

export default function App() {
    return <>
        <Header />
        <main>
            <h1>Добавить дисциплину</h1>
            <Spacer />
            <form onSubmit={(e) => {e.preventDefault(); onFormSubmit();}}>
                <TextInputControl id="name" label="Имя дисциплины" required={true} />
                <TextInputControl id="teacher" label="Преподаватель" required={true} />
                <SubmitBtnControl />
            </form>
        </main>
        <Footer />
    </>;
}

createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
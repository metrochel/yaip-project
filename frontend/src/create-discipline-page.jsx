import { StrictMode } from 'react';
import { Header, Footer, Spacer } from './util/common';
import { createRoot } from 'react-dom/client';
import { TextInputControl, SubmitBtnControl } from './util/formcontrols';
import createDiscipline from './scripts/creatediscipline';

export default function App() {
    return <>
        <Header />
        <main>
            <h1>Добавить дисциплину</h1>
            <Spacer />
            <form>
                <TextInputControl id="name" label="Имя дисциплины" required={true} />
                <TextInputControl id="teacher" label="Преподаватель" required={true} />
                <SubmitBtnControl />
            </form>
        </main>
        <Footer />
    </>;
}

function getDisciplineParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return [urlParams.get("name"), urlParams.get("teacher")];
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.search) return;
    const [name, teacher] = getDisciplineParams();
    const id = await createDiscipline(name, teacher);
    window.location.replace(`/discipline/discipline.html?id=${id}`);
});
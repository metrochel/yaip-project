import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header, Footer, Spacer } from "./util/common";
import getTest from "./scripts/gettestdata";
import { dateToStr, signedDaysStr } from "./util/commonfuncs";

const testData = await getTestData();

async function getTestData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const testData = await getTest(id);
    return testData;
}

export default function App() {
    if (testData === undefined || testData === null) {
        window.location.replace("/index.html");
    }
    document.title = testData.name;

    return <>
        <Header />
        <main>
            <h1>{testData.name}</h1>
            <h3>{testData.discipline}</h3>
            <p>{dateToStr(testData.due)} ({signedDaysStr(testData.due)})</p>
        </main>
        <Footer />
    </>;
}

createRoot(document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
export function firstSentence(str) {
    let periodIdx = str.indexOf(".");
    let newlIdx = str.indexOf("\n");

    if (periodIdx === -1) {
        periodIdx = str.length + 1;
    }
    if (newlIdx === -1) {
        newlIdx = str.length + 1;
    }

    console.log(periodIdx, newlIdx);
    return str.substring(0, Math.min(periodIdx, newlIdx));
}
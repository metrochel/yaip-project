const hostName = "localhost";
const apiPort = 5000;

function generateParamStr(params) {
    const pairs = Object.entries(params);
    let str = `${pairs[0][0]}=${pairs[0][1]}`;
    for (let i = 1; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        str += `&${key}=${value}`;
    }
    return str;
}

export async function apiQuery(path, params) {
    let url = `http://${hostName}:${apiPort}/api` + path;
    if (params) {
        url += "?" + generateParamStr(params);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new WebTransportError(`GET ${url}: ${response.status}`);
    }

    const responseBody = await response.json();
    return responseBody;
}
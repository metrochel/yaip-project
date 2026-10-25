const hostName = "localhost";
const apiPort = 5000;

export function apiUrl(path) {
    return `http://${hostName}:${apiPort}/api` + path;
}

function generateParamStr(params) {
    const pairs = Object.entries(params);
    let str = `${pairs[0][0]}=${pairs[0][1]}`;
    for (let i = 1; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        str += `&${key}=${value}`;
    }
    return str;
}

export async function apiQuery(path, body=null) {
    let url = apiUrl(path);

    let method = {};
    if (body) {
        method = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    const response = await fetch(url, method);
    if (!response.ok) {
        throw new WebTransportError(`${body ? "POST" : "GET"} ${url}: ${response.status}`);
    }

    if (response.status == 204) {
        return null;
    }

    const responseBody = await response.json();
    return responseBody;
}
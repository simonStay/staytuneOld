
export default async function resToBody(res) {
    // console.log("res_123", JSON.stringify(res))
    let body = null;
    if (res.headers['Content-Type'] === 'application/json') {
        body = await res.json();
    } else {
        body = await res.text();
        try {
            body = JSON.parse(body);
        } catch (err) {
            body = 'error';
        }
    }
    return body;
}

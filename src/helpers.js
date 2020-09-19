/**
 * Creates a response lambda proxy.
 *
 */
function createResponseLambdaProxy(response, raw = false) {
    let body = "";
    if (raw) {
        body = response.body
    } else {
        body = response.statusCode === 200 ? JSON.stringify(response.body)
            : JSON.stringify({ message: response.message || "unknown" });
    }

    return {
        statusCode: response.statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body
    }
}

module.exports = {
    createResponseLambdaProxy
}

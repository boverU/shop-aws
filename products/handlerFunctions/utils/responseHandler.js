export function responseHandler(statusCode, body) {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
        },
        body
    };
}
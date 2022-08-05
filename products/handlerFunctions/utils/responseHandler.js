export function responseHandler(statusCode, body) {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "https://d3jh9f0toashuf.cloudfront.net",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT"
        },
        body
    };
}
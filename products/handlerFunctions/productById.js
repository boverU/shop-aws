const fs = require('fs').promises;

export const productById = async (event) => {
    const allData = await fs.readFile('./mockData.json');
    const found = (JSON.parse(allData.toString())).find(product => product.id === Number(event.pathParameters.id));
    if (found) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(found)
        }
    }
    return {
        statusCode: 404,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: `Product under id ${event.pathParameters.id} not found`
    }
}

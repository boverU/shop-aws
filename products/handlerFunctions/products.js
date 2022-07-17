const fs = require('fs').promises;

export const products = async (_event) => {
    const data = await fs.readFile('./mockData.json')
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: data.toString()
    };
};
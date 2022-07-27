import DBPool from './dbconfig'

export const products = async (_event) => {
    try {
        const result = await DBPool.query('SELECT product.id,product.title, product.description, product.price , stock.count FROM stock INNER JOIN product ON stock.product_id = product.id')
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(result.rows)
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: error.stack
        };
    }

};
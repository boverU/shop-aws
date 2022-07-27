import DBPool from './dbconfig'
import { consoleRequest } from './utils'

export const products = async (event, context) => {
    consoleRequest(event, context)
    try {
        const result = await DBPool.query('SELECT product.id,product.title, product.description, product.price , stock.count FROM stock INNER JOIN product ON stock.product_id = product.id')
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: JSON.stringify(result.rows)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: error.stack
        };
    }

};
import DBPool from './dbconfig'
import { consoleRequest } from './utils'

export const productById = async (event, context) => {
    consoleRequest(event, context)
    try {
        const { rows } = await DBPool.query(
            {
                name: 'get product',
                text: 'SELECT product.id,product.title, product.description, product.price , stock.count FROM stock INNER JOIN product ON stock.product_id = product.id where product.id=$1',
                values: [event.pathParameters.id],
            }
        )


        if (rows.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
                },
                body: JSON.stringify(rows[0])
            }
        }
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: `Product under id ${event.pathParameters.id} not found`
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: `${error.stack}`
        }
    }

}

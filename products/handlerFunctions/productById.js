import DBPool from './dbconfig'
import { consoleRequest } from './utils'
import { responseHandler } from './utils/responseHandler'

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
            return responseHandler(200, JSON.stringify(rows[0]))
        }
        return responseHandler(404, `Product under id ${event.pathParameters.id} not found`)
    } catch (error) {
        return responseHandler(500, error.stack);
    }

}

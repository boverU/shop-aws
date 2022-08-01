import DBPool from './dbconfig'
import { consoleRequest } from './utils'
import { responseHandler } from './utils/responseHandler';

export const products = async (event, context) => {
    consoleRequest(event, context)
    try {
        const result = await DBPool.query('SELECT product.id,product.title, product.description, product.price , stock.count FROM stock INNER JOIN product ON stock.product_id = product.id')
        return responseHandler(200, JSON.stringify(result.rows))
    } catch (error) {
        return responseHandler(500, error.stack);
    }

};
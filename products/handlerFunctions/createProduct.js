import DBPool from './dbconfig'
import { consoleRequest } from './utils';
import { validateObject } from './utils/validateObject';
import { responseHandler } from './utils/responseHandler';

export const createProduct = async (event, context) => {
    consoleRequest(event, context)
    const data = JSON.parse(event.body);
    const errors = validateObject(data, {
        title: "string",
        description: "string",
        price: "number",
        count: "number"
    });
    if (errors.length) {
        const errorBody = errors.reduce((acc, value) => {
            acc += value + ","
            return acc
        }, "Validation problem: ")
        return responseHandler(400, errorBody.replace(/.$/, ''));
    }

    try {
        await DBPool.query('BEGIN');
        const queryText = `insert into product(title, price, description) values($1, $2, $3) returning id, title, description`;
        const res = await DBPool.query({ name: "create product", text: queryText, values: [data.title, data.price, data.description] });

        const insertCountQuery = 'INSERT into stock(product_id,count) values($1, $2)';
        await DBPool.query(insertCountQuery, [res.rows[0].id, data.count]);
        DBPool.query('COMMIT');

        return responseHandler(200, JSON.stringify({ ...res.rows[0], count: data.count }))
    } catch (error) {
        await DBPool.query('ROLLBACK');
        return responseHandler(500, error.stack)
    }
};
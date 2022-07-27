import DBPool from './dbconfig'

export const createProduct = async (event) => {
    const data = JSON.parse(event.body);
    try {
        await DBPool.query('BEGIN');
        const queryText = `insert into product(title, price, description) values($1, $2, $3) returning id, title, description`;
        const res = await DBPool.query({ name: "create product", text: queryText, values: [data.title, data.price, data.description] });

        const insertCountQuery = 'INSERT into stock(product_id,count) values($1, $2)';
        await DBPool.query(insertCountQuery, [res.rows[0].id, data.count]);
        DBPool.query('COMMIT');
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: JSON.stringify({ ...res.rows[0], count: data.count })
        };
    } catch (error) {
        await DBPool.query('ROLLBACK');
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT"
            },
            body: error.stack
        };
    }



};
export function validateObject(data, schema) {
    const errors = [];

    const areTheSameKeys = Object.keys(data).sort().toString() === Object.keys(schema).sort().toString()
    if (!areTheSameKeys) {
        errors.push("Provided not valid body")
        return errors;
    }

    Object.entries(schema).forEach(([key, type]) => {
        if ((typeof data[key]) !== type) {
            errors.push(key)
        }
    })


    return errors
}
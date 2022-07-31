import { products } from '../handlerFunctions/products';
import { productById } from '../handlerFunctions/productById';
const fs = require('fs').promises;

describe("Products lambda test", () => {
    it("Products read mock", async () => {
        const readMockSpy = jest.spyOn(fs, "readFile")
        await products();
        expect(readMockSpy).toHaveBeenCalledTimes(1);
        readMockSpy.mockClear();
    })

    it("Product by id read from mock", async () => {
        const readMockSpy = jest.spyOn(fs, "readFile")
        await productById({ pathParameters: 2 });
        expect(readMockSpy).toHaveBeenCalledTimes(1);
        readMockSpy.mockClear();
    })
})
const { expect } = require('chai');
const { checkQueryParams } = require('../middlewares/checkQueryParams');
const request = require('supertest');
const app = require('../app');

// ! TESTING CODE
describe('Query params check middleware', function () {
    it('should thorw error if "a" is not present in query params', async function () {
        const response = await request(app).get('/?b=2&op=add');
        expect(response.status).to.equal(422);
    });

    it('should thorw error if "b" is not present in query params', async function () {
        const response = await request(app).get('/?a=23&op=add');
        expect(response.status).to.equal(422);
    });

    it('should thorw error if "op" is not present in query params', async function () {
        const response = await request(app).get('/?a=23&b=24');
        expect(response.status).to.equal(422);
    });

    it('should throw error if number is not provided with a and b', async function () {
        const response = await request(app).get('/?a=iuyr&b=24&op=add');
        expect(response.status).to.equal(422);
    });

    it('should throw error if any of the paramters is missing', async function () {
        const response = await request(app).get('/?a=2&op=add');
        expect(response.status).to.equal(422);
        expect(response.body).to.have.property('success', false);
    });

    it('should throw error if invalid operator is sent', async function () {
        const res = await request(app).get('/?a=2&b=23&op=delete');
        expect(res.status).to.equal(422);
    });

    it('should return error response if b is zero in division operation', async function () {
        const res = await request(app).get('/?a=2&b=0&op=div');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('success', false);
        expect(res.body).to.have.property('message', 'Cannot divide by zero.');
    });
});

import { API_URL } from "../../configs/constants";

describe("category routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/POST Create new category", async () => {

        let res = await supertest
            .post(`/category`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET get all category", async () => {
        let res = await supertest
            .get(`/category`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET/id Show specify category", async () => {
        let res = await supertest
            .get(`/category/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/PUT/id Modify specify category", async () => {
        let res = await supertest
            .put(`/category/1`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/DELETE/id Delete specify category", async () => {
        let res = await supertest
            .del(`/category/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

});
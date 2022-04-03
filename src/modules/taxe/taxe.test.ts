import { API_URL } from "../../configs/constants";

describe("taxe routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/POST Create new taxe", async () => {

        let res = await supertest
            .post(`/taxe`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET get all taxe", async () => {
        let res = await supertest
            .get(`/taxe`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET/id Show specify taxe", async () => {
        let res = await supertest
            .get(`/taxe/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/PUT/id Modify specify taxe", async () => {
        let res = await supertest
            .put(`/taxe/1`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/DELETE/id Delete specify taxe", async () => {
        let res = await supertest
            .del(`/taxe/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

});
import { API_URL } from "../../configs/constants";

describe("activity routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/POST Create new activity", async () => {

        let res = await supertest
            .post(`/activity`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET get all activity", async () => {
        let res = await supertest
            .get(`/activity`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET/id Show specify activity", async () => {
        let res = await supertest
            .get(`/activity/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/PUT/id Modify specify activity", async () => {
        let res = await supertest
            .put(`/activity/1`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/DELETE/id Delete specify activity", async () => {
        let res = await supertest
            .del(`/activity/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

});
const chai = require('chai');
const expect = chai.expect;
const api = require('../api/fazztrackApi');
const data = require('../testdata/testdata');
const scenario = require('../scenarios/create-user');
const requestBody = require('../data/create-user.json');
const jsonSchema = require('../schemas/search-user-schema.json');

//urutan matters
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe("Search User API Test", async () => {
    before(async () => {
        console.log("before hooks");
        let response = await api.postUser(requestBody);
        expect(response.status).to.equal(200);
    })

    after(async () => {
        console.log("after hooks");
    })

    beforeEach(async () => {
        console.log("before each hooks");
    })

    afterEach(async () => {
        console.log("after each hooks");
    })

    it("[@search-user-api] Search user with valid keyword", async () => {
        let keyword = "Hendri";
        let response = await api.getUser(keyword);
        expect(response.status).to.equal(201);
        expect(response.body.data).contains.something.like({firstName: 'Hendri'});
        expect(response.body).has.jsonSchema(jsonSchema);
    });
});
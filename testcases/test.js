const chai = require('chai');
const expect = chai.expect;
const api = require('../api/fazztrackApi');
const data = require('../testdata/testdata');
const scenario = require('../scenarios/create-user');
const requestBody = require('../data/create-user.json');

//urutan matters
chai.use(require('chai-like'));
chai.use(require('chai-things'));


// MOCHA FRAMEWORK TEST
describe(`${scenario.testcase.description}`, async() => {

    it('[@search-user] Verify get users API will return data when using valid keyword', async () => {
        // starting for scripting
        let namaYgMauDiCari = 'Hendri';

        let response = await api.getUser(namaYgMauDiCari);
        let bodyData = response.body;
        expect(response.status).to.equal(200);
        // expect(bodyData.data.length).to.equal(0);
        console.log(bodyData)
        expect(bodyData.data).contains.something.like({firstName: 'Hendri'});
    });

    // it('GET Testcase2 | klo misal sy Get untuk nama yg ada d server, maka return nya yg ada data nyah', async () => {
    //     // starting for scripting
    //     let namaYgMauDiCari = 'dhony';

    //     let response = await api.getUser(namaYgMauDiCari);
    //     let bodyData = response.body;
    //     expect(response.status).to.equal(200);
    //     expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);

    //     namaYgMauDiCari = 'mulki';
    //     // const lastNameYgMauDiCari = 'armansyah';

    //     response = await api.getUser(namaYgMauDiCari);
    //     bodyData = response.body;
    //     expect(response.status).to.equal(200);

    //     for(let index = 0; index < bodyData.data.length; index += 1) {
    //         expect(bodyData.data[index].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
    //     }
    //     expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
    //     expect(bodyData.data[0].lastName.toLowerCase()).to.equal(lastNameYgMauDiCari);
    // });

    it(`${scenario.testcase.positive.case1}`, async () => {
 
        
        // const dataRequest = data.dataRequestAPIPostUser(namaYgMauDiCari);
        let nama = requestBody.firstName;
        let response =  await api.postUser(requestBody);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.firstName).to.equal(nama);
        expect(bodyData.id).not.to.be.null;
       
        // Additional Assertion
        response = await api.getUser(nama);
        bodyData = response.body;
        expect(response.status).to.equal(200);

        for(let index = 0; index < bodyData.data.length; index += 1) {
            expect(bodyData.data[index].firstName.toLowerCase()).to.equal(nama.toLowerCase());
        }
    });
});
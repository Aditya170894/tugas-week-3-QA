const expect = require('chai').expect;
const api = require('../api/fazztrackApi');
const data = require('../testdata/testdata');

// MOCHA FRAMEWORK TEST
describe('TestGroup1 | API Test Fazztrack using dummy server', async() => {

    it('GET Testcase1 | klo misal sy Get untuk nama yg tidak ada d server, maka return nya yg gada data nyah', async () => {
        // starting for scripting
        let namaYgMauDiCari = 'kungpaoTidakAdaDiServerYah';

        let response = await api.getUser(namaYgMauDiCari);
        let bodyData = response.body;
        expect(response.status).to.equal(200);
        expect(bodyData.data.length).to.equal(0);
    });

    it('GET Testcase2 | klo misal sy Get untuk nama yg ada d server, maka return nya yg ada data nyah', async () => {
        // starting for scripting
        let namaYgMauDiCari = 'dhony';

        let response = await api.getUser(namaYgMauDiCari);
        let bodyData = response.body;
        expect(response.status).to.equal(200);
        expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);

        namaYgMauDiCari = 'mulki';
        // const lastNameYgMauDiCari = 'armansyah';

        response = await api.getUser(namaYgMauDiCari);
        bodyData = response.body;
        expect(response.status).to.equal(200);

        for(let index = 0; index < bodyData.data.length; index += 1) {
            expect(bodyData.data[index].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
        }
        expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
        expect(bodyData.data[0].lastName.toLowerCase()).to.equal(lastNameYgMauDiCari);
    });

    it('POST Testcase3 | klo misal sy Post untuk nama yg belum ada d server, maka sy yakin namanya ada d server', async () => {
        const namaYgMauDiCari = 'Bapak Tukimin Baru Lagi';
        
        const dataRequest = data.dataRequestAPIPostUser(namaYgMauDiCari);

        let response =  await api.postUser(dataRequest);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.firstName).to.equal(namaYgMauDiCari);
        
        // Additional Assertion
        response = await api.getUser(namaYgMauDiCari);
        bodyData = response.body;
        expect(response.status).to.equal(200);

        for(let index = 0; index < bodyData.data.length; index += 1) {
            expect(bodyData.data[index].firstName.toLowerCase()).to.equal(namaYgMauDiCari.toLowerCase());
        }
    });
});
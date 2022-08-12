const chai = require('chai');
const expect = chai.expect;
const api = require('../api/fazztrackApi');
const data = require('../testdata/testdata');
const getId = require('../scenarios/search-user-by-id');
const updateData = require('../scenarios/update-profile');
const requestBody = require('../data/create-user.json');
const updateSchema = require('../schemas/update-user-schema.json');
const getIdSchema = require('../schemas/search-user-by-id-schema.json');

//urutan matters
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe('test api', async() => {

    describe(`${getId.testcase.description}`, async () => {

        it(`${getId.testcase.positive.case1}`, async () => {
            let userId = '79f9a8a6-1fa8-4c1d-a910-0ac579586529';
            
            let response = await api.getUserById(userId);
            let bodyData = response.body;
            // console.log(response);
            
            expect(response.status).to.equal(200);
            expect(bodyData).contains.something.like({id: userId});
            expect(response.body).has.jsonSchema(getIdSchema);
        })
        
        it(`${getId.testcase.negative.case1}`, async () =>{
          
            let userId = 1234;
            
            let response = await api.getUserById(userId);
            let bodyData = response.body;
            // console.log(response);
            
            expect(bodyData.id).to.equal(userId);
            expect(response.error).to.equal('ER-01');
            expect(response.status).to.equal(404);
            // expect(response.message).to.equal('user not found');
        });
    
    })

    describe(`${updateData.testcase.description}`, async () =>{

        it(`${updateData.testcase.positive.case1}`, async () =>{
          
            const payload =  {
                "id": "79f9a8a6-1fa8-4c1d-a910-0ac579586529",
                "firstName": "Aditya",
                "lastName": "Saputra",
                "age": 27,
                "occupation": "Dev Ops",
                "nationality": "Jepang",
                "hobbies": [
                  "read novel",
                  "read manga"
                ],
                "gender": "MALE",
                "createdDate": "2022-08-10T22:55:59.891",
                "updatedDate": null
              }
            
            let response = await api.putUser(payload);
            let bodyData = response.body;
            // console.log(response);
    
            expect(response.status).to.equal(200);
            expect(bodyData.occupation).to.equal('Dev Ops');
            expect(bodyData.nationality).to.equal('Jepang');
            expect(response.body).has.jsonSchema(updateSchema);
        });
    
        it(`${updateData.testcase.negative.case1}`, async () =>{
          
            const payload =  {
          "id": "79f9a8a6-1fa8-4c1d-a910-0ac579586529",
          "firstName": "Aditya",
          "lastName": "Saputra",
          "age": 27,
          "occupation": "QA Engineer",
          "nationality": "Indonesia",
          "hobbies": [
            "read novel",
            "read manga"
          ],
          "gender": "MALE",
          "createdDate": "2022-08-10T22:55:59.891",
          "updatedDate": null
        }
            
            let response = await api.putUser(payload);
            let bodyData = response.body;
            // console.log(response);
            
            expect(response.status).to.equal(400);
            expect(bodyData.age).to.equal(0);
            expect(response.error).to.equal('ER-03');
            // expect(response.message)
        });
    
        it(`${updateData.testcase.negative.case2}`, async () =>{
          
            const payload =  {
                "id": "79f9a8a6-1fa8-4c1d-a910-0ac579586529",
                "firstName": "Aditya",
                "lastName": "Saputra",
                "age": 27,
                "occupation": "QA Engineer",
                "nationality": "Indonesia",
                "hobbies": [],
                "gender": "MALE",
                "createdDate": "2022-08-10T22:55:59.891",
                "updatedDate": null
            }
            
            let response = await api.putUser(payload);
            let bodyData = response.body;
            // console.log(response);
            
            expect(bodyData.hobbies).to.equal(0);
            expect(response.error).to.equal('ER-03');
            expect(response.status).to.equal(400);
            // expect(response.message)
        });
    
        it(`${updateData.testcase.negative.case3}`, async () =>{
          
            const payload = {
                "id": null,
                "firstName": "Aditya",
                "lastName": "Saputra",
                "age": 27,
                "occupation": "QA Engineer",
                "nationality": "Indonesia",
                "hobbies": [
                    "read novel",
                    "read manga"
                  ],
                "gender": "MALE",
                "createdDate": "2022-08-10T22:55:59.891",
                "updatedDate": null
            }
            
            let response = await api.putUser(payload);
            let bodyData = response.body;
            // console.log(response);
            
            expect(bodyData.id).to.be.null;
            expect(response.error).to.equal('ER-01');
            expect(response.status).to.equal(404);
            expect(response.message).to.equal('user not found');
        });
    })
})

// MOCHA FRAMEWORK TEST
// describe(`${updateData.testcase.description}`, async() => {

//     it('[@search-user] Verify get users API will return data when using valid keyword', async () => {
//         // starting for scripting
//         let namaYgMauDiCari = 'Hendri';

//         let response = await api.getUser(namaYgMauDiCari);
//         let bodyData = response.body;
//         expect(response.status).to.equal(200);
//         // expect(bodyData.data.length).to.equal(0);
//         console.log(bodyData)
//         expect(bodyData.data).contains.something.like({firstName: 'Hendri'});
//     });

//     // it('GET Testcase2 | klo misal sy Get untuk nama yg ada d server, maka return nya yg ada data nyah', async () => {
//     //     // starting for scripting
//     //     let namaYgMauDiCari = 'dhony';

//     //     let response = await api.getUser(namaYgMauDiCari);
//     //     let bodyData = response.body;
//     //     expect(response.status).to.equal(200);
//     //     expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);

//     //     namaYgMauDiCari = 'mulki';
//     //     // const lastNameYgMauDiCari = 'armansyah';

//     //     response = await api.getUser(namaYgMauDiCari);
//     //     bodyData = response.body;
//     //     expect(response.status).to.equal(200);

//     //     for(let index = 0; index < bodyData.data.length; index += 1) {
//     //         expect(bodyData.data[index].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
//     //     }
//     //     expect(bodyData.data[0].firstName.toLowerCase()).to.equal(namaYgMauDiCari);
//     //     expect(bodyData.data[0].lastName.toLowerCase()).to.equal(lastNameYgMauDiCari);
//     // });

//     it(`${scenario.testcase.positive.case1}`, async () => {
 
        
//         // const dataRequest = data.dataRequestAPIPostUser(namaYgMauDiCari);
//         let nama = requestBody.firstName;
//         let response =  await api.postUser(requestBody);
//         let bodyData = response.body;

//         expect(response.status).to.equal(200);
//         expect(bodyData.firstName).to.equal(nama);
//         expect(bodyData.id).not.to.be.null;
       
//         // Additional Assertion
//         response = await api.getUser(nama);
//         bodyData = response.body;
//         expect(response.status).to.equal(200);

//         for(let index = 0; index < bodyData.data.length; index += 1) {
//             expect(bodyData.data[index].firstName.toLowerCase()).to.equal(nama.toLowerCase());
//         }
//     });
// });
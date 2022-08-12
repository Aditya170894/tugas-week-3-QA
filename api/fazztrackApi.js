const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');


function getUser(inputNama) {
    return serverAPI.get(`/v1/users`)
        .query(
            {
                name: inputNama,
            }
        )
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
}

function getUser2(inputData) {
    const namaInput = inputData.nama;
    const namaOrtu = inputData.ortu;

    return serverAPI.get(`/v1/users?name= ${namaInput}&ortu=${namaOrtu}`)        
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
}

function getUserById(inputId) {
    return serverAPI.get(`/v1/user/${inputId}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json'); 
}

function postUser(bodyRequestData) {
    return serverAPI.post('/v1/users')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

function putUser(bodyRequestData) {
    return serverAPI.put(`/v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

module.exports = {
    getUser,
    getUser2,
    getUserById,
    postUser,
    putUser,
};



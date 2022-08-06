const dataRequestAPIPostUser = function(namaYgMauDiCari) {
    return {
        'id': "1234",
        'firstName': namaYgMauDiCari,
        'lastName': "Ini Emak Saya",
        "age": 10,
        "occupation": "Mahasiswa",
        "nationality": "indonesia",
        "hobbies": [
            "reading manga"
        ],
        "gender": "MALE",
        "createdDate": "2022-08-06T02:34:23.066Z",
        "updatedDate": "2022-08-06T02:34:23.066Z"
    };
}

module.exports = {
    dataRequestAPIPostUser,
}
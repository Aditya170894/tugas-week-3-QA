const testcase = {
    description: '[@updatedata] Update Data User API Test',
    positive: {
        case1: '[@positive] Change Data occupation and nationality will return status code 200'
    },
    negative: {
        case1: '[@agezero] Change Data age with value 0 will return status code 400',
        case2: '[@nohobby] Change Data hobbies with empty array will return status code 400',
        case3: '[@idnull] Change Type Data id with null will return status code 404'
    }
};

module.exports = {
    testcase
};
const testcase = {
    description: '[@createuser] Create User API Test',
    positive: {
        case1: '[@positive] Create User with valid request data will return status code 200'
    },
    negative: {
        case1: '[@negative] Create user with age value 0 will return status code 400'
    }
};

module.exports = {
    testcase
};
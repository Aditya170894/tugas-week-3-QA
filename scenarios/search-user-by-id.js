const testcase = {
    description: '[@userbyid] Search User by id Test',
    positive: {
        case1: '[@validuserid] Search User by valid id will return status code 200'
    },
    negative: {
        case1: '[@invaliduserid] Search User by invalid id will return status code 404'
    }
};

module.exports = {
    testcase
};
const jwt = require('jsonwebtoken');

// payload: object trong javascript => ma hoa no -> token

jwt.sign(123, 'DNCNENCKDCBEN2(#*$dbdqv', (err, token) => {
    console.log(err.toString(), token);
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGhvIiwiaWF0IjoxNDk2NDA4MTQ3fQ.OMnUa5iFGqoBXMgkbrkQShksT63IvgYEbR2-kDKVHe';
// jwt.verify(123, 'DNCNENCKDCBEN2(#*$dbdqv', (err, object) => {
//     console.log(err.toString(), object);
// });

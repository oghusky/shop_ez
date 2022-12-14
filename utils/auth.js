const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

exports.signToken = async ({ email, firstName, lastName, _id }) => {
    const payload = { email, firstName, lastName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

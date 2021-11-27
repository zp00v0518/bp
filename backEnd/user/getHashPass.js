const argon2 = require('argon2');
const config = require('../../config');

async function getHashPass(userData) {
    const pass = userData.pass;
    const email = userData.email;
    const salt = Buffer.from(email+email);
    const hash = await argon2.hash(pass, { salt });
    return hash.replace(config.extraHash, '')

}

module.exports = getHashPass;
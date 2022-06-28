const jwt = require('jsonwebtoken')
const { jwt: jwtConf, testUser } = require('../../config')
const jwtSecretToken = jwtConf.secret
const expiresIn = jwtConf.expiresIn
const issuer = jwtConf.issuer

const sign = ({ userId, mobile }) => {
    return jwt.sign({ userId, mobile }, jwtSecretToken, {
        expiresIn,
        issuer
    })
}

const verify = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecretToken, { issuer, ignoreExpiration: true }, async (err, user) => {
            if (err) reject(err)
            try {
                const { userId, mobile } = user
                if (userId != testUser.userId && mobile != testUser.mobile) {
                    throw Error('Unauthorized')
                }
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    })
}

module.exports = {
    sign,
    verify
}

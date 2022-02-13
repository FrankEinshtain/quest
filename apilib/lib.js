import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const { GATSBY_AUTH0_JWT_AUDIENCE, GATSBY_AUTH0_DOMAIN } = process.env

const validateJwtWithSubject = async function (token) {
  let result = false
  try {
    const keyId = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString()).kid
    // console.log('keyId :>> ', keyId)

    const client = jwksClient({
      strictSsl: true,
      jwksUri: `https://${GATSBY_AUTH0_DOMAIN}/.well-known/jwks.json`,
    })
    const signingKey = await client.getSigningKey(keyId)
    const publicKey = signingKey.getPublicKey()

    jwt.verify(
      token,
      publicKey,
      {
        audience: GATSBY_AUTH0_JWT_AUDIENCE,
        issuer: `https://${GATSBY_AUTH0_DOMAIN}/`,
        // subject: userId,
      },
      (err, decoded) => {
        if (decoded) {
          result = true
        }
        if (err) {
          console.log('err :>> ', err)
          result = false
        }
      }
    )
    return result
  } catch (e) {
    console.log('validateJWT error:\n', e.message)
    return false
  }
}

const removeAnswers = (incomingObject) => {
  const filterQuestions = (arr) => {
    return arr.map((question, q) => {
      question.answer = undefined
      return question
    })
  }
  if (incomingObject.currentGame) {
    incomingObject.currentGame.questions = filterQuestions(incomingObject.currentGame.questions)
  }
  if (incomingObject.questions) {
    incomingObject.questions = filterQuestions(incomingObject.questions)
  }
  return incomingObject
}

export { validateJwtWithSubject, removeAnswers }

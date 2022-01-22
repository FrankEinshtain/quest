// const clientPromise = require('../apilib/mongo.js')
// const { validateJwtWithSubject } = require('../apilib/lib.js')
import { validateJwtWithSubject } from '../apilib/lib.js'

// module.exports = async (req, res) => {
// }

// module.exports = async (req, res) => {
//   const client = await clientPromise
//   // res.status(200).json({ dbName: client.db().databaseName })
//   res.status(200).json({
//     body: req.body,
//     query: req.query,
//     cookies: req.cookies,
//   })
// }

export default function (req, res) {
  console.log('registerUser Hits!\nreq.body :>> ', req.body)
  const isTokenValid = await validateJwtWithSubject(req.headers.authorization.split(' ')[1])
  console.log('isTokenValid :>> ', isTokenValid)
  res.status(200).json({
    body: isTokenValid,
    query: req.query,
    cookies: req.cookies,
    bingo: true,
  })
}

// import { v4 as uuidv4 } from 'uuid'
import { validateJwtWithSubject, removeAnswers } from '../apilib/lib.js'
import { getCurrentUser } from '../apilib/mongoose.js'

export default async function (req, res) {
  console.log('registerUser Hits!\nBody :>> ', req.body)

  try {
    const token = req.headers.authorization.split(' ')[1]
    const isTokenValid = await validateJwtWithSubject(token)
    if (!isTokenValid) {
      res.status(403).json({ success: false, error: 'Authorization Failed!' })
    }

    const { given_name, family_name, nickName, name, email, sub } = req.body
    let currentUser = await getCurrentUser({
      authId: sub,
      name: name || given_name || family_name || null,
      nickName: nickName || null,
      email: email,
      currentGame: null,
    })

    if (currentUser.success) {
      res.status(200).json({ success: true, data: removeAnswers(currentUser.data) })
    } else {
      res.status(200).json({ success: false, error: 'getUser error' })
    }
  } catch (e) {
    res.status(200).json({ success: false, error: e.message })
  }
}

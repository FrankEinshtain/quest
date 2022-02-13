import { validateJwtWithSubject, removeAnswers } from '../apilib/lib.js'
import { getStartedGame, createQuestion, removeId } from '../apilib/mongoose.js'

export default async function (req, res) {
  console.log('startTheGame Hits!\nBody :>> ', req.body)

  try {
    const token = req.headers.authorization.split(' ')[1]
    const isTokenValid = await validateJwtWithSubject(token)
    if (!isTokenValid) {
      res.status(403).json({ success: false, error: 'Authorization Failed!' })
    }

    const currentGame = await getStartedGame(req.body)

    if (currentGame.success) {
      res.status(200).json({ success: true, data: removeAnswers(currentGame.data) })
    } else {
      res.status(200).json({ success: false, error: currentGame.error })
    }
  } catch (e) {
    res.status(200).json({ success: false, error: e.message })
  }
}

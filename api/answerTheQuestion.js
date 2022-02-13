import { validateJwtWithSubject, removeAnswers } from '../apilib/lib.js'
import { validateAnswer, removeId } from '../apilib/mongoose.js'

export default async function (req, res) {
  console.log('answer the question Hits!\nBody :>> ', req.body)

  try {
    const token = req.headers.authorization.split(' ')[1]
    const isTokenValid = await validateJwtWithSubject(token)
    if (!isTokenValid) {
      res.status(403).json({ success: false, error: 'Authorization Failed!' })
    }

    const validatedGame = await validateAnswer(req.body)
    console.log('validatedGame :>> ', validatedGame)

    // res.status(200).json({ success: true, data: validatedGame })

    if (validatedGame.success) {
      res.status(200).json({ success: true, data: validatedGame.data })
    } else {
      res.status(200).json({ success: false, error: validatedGame.error })
    }
  } catch (e) {
    res.status(200).json({ success: false, error: e.message })
  }
}

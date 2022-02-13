import { MongoClient } from 'mongodb'

// const uri = process.env.GATSBY_MONGO_URL
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (hot module replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// module.exports = clientPromise

import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
// import { questionSchema, currentGameSchema, userSchema, Question, QuestionGameUnit, CurrentGame, User } from './schemas.js'
import { questionSchema, userSchema } from './schemas.js'

const { GATSBY_MONGO_URL, GATSBY_QUESTIONS_IN_THE_GAME } = process.env

const mongoInit = async () => {
  try {
    let connection = null
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    }

    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        const _connection = await mongoose.connect(GATSBY_MONGO_URL, options)
        global._mongoClientPromise = _connection
      }
      connection = global._mongoClientPromise
    } else {
      connection = await mongoose.connect(GATSBY_MONGO_URL, options)
    }

    const User = connection.model('User', userSchema)
    const Question = connection.model('Question', questionSchema)

    return { success: true, data: { Question, User } }
  } catch (e) {
    console.log('mongoo init ERROR\n', e.message)
    return { success: false, error: e.message }
  }
}

const checkIfAuthUserExists = async (User, userAuthId) => {
  const user = await User.findOne({ authId: userAuthId }, ' -_id -__v').exec()
  return user
}

// const removeAnswers = (incomingObject) => {
//   if (incomingObject.currentGame) {
//     incomingObject.currentGame.questions = incomingObject.currentGame.questions.map(
//       (question, q) => {
//         delete question.answer
//         delete question._id
//         return question
//       }
//     )
//   }
//   if (incomingObject.questions) {
//     incomingObject.questions = incomingObject.questions.map((question, q) => {
//       delete question.answer
//       delete question._id
//       return question
//     })
//   }
//   return incomingObject
// }

const getCurrentUser = async (user) => {
  try {
    const initializedMongo = await mongoInit()
    if (!initializedMongo.success) {
      return { success: false, error: initializedMongo.error }
    }
    const { User } = initializedMongo.data

    let existingUser = await checkIfAuthUserExists(User, user.authId)
    if (existingUser) {
      if (existingUser.currentGame) {
        // existingUser.currentGame.questions = [1, 2, 3]
        console.log('existingUser :>> ', existingUser)
        console.log('existingUser.currentGame.questions :>> ', existingUser.currentGame.questions)
      }
      existingUser._id = undefined
      existingUser.__v = undefined
      return { success: true, data: existingUser }
    }
    user.id = uuidv4()
    const newUser = await new User(user)
    const savedUser = await newUser.save()
    if (savedUser.errors) {
      return { success: false, error: 'unknown save user error' }
    }
    savedUser._id = undefined
    savedUser.__v = undefined
    return { success: true, data: savedUser }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const getStartedGame = async (userId) => {
  try {
    const initializedMongo = await mongoInit()
    if (!initializedMongo.success) {
      return { success: false, error: initializedMongo.error }
    }
    const { Question, User } = initializedMongo.data

    const questionsAmount = await Question.count().exec()
    const questionsArray = []
    const getRandomQuestion = async (questionsAmount) => {
      const random = Math.floor(Math.random() * questionsAmount)
      const _randomQuestion = await Question.findOne().skip(random).exec()
      const isQuestionAlreadyPicked = questionsArray.some((q) => q.id === _randomQuestion.id)
      if (isQuestionAlreadyPicked) {
        return getRandomQuestion(questionsAmount)
      } else {
        const randomQuestion = _randomQuestion.toObject()
        randomQuestion.faults = []
        randomQuestion.isDone = null
        return randomQuestion
      }
    }

    for (let i = 0; i < GATSBY_QUESTIONS_IN_THE_GAME; i++) {
      const randomQuestion = await getRandomQuestion(questionsAmount)
      questionsArray.push(randomQuestion)
    }

    const _newStartedGame = {
      startTime: Date.now(),
      finishTime: null,
      gameType: 0,
      questions: questionsArray,
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: { currentGame: _newStartedGame } },
      { new: true }
    ).exec()
    if (updatedUser.errors) {
      return { success: false, error: 'unknown start game error' }
    }
    return { success: true, data: updatedUser.currentGame }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const validateAnswer = async ({ userId, questionId, userInput }) => {
  try {
    const initializedMongo = await mongoInit()
    if (!initializedMongo.success) {
      return { success: false, error: initializedMongo.error }
    }
    const { User } = initializedMongo.data
    const currentUser = await User.findOne({ id: userId }, ' -_id -__v').exec()
    // if (currentUser && currentUser.currentGame) {
    // }
    const checkedQuestionsArray = currentUser.currentGame.questions.map((question, q) => {
      if (question.id === questionId) {
        if (userInput === question.answer) {
          question.isDone = Date.now()
        } else {
          question.faults.push(Date.now())
        }
        console.log('target question :>> ', question)
      }
      return question
    })
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: { 'currentGame.questions': checkedQuestionsArray } },
      { new: true }
    ).exec()
    console.log('updatedUser :>> ', updatedUser)
    return { success: true, data: updatedUser.currentGame }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const createQuestion = async (question) => {
  try {
    const initializedMongo = await mongoInit()
    if (!initializedMongo.success) {
      return { success: false, error: initializedMongo.error }
    }
    const { Question } = initializedMongo.data
    question.id = uuidv4()
    const _newQuestion = await new Question(question)
    const newQuestion = await _newQuestion.save()
    if (newQuestion.errors) {
      return { success: false, error: 'unknown create question error' }
    }
    return { success: true, data: newQuestion }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const removeId = (obj) => {
  // if (obj.history) {
  // }
  if (obj.questions) {
    obj.questions.forEach((item) => {
      // removeId(item)
      delete item._id
    })
  }
  return obj
}

export { getCurrentUser, getStartedGame, validateAnswer, createQuestion, removeId }

// import { v4 as uuidv4 } from 'uuid'
// import { MongoClient } from 'mongodb'
// import mongoose from 'mongoose'
import {
  QuestionSchema,
  QuestionGameUnitSchema,
  CurrentGameSchema,
  UserSchema,
  Question,
  QuestionGameUnit,
  CurrentGame,
  User,
} from './schemas.js'

// const User = mongoose.model('User', UserSchema)
// const Question = mongoose.model('Question', QuestionSchema)
// const QuestionGameUnit = mongoose.model('QuestionGameUnit', QuestionGameUnitSchema)
// const CurrentGame = mongoose.model('CurrentGame', CurrentGameSchema)

const checkIfAuthUserExists = async (usersCollection, userAuthId) => {
  console.log('checkIfAuthUserExists userAuthId :>> ', userAuthId)
  // const user = await usersCollection.findOne({ authId: userAuthId })
  const user = await User.findOne({ authId: userAuthId }).exec()
  // User.findOne({ authId: userAuthId }, (err, data) => {
  //   if (err) {
  //     console.log('err :>> ', err)
  //   }
  //   if (data) {
  //     console.log('data :>> ', data)
  //   }
  // })
  // return 'nope'

  console.log('checkIfAuthUserExists user :>> ', user)
  return user
}

const createUser = async (usersCollection, userObject) => {
  // const _id = uuidv4()
  // console.log('createUser _id :>> ', _id)
  // userObject.id = _id
  console.log('createUser userObject :>> ', userObject)
  const newUser = await usersCollection.insertOne(userObject)
  console.log('createUser newUser :>> ', newUser)
  return newUser
}

export { checkIfAuthUserExists, createUser }

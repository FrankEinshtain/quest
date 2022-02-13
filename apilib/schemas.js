import mongoose from 'mongoose'
const Schema = mongoose.Schema
const { String, Date, Boolean, Number } = mongoose.Schema.Types

const baseQuestionObject = {
  id: { type: String, index: true, unique: true, required: true },
  text: { type: String, required: true },
  answer: { type: String, required: true },
  answerType: { type: Number, default: 0 },
}

const question = Object.create(baseQuestionObject)
const questionSchema = new Schema(baseQuestionObject)
if (!questionSchema.options.toObject) questionSchema.options.toObject = {}
questionSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret._id
  delete ret.__v
}
const Question = mongoose.model('Question', questionSchema)

const questionUnitObject = {
  id: { type: String, index: true, unique: true, required: true },
  text: { type: String, required: true },
  answer: { type: String, required: true },
  answerType: { type: Number, default: 0 },
  faults: { type: [Date], default: [] },
  isDone: { type: Date, default: null },
}
// const questionGameUnit = Object.create(questionUnitObject)
const questionGameUnitSchema = new Schema(questionUnitObject)
// if (!questionGameUnitSchema.options.toObject) questionGameUnitSchema.options.toObject = {}
// questionGameUnitSchema.options.toObject.transform = function (doc, ret, options) {
//   delete ret._id
//   delete ret.__v
// }
// const QuestionGameUnit = mongoose.model('QuestionGameUnit', questionGameUnitSchema)

const currentGameObject = {
  kiddy: { type: Boolean, default: true },
  startTime: { type: Date },
  finishTime: { type: Date, default: null },
  gameType: { type: Number, default: 0 },
  questions: { type: [questionUnitObject], default: null },
}
const currentGameSchema = new Schema(currentGameObject)
if (!currentGameSchema.options.toObject) currentGameSchema.options.toObject = {}
currentGameSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret._id
  delete ret.__v
}
const CurrentGame = mongoose.model('CurrentGame', currentGameSchema)

const validateEmail = function (email) {
  var re = /^.+@(?:[\w-]+\.)+\w+$/
  return re.test(email)
}

const userBaseObject = {
  id: { type: String, index: true, unique: true, required: true },
  authId: { type: String, unique: true, required: true },
  name: { type: String, default: null },
  nickName: { type: String, default: null },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address'],
  },
  // currentGame: { type: currentGameSchema, default: null },
  currentGame: { type: currentGameObject, default: null },
}
const userSchema = new Schema(userBaseObject, { timestamps: true })
if (!userSchema.options.toObject) userSchema.options.toObject = {}
userSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret._id
  delete ret.__v
}
const User = mongoose.model('User', userSchema)

// export { questionSchema, currentGameSchema, userSchema, Question, CurrentGame, User }
export { questionSchema, userSchema, Question, User }

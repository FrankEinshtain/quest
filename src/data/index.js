import { v4 as uuidv4 } from 'uuid'

// export const userObject = {
//   id: 123456788, // uuid()
//   name: 'frankie',
//   activeGame: null || {},
//   startTime: null, // or timestamp
//   questions: null,
// }
const userId = uuidv4()

export const userObjectBeforeStart = {
  id: userId, // uuid()
  name: 'frankie',
  avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gh28mjVQSZoZYPzi-xZnci05E4UHHUGXV2KkxHq',
  startTime: null, // or timestamp
  questions: [],
  // currentGame: null,
  // currentQuestions: null,
}

export const questionItem = {
  id: 22233344, // uuid()
  text: 'blah-blah-blah ##00',
  isAnswered: false,
}

export const _theGame = {
  id: 12345678, // uuid()
  startTime: new Date().toString(),
  questions: [],
}

export const theGame = {
  id: 12345678, // uuid()
  startTime: new Date().toString(),
  questions: [],
}

export const startedUser = {
  id: userId,
  name: 'frankie',
  avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gh28mjVQSZoZYPzi-xZnci05E4UHHUGXV2KkxHq',
  startTime: 123456789, // timestamp
  // currentGame: {}, // zachem?
  questions: [
    {
      id: uuidv4(),
      text: 'blah-blah ##01',
      // answer: 'answer01',
      isDone: false, // or timestamp
      // isDone: 1637649872353,
      faults: [1637378672350], // or [timestamp]
      // isDisabled: false,
    },
    {
      id: uuidv4(),
      text: 'blah-blah-blah ##02',
      // answer: 'answer02',
      isDone: false, // or timestamp
      faults: [], // or [timestamp]
      // isDisabled: false,
    },
    {
      id: uuidv4(),
      text: 'blah-blah blah-blah ##03',
      // answer: 'answer03',
      isDone: false, // or timestamp
      faults: [1637377672350, 1637378672350, Date.now()], // or [timestamp]
      // isDisabled: false,
    },
  ],
  // goals: [{ id: 333, resultTime: 123321 }],
  // fails: [{ id: 444, resultTime: [321123] }],
  // pendings: [{ id: 555, startTime: 331122 }],
}

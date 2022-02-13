import axios from 'axios'
import { userObjectBeforeStart, startedUser } from '../_data'

const { GATSBY_SERVER_URL } = process.env

// export const registerUser = async (profile, token) => {
//   console.log('registerUser profile :>> ', profile)
//   console.log('GATSBY_SERVER_URL :>> ', GATSBY_SERVER_URL)
//   // const { email, name, nickname, given_name, sub, aud, picture } = profile
//   // const finalName = email || nickname || name || given_name
//   // return { success: true, data: userObjectBeforeStart }
//   // return { success: false, error: 'registerUser error!' }
//   // return { success: true, data: {} }
//   const headers = {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': GATSBY_SERVER_URL,
//     Authorization: `Bearer ${token}`,
//   }

//   try {
//     const res = await axios({
//       method: 'POST',
//       url: `${GATSBY_SERVER_URL}/reguser`,
//       // url: `http://localhost:3000/reguser`,
//       data: profile,
//       headers,
//     })
//     // console.log('res :>> ', res)
//     return res
//   } catch (e) {
//     console.log('getAuthUser Error:\n', e)
//     return e
//   }
// }

// export const startTheGame = async (userId, token) => {
//   console.log('startTheGame userId :>> ', userId)
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       console.log('startTheGame :>> ')
//       // return { success: false, error: 'startTheGame error!' }
//       return res({ success: true, data: startedUser })
//     }, 2000)
//   })
// }

// export const answerTheQuestion = async (userId, questionId, answer, token) => {
//   console.log('answerTheQuestion answer :>> ', { userId, answer })
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       // return res({
//       //   success: false,
//       //   error: 'answerTheQuestion error!',
//       // })
//       // return res({
//       //   success: true,
//       //   data: { id: questionId, isDone: false, faults: [1637378672350, 1637379456350, Date.now()] },
//       // })
//       return res({
//         success: true,
//         data: { id: questionId, isDone: 1637649872353, faults: [1637378672350, Date.now()] },
//       })
//     }, 2000)
//   })
// }

// export const getAuthUser = async (token, userAuthId) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/.netlify/functions/getAuthUser',
//       data: {
//         userAuthId: userAuthId,
//       },
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     return res.data
//   } catch (e) {
//     console.log('getAuthUser Error:\n', e.message)
//     return e.message
//   }
// }

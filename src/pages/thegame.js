import React, { useState, useEffect } from 'react'
import { graphql, Link, navigate } from 'gatsby'
// import { Router, Link, Default } from '@reach/router'
import { useAuth } from 'gatsby-theme-auth0'
import QuestionItem from '../components/QuestionItem'
import { userObjectBeforeStart, startedUser } from '../data'

const isBrowser = typeof window !== 'undefined'

const handleRegUser = async (profile) => {
  console.log('handleRegUser profile :>> ', profile)
  return { success: true, data: userObjectBeforeStart }
}

const handleStartTheGame = async (userId) => {
  console.log('handleStartTheGame userId :>> ', userId)
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('handleStartTheGame :>> ')
      return res({ success: true, data: startedUser })
    }, 2000)
  })
}

const handleAnswer = async (userId, questionId, answer) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('handleAnswer answer :>> ', answer)
      // return res({
      //   success: true,
      //   data: { id: questionId, isDone: false, faults: [1637378672350, 1637378672388, Date.now()] },
      // })
      return res({
        success: true,
        data: { id: questionId, isDone: true, faults: [1637378672350, Date.now()] },
      })
    }, 2000)
  })
}

const TheGame = (props) => {
  // console.log('TheGame props :>> ', props)
  const { isLoading, isLoggedIn, profile } = useAuth()

  const [userInfo, setUserInfo] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [isStartLoading, setIsStartLoading] = useState(false)
  const [isAnswerLoading, setIsAnswerLoading] = useState(false)

  const handleStart = async () => {
    try {
      setIsStartLoading(true)
      const response = await handleStartTheGame(userInfo.id)
      if (response.success) {
        if (response.data.currentQuestions) {
          setQuestions(response.data.currentQuestions)
        }

        const { id, name, startTime } = response.data
        setUserInfo({ id, name, startTime })
        setIsStartLoading(false)
      }
    } catch (e) {
      setIsStartLoading(false)
      console.log('handleStart error catch :>> ', e)
    }
  }

  const handleSendAnswer = async (questionId, answer) => {
    try {
      setIsAnswerLoading(true)
      const result = await handleAnswer(userInfo.id, questionId, answer)
      if (result.success) {
        questions.map((question) => {
          if (question.id === result.data.id) {
            if (!question.isDone) {
              question.faults = result.data.faults
            }
            question.isDone = result.data.isDone
          }
          return question
        })
        setQuestions([...questions])
      }
      setIsAnswerLoading(false)
    } catch (e) {
      setIsAnswerLoading(false)
      console.log('handleSendAnswer error catch :>> ', e)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (profile) {
          const regUser = await handleRegUser(profile)
          if (regUser.success) {
            const { id, name, startTime } = regUser.data
            if (regUser.data.startTime) {
              setQuestions(regUser.data.currentQuestions)
            }
            setUserInfo({
              id,
              name,
              startTime,
            })
          } else {
            console.log('regUser.error :>> ', regUser.error)
          }
        }
      } catch (e) {
        console.log('user update error :>> ', e)
      }
    })()
  }, [profile])

  // useEffect(() => {
  //   console.log('questions :>> ', questions)
  // }, [questions])

  // useEffect(() => {
  //   console.log('userInfo :>> ', userInfo)
  // }, [userInfo])

  if (!isBrowser || !isLoggedIn || window.location.pathname !== `/thegame`) {
    navigate(`/`)
    return null
  }

  return userInfo ? (
    <div className='game-inner'>
      {isLoading && <div className='loading-block global'>loading</div>}
      {isStartLoading && <div className='loading-block starting'>starting</div>}
      {isAnswerLoading && <div className='loading-block answering'>answering</div>}
      <h2>The Game Page</h2>
      <h3>{`hello ${userInfo.name}`}</h3>
      {userInfo.startTime ? (
        <>
          <div className='timer'>timer</div>
          {questions &&
            questions.map((question, q) => (
              <QuestionItem key={q} question={question} handleSendAnswer={handleSendAnswer} />
            ))}
        </>
      ) : (
        <button onClick={handleStart}>lets start</button>
      )}
    </div>
  ) : (
    <h2>loadinggg..</h2>
  )
}

export default TheGame

// export const query = graphql`
//   {
//     site {
//       buildTime(formatString: "YYYY-MM-DD hh:mm a z")
//       siteMetadata {
//         name
//         tagline
//       }
//     }
//   }
// `

import React, { useState, useEffect, useContext } from 'react'
import { UserGettersContext, UserSettersContext } from '../context/userContext'
import { navigate } from 'gatsby'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import QuestionItem from '../components/QuestionItem'
import axios from 'axios'
const isBrowser = typeof window !== 'undefined'

const TheGame = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0()

  const { token, userInfo, questions } = useContext(UserGettersContext)
  const { setToken, setUserInfo, setQuestions } = useContext(UserSettersContext)

  const [gameInfo, setGameInfo] = useState(null)
  const [isStartLoading, setIsStartLoading] = useState(false)
  const [isAnswerLoading, setIsAnswerLoading] = useState(false)

  const headers = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': GATSBY_SERVER_URL,
    Authorization: `Bearer ${token}`,
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log('userInfo :>> ', userInfo)
  //   }
  // }, [userInfo])

  const handleAnswer = async (questionId, userInput) => {
    console.log('questionId, userInput :>> ', questionId, userInput)
    setIsStartLoading(true)

    try {
    } catch (err) {
      console.log('err :>> ', err)
    }

    const res = await axios({
      method: 'POST',
      url: `/api/answerTheQuestion`,
      data: { userId: userInfo.id, questionId, userInput },
      headers,
    })
    console.log('res :>> ', res)
    if (res.data.success) {
      setGameInfo(res.data.data)
    } else {
      console.log('res.error :>> ', res.data.error)
    }
    setIsStartLoading(false)
  }

  const handleStart = async () => {
    try {
      setIsStartLoading(true)
      const startedGame = await axios({
        method: 'POST',
        url: `/api/startTheGame`,
        data: userInfo.id,
        headers,
      })
      if (startedGame.data.success) {
        setGameInfo(startedGame.data.data)
        setIsStartLoading(false)
      } else {
        setIsStartLoading(false)
      }
    } catch (e) {
      setIsStartLoading(false)
      console.log('handleStart error catch :>> ', e)
    }
  }

  useEffect(() => {
    if (!isBrowser || !isAuthenticated) {
      console.log('window.location.pathname :>> ', window.location.pathname)
      console.log('\n\nredirect :>>\n\n')
      navigate(`/`)
      return null
    }
  })

  useEffect(() => {
    ;(async () => {
      try {
        setIsStartLoading(true)
        if (!token) {
          const _token = await getAccessTokenSilently({
            audience: process.env.GATSBY_AUTH0_JWT_AUDIENCE,
            scope: process.env.GATSBY_AUTH0_SCOPE,
          })
          setToken(_token)
        } else {
          if (!userInfo) {
            const res = await axios({
              method: 'POST',
              url: `/api/registerUser`,
              data: user,
              headers,
            })
            if (res.data.success) {
              setUserInfo(res.data.data)
            } else {
              console.log('res.data.error :>> ', res.data.error)
              navigate('/')
            }
          } else {
            if (userInfo.currentGame) {
              setGameInfo(userInfo.currentGame)
            }
          }
        }
        setIsStartLoading(false)
      } catch (e) {
        console.log('user update error :>> ', e)
        setIsStartLoading(false)
      }
    })()
  }, [token, userInfo])

  return (
    <div className='game-inner'>
      {isLoading && <div className='loading-block global'>loading</div>}
      {isStartLoading && <div className='loading-block starting'>starting</div>}
      {isAnswerLoading && <div className='loading-block answering'>answering</div>}
      <h2>The Game Page</h2>
      {!userInfo ? (
        <div className='loading-block global'>loading</div>
      ) : (
        <>
          <h3>{`hello ${userInfo.name}`}</h3>

          {gameInfo ? (
            <>
              <div className='timer'>
                <p>{`Start time: ${gameInfo.startTime}`}</p>
              </div>
              {gameInfo.questions?.length && (
                <div className='questions-list'>
                  {gameInfo.questions.map((question, q) => (
                    <QuestionItem
                      kiddy={gameInfo.kiddy}
                      question={question}
                      key={q}
                      index={q + 1}
                      setIsLoading={setIsAnswerLoading}
                      handleAnswer={handleAnswer}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <button disabled={isLoading || isStartLoading} onClick={handleStart}>
              lets start
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default withAuthenticationRequired(TheGame)

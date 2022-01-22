import React, { useState, useEffect, useContext } from 'react'
import { UserGettersContext, UserSettersContext } from '../context/userContext'
import { navigate } from 'gatsby'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import QuestionItem from '../components/QuestionItem'
import { registerUser, startTheGame, answerTheQuestion } from '../utils/lib'
import axios from 'axios'
const isBrowser = typeof window !== 'undefined'

const TheGame = (props) => {
  // console.log('TheGame props :>> ', props)
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

  // const [userInfo, setUserInfo] = useState(null)

  // const [questions, setQuestions] = useState(null)
  const [isStartLoading, setIsStartLoading] = useState(false)
  const [isAnswerLoading, setIsAnswerLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.GATSBY_AUTH0_JWT_AUDIENCE,
            scope: process.env.GATSBY_AUTH0_SCOPE,
          })
          // console.log('accessToken :>> ', accessToken)

          if (accessToken) {
            // const regUser = await registerUser(user, accessToken)

            const res = await axios({
              method: 'POST',
              url: `/api/registerUser`,
              // url: `http://localhost:3000/reguser`,
              data: user,
              headers,
            })
            // console.log('res :>> ', res)
            // return res

            console.log('registerUser ResponCe :>> ', res)
          }

          // if (regUser.success) {
          //   const { id, name, startTime, questions } = regUser.data
          //   if (startTime) {
          //     setQuestions(questions)
          //   }
          //   setUserInfo({
          //     id,
          //     name,
          //     startTime,
          //   })
          // } else {
          //   console.log('regUser.error :>> ', regUser.error)
          // }
        }
      } catch (e) {
        console.log('user update error :>> ', e)
      }
    })()
  }, [user])

  const handleStart = async () => {
    try {
      setIsStartLoading(true)
      const response = await startTheGame(userInfo.id)
      if (response.success) {
        if (response.data.questions) {
          setQuestions(response.data.questions)
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

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       setIsLoadingGlobal(true)
  //       if (!token) {
  //         const accessToken = await getAccessTokenSilently({
  //           audience: process.env.GATSBY_AUTH0_JWT_AUDIENCE,
  //           scope: GATSBY_AUTH0_SCOPE,
  //         })
  //         setToken(accessToken)
  //       } else {
  //         const authUserData = await getAuthUser(token, user.sub)
  //         if (authUserData.success) {
  //           setUserId(authUserData.data)
  //           const userData = await getUser(token, authUserData.data)
  //           if (userData.success) {
  //             setUserObject(userData.data)
  //             setIsLoadingGlobal(false)
  //           } else {
  //             ntfErrorRefresh(smthWrong.error)
  //           }
  //         } else {
  //           if (authUserData.error === noUserMsg) {
  //             const { name, nickname, given_name, family_name, email, sub } = user
  //             const userName =
  //               name || nickname || given_name || family_name || email || 'noname user'
  //             const newUser = await createUser(token, sub, userName, email)
  //             if (newUser.success) {
  //               const userData = await getUser(token, newUser.data)
  //               if (userData.success) {
  //                 setUserObject(userData.data)
  //                 setIsLoadingGlobal(false)
  //               } else {
  //                 ntfErrorRefresh(userData.error)
  //               }
  //             } else {
  //               ntfErrorRefresh(newUser.error)
  //             }
  //           } else {
  //             ntfErrorRefresh(authUserData.error)
  //           }
  //         }
  //       }
  //     } catch (e) {
  //       ntfErrorRefresh(e.message, 'getMenu error')
  //       console.log('getMenu Error:\n', e.message)
  //     }
  //   })()
  //   // eslint-disable-next-line
  // }, [token])

  // //////////

  // useEffect(() => {
  //   console.log('questions :>> ', questions)
  // }, [questions])

  // useEffect(() => {
  //   console.log('userInfo :>> ', userInfo)
  // }, [userInfo])

  if (!isBrowser || !isAuthenticated || window.location.pathname !== `/thegame`) {
    navigate(`/`)
    return null
  }

  return (
    <div className='game-inner'>
      {isLoading && <div className='loading-block global'>loading</div>}
      {isStartLoading && <div className='loading-block starting'>starting</div>}
      {isAnswerLoading && <div className='loading-block answering'>answering</div>}
      <h2>The Game Page</h2>
      {userInfo && (
        <>
          <h3>{`hello ${userInfo.name}`}</h3>
          {userInfo.startTime ? (
            <>
              <div className='timer'>timer</div>
              {questions && (
                <div className='questions-list'>
                  {questions.map((question, q) => (
                    <QuestionItem
                      key={q}
                      index={q + 1}
                      questionId={question.id}
                      setIsAnswerLoading={setIsAnswerLoading}
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
  // ) : (
  //   <h2>the game page is loading..</h2>
  // )
}

export default withAuthenticationRequired(TheGame)

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

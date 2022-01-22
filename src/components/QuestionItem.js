import React, { useState, useEffect, useMemo, useContext } from 'react'
import { UserGettersContext, UserSettersContext } from '../context/userContext'
import { answerTheQuestion } from '../utils/lib'

const QuestionItem = ({ index, questionId, setIsAnswerLoading }) => {
  const { userInfo, questions } = useContext(UserGettersContext)
  const { setUserInfo, setQuestions } = useContext(UserSettersContext)

  const [questionInfo, setQuestionInfo] = useState(questions.find((item) => item.id === questionId))

  useEffect(() => {
    if (questions) {
      setQuestionInfo(questions.find((item) => item.id === questionId))
    }
  }, [userInfo])

  const handleSendAnswer = async (userId, _questionId, answer) => {
    try {
      setIsAnswerLoading(true)
      const result = await answerTheQuestion(userId, _questionId, answer)
      if (result.success) {
        const _questions = questions.map((question) => {
          if (question.id === result.data.id) {
            question.faults = result.data.faults
            question.isDone = result.data.isDone
            // if (!result.data.isDone) {
            // } else {
            // }
          }
          return question
        })
        setQuestions(_questions)
      } else {
        console.log('handleSendAnswer error at answering time :>> ')
      }
      setIsAnswerLoading(false)
    } catch (e) {
      setIsAnswerLoading(false)
      console.log('handleSendAnswer error catch :>> ', e)
    }
  }

  const { id, text, isDone, faults } = questionInfo

  return questionInfo ? (
    <div
      className={`question-item${
        faults.length > 2 ? ' disabled' : isDone ? ' done' : ' in-progress'
      }`}
    >
      <>
        <div className='content-block'>
          <h3>{`# ${index}`}</h3>
          <div className='question-content'>{text}</div>
        </div>
        <div className='control-block'>
          <div className='status'>
            status:
            <br />
            {faults.length > 2 ? 'fault' : isDone ? `done in ${isDone}` : 'in progress'}
          </div>
          <div className='try-answer'>
            <button
              disabled={faults.length > 2 || isDone}
              onClick={() => {
                handleSendAnswer(userInfo.id, questionId, 'myTestAnswer')
              }}
            >
              {faults.length > 2 ? 'failed' : isDone ? 'awesome' : 'try'}
            </button>
          </div>
          <div className='errors'>{`Errors: ${faults.length}`}</div>
        </div>
        {/* {faults && (
            {faults.map((fault, f) => (
              <p key={f} className='fault-item'>
                error at: {fault}
              </p>
            ))}
        )} */}
      </>
    </div>
  ) : null
}

export default QuestionItem

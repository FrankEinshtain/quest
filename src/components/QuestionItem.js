import React, { useState, useEffect, useMemo, useContext } from 'react'
import { UserGettersContext, UserSettersContext } from '../context/userContext'
import { answerTheQuestion } from '../utils/lib'

const AnswerForm = ({ questionId, handleAnswer, handleClose }) => {
  const [userInput, setUserInput] = useState('')
  return (
    <div className='answer-form-container'>
      <div className='inner'>
        <input
          placeholder='please type answer'
          defaultValue={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={() => {
            handleAnswer(questionId, userInput)
            handleClose(false)
          }}
        >
          send
        </button>
        <button
          onClick={() => {
            handleClose(false)
          }}
        >
          cancel
        </button>
      </div>
    </div>
  )
}

const QuestionItem = ({ kiddy, question, index, setIsLoading, handleAnswer }) => {
  const { id, text, answerType, isDone, faults } = question
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState(false)

  return (
    <>
      {isAnswerFormOpen && (
        <AnswerForm questionId={id} handleAnswer={handleAnswer} handleClose={setIsAnswerFormOpen} />
      )}
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
                  setIsAnswerFormOpen(true)
                }}
              >
                {faults.length > 2 ? 'failed' : isDone ? 'awesome' : 'try'}
              </button>
            </div>
            <div className='errors'>{`Errors: ${faults.length}`}</div>
          </div>
        </>
      </div>
    </>
  )
}

export default QuestionItem

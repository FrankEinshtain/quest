import React, { useState, useEffect, useMemo } from 'react'

const QuestionItem = ({ question, handleSendAnswer }) => {
  console.log('QuestionItem question.id :>> ', question.id)
  const { id, isDone, faults } = question

  const handleAnswer = () => {
    handleSendAnswer(id, 'myTestAnswer')
  }

  return (
    <div
      className={`question-item ${isDone ? 'done' : 'in-progress'}${
        faults.length > 2 ? ' disabled' : ''
      }`}
    >
      {faults && (
        <div className='faults-container'>
          {faults.map((fault, f) => (
            <p key={f} className='fault-item'>
              error: {fault}
            </p>
          ))}
        </div>
      )}
      <div className='question-content'>{question.text}</div>
      {!isDone && (
        <button disabled={faults.length > 2} onClick={handleAnswer}>
          try
        </button>
      )}
    </div>
  )
}

export default QuestionItem

import React, { useState } from 'react';
//Components
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API'
import { GlobalStyle, Wrapper } from "./App.styles"

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
}

function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(10, Difficulty.EASY)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false)
  }
  //function checkAnswer(e: React.MouseEvent<HTMLButtonElement>){
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answer from the mouseEvent
      const answer = e.currentTarget.value
      const correct_answer = questions[number].correct_answer
      const correct = (answer === correct_answer)
      console.log(answer)
      console.log(correct_answer)
      if (correct) {
        setScore(score + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correct_answer
      }
      setUserAnswer((previousValue) => [...previousValue, answerObject]) //Previous value refers to previous user answers
      console.log(userAnswer)
      //Check for answer
      // questions[]
    }
  }
  function nextQuestion() {
    setNumber(number + 1)
    if (number === 10) {
      setGameOver(true)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswer.length === 10 ? (
          <button className="start" onClick={startTrivia}>Start</button>
        ) : null}

        {!gameOver ? (
          <p className="score">Score : {score}</p>
        ) : null}
        {/* {loading?<p>Loading questions...</p>:null} */}
        {loading && <p>Loading questions...</p>}
        {!loading && !gameOver ? (<QuestionCard
          questionNumber={number + 1}
          totalQuestions={10}
          answers={questions[number].answers}
          question={questions[number].question}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />) : null}
        {!loading && !gameOver && (userAnswer.length === number + 1) && !(number === 9) && <button className="next" onClick={nextQuestion}>Next Question</button>}
      </Wrapper>
    </>
  );
}

export default App;

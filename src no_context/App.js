import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30; //number of seconds per question

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentQuestion: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "restart":
      return {
        ...state,
        status: "active",
        currentQuestion: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestion);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsNum = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(function () {
    fetch("./questions.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionsNum={questionsNum}
              currentQuestion={currentQuestion}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestion={currentQuestion}
                questionsNum={questionsNum}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

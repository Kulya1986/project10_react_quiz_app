import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, currentQuestion, questions } = useQuiz();

  if (answer === null) return null;

  if (currentQuestion < questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (currentQuestion === questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;

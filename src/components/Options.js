import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, currentQuestion, answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions[currentQuestion].options.map((option, index) => (
        <button
          className={`btn btn-option ${
            hasAnswered
              ? index === questions[currentQuestion].correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${index === answer ? "answer" : ""} `}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

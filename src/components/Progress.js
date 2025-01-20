import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { currentQuestion, questions, points, answer } = useQuiz();

  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={currentQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;

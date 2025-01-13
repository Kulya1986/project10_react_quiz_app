function Progress({
  currentQuestion,
  questionsNum,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={questionsNum}
        value={currentQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questionsNum}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;

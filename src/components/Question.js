import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, currentQuestion } = useQuiz();
  return (
    <div>
      <h4>{questions[currentQuestion].question}</h4>
      <Options />
    </div>
  );
}

export default Question;

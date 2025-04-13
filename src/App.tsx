import { useEffect, useState } from "react";
import { useQuizQuestions } from "./hooks/useQuizQuestions";
import ResultScreen from "./components/ResultScreen";
import QuestionScreen from "./components/QuestionScreen";

type AnswerRecord = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};

function App() {
  const { questions, loading, fetchQuestions } = useQuizQuestions();
  const [currentQn, setCurrentQn] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (answer: string) => {
    const current = questions[currentQn];
    const isCorrect = answer === current.correct_answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        userAnswer: answer,
        correctAnswer: current.correct_answer,
      },
    ]);

    const nextQ = currentQn + 1;
    if (nextQ < questions.length) {
      setCurrentQn(nextQ);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    fetchQuestions();
    setCurrentQn(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcefe7] p-4">
      <h1 className="text-3xl font-bold text-[#f49c7f] mb-6">React Quiz App</h1>
      {loading || questions.length === 0 ? (
        <div className="text-center mt-10">Loading...</div>
      ) : showResult ? (
        <ResultScreen
          answers={userAnswers}
          score={score}
          total={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        <QuestionScreen
          question={questions[currentQn].question}
          answers={questions[currentQn].answers}
          questionNumber={currentQn + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;

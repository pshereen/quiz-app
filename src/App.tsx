import { useEffect, useState } from "react";
import { useQuizQuestions } from "./hooks/useQuizQuestions";
import ResultScreen from "./components/ResultScreen";
import QuestionScreen from "./components/QuestionScreen";
import BannerImage from './assets/did-you-know-transparent.png';

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

  const [category, setCategory] = useState("9"); 
  const [difficulty, setDifficulty] = useState("easy");
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      fetchQuestions(parseInt(category), difficulty);
    }
  }, [quizStarted]);

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
    setQuizStarted(false);
    fetchQuestions(parseInt(category), difficulty);
    setCurrentQn(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center bg-[#fcefe7] pt-4 px-4 min-h-screen">
      <img
        src={BannerImage}
        alt="Quiz Banner"
        className="w-full max-w-4xl h-40 object-contain"
      />

      {!quizStarted ? (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Start Your Quiz</h2>
          <div className="flex flex-col items-center gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="9">General Knowledge</option>
              <option value="17">Science & Nature</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={() => setQuizStarted(true)}
              className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : loading || questions.length === 0 ? (
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

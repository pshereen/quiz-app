import React from "react";

type AnswerRecord = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};

type Props = {
  answers: AnswerRecord[];
  score: number;
  total: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({ answers, score, total, onPlayAgain }: Props) {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-2xl">
      <div className="space-y-2">
        {answers.map((ans, idx) => {
          const isCorrect = ans.userAnswer === ans.correctAnswer;
          return (
            <div key={idx} className="p-2 border rounded-md">
              <p
                className="font-medium mb-1 text-sm"
                dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${ans.question}` }}
              />
              <p className={`text-sm ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                {ans.userAnswer}
                {!isCorrect && (
                  <span className="text-green-600"> ({ans.correctAnswer})</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Score + Play Again button row */}
      <div className="mt-6 flex justify-center space-x-4">
        <div>
        <span className="inline-block bg-[#f49c7f] text-white font-medium px-4 py-2 rounded-lg shadow-md">
          Your Score: {score}/{total}
        </span>
        </div>
        <button
          onClick={onPlayAgain}
          className="px-4 py-2 bg-[#f49c7f] hover:bg-[#e28b6f] text-white font-medium rounded-lg shadow-md"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

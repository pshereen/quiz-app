import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
};

export default function QuestionCard({
  question,
  answers,
  callback,
  questionNumber,
  totalQuestions,
}: Props) {
  return (
    <div
      key={questionNumber} // This forces remount to re-trigger animation on question change
      className="w-full max-w-xl flex flex-col items-center space-y-6"
    >
      {/* Question Card */}
      <div className="bg-white px-6 py-8 w-full rounded-[10px] rounded-tr-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.1),-4px_4px_20px_rgba(0,0,0,0.08)]">
        <div className="mb-4">
          <div className="w-full bg-gray-300 h-1 rounded-full mb-3">
            <div
              className="bg-[#e28b6f] h-1 rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            {questionNumber} / {totalQuestions}
          </p>
        </div>
        <p
          className="text-lg font-semibold text-center text-[#4b4b4b]"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      {/* Answer choices with custom CSS slide animation */}
      <div className="w-full space-y-3">
        {answers.map((answer, idx) => (
          <button
            key={idx}
            className={`w-full bg-[#f49c7f] hover:bg-[#e28b6f] text-white font-medium py-3 px-4 rounded-lg shadow-md 
              transform opacity-0 animate-slide-up`}
            style={{
              animationDelay: `${idx * 120}ms`,
              animationFillMode: "forwards",
            }}
            onClick={() => callback(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
}

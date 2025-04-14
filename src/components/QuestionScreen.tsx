import React from "react";
import QuestionCard from "./QuestionCard";

type Props = {
  question: string;
  answers: string[];
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
};

export default function QuestionScreen({
  question,
  answers,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl">

      <QuestionCard
  question={question}
  answers={answers}
  callback={onAnswer}
  questionNumber={questionNumber}
  totalQuestions={totalQuestions}
/>
    </div>
  );
}

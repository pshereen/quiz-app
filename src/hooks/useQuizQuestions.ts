// src/hooks/useQuizQuestions.ts
import { useState, useCallback } from "react";
import { Question, QuizQuestion } from "../types";

export function useQuizQuestions() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple");
    const data = await res.json();

    const formatted: QuizQuestion[] = data.results.map((q: Question) => ({
      ...q,
      answers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
    }));

    setQuestions(formatted);
    setLoading(false);
  }, []);

  return {
    questions,
    loading,
    fetchQuestions,
    setQuestions,
  };
}

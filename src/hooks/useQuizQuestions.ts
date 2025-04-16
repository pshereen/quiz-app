import { useState } from "react";
import { Question, QuizQuestion } from "../types";

export function useQuizQuestions() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const fetchQuestions = async (
    category: number = 9,
    difficulty: string = "easy"
  ): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();
  
      const formatted: QuizQuestion[] = data.results.map((q: Question) => ({
        ...q,
        answers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
      }));
  
      setQuestions(formatted);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };
  

  return {
    questions,
    loading,
    fetchQuestions,
    setQuestions,
  };
}


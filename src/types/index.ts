export type Question = {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
  
  export type QuizQuestion = Question & {
    answers: string[];
  };
  
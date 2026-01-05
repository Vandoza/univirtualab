import { integralQuestionBank, IntegralQuestion } from "../constants/integralQuestionBank";

export interface IntegralQuizState {
  question: IntegralQuestion;
  selectedPieces: string[];
  remainingPieces: string[];
  isSubmitted: boolean;
}

export function createIntegralQuiz(): IntegralQuizState {
  const question =
    integralQuestionBank[
      Math.floor(Math.random() * integralQuestionBank.length)
    ];

  return {
    question,
    selectedPieces: [],
    remainingPieces: [...question.pieces],
    isSubmitted: false
  };
}

export function selectPiece(
  state: IntegralQuizState,
  piece: string
): IntegralQuizState {
  if (state.isSubmitted) return state;
  if (!state.remainingPieces.includes(piece)) return state;

  return {
    ...state,
    selectedPieces: [...state.selectedPieces, piece],
    remainingPieces: state.remainingPieces.filter(p => p !== piece)
  };
}

export function removePiece(
  state: IntegralQuizState,
  index: number
): IntegralQuizState {
  if (state.isSubmitted) return state;
  if (index < 0 || index >= state.selectedPieces.length) return state;

  const piece = state.selectedPieces[index];

  return {
    ...state,
    selectedPieces: state.selectedPieces.filter((_, i) => i !== index),
    remainingPieces: [...state.remainingPieces, piece]
  };
}

export function isComplete(state: IntegralQuizState): boolean {
  return (
    state.selectedPieces.length ===
    state.question.correctOrder.length
  );
}

export function submitQuiz(state: IntegralQuizState): IntegralQuizState {
  if (!isComplete(state)) return state;
  return { ...state, isSubmitted: true };
}

export function isCorrect(state: IntegralQuizState): boolean {
  if (!state.isSubmitted) return false;

  return (
    JSON.stringify(state.selectedPieces) ===
    JSON.stringify(state.question.correctOrder)
  );
}

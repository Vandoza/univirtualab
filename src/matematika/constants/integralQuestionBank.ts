export interface IntegralQuestion {
  id: string;
  question: string;
  pieces: string[];
  correctOrder: string[];
}

export const integralQuestionBank: IntegralQuestion[] = [
  {
    id: "DI1",
    question: "∫ .... dx = .... + C",
    pieces: ["x", "ln(x)", "1/x"],
    correctOrder: ["1/x", "ln(x)"]
  },
  {  
    id: "DI2",
    question: "∫ .... dx = .... + C",
    pieces: ["x", "x²/2", "ln|x|"],
    correctOrder: ["x", "x²/2"]
  },
  {
    id: "DI3",
    question: "∫ .... dx = .... + C",
    pieces: ["sec(x)", "sin(x)", "-cos(x)"],
    correctOrder: ["sin(x)", "-cos(x)"]
  },
  {
    id: "DI4",
    question: "∫ .... dx = .... + C",
    pieces: ["3", "3x", "3/x", "0"],
    correctOrder: ["3", "3x"]
  }
];

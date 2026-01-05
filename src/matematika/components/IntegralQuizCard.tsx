import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {
  createIntegralQuiz,
  selectPiece,
  removePiece,
  submitQuiz,
  isComplete,
  isCorrect,
  IntegralQuizState
} from "../logic/integralQuiz";

import { IntegralPiece } from "./IntegralPiece";
import { IntegralSlot } from "./IntegralSlot";
import { mathUI } from "../constants/mathUI";

export const IntegralQuizCard: React.FC = () => {
  const [quiz, setQuiz] = useState<IntegralQuizState>(() =>
    createIntegralQuiz()
  );

  const slotCount = quiz.question.correctOrder.length;
  const filledSlots = quiz.selectedPieces.length;

  return (
    <View style={mathUI.card}>
      <Text style={mathUI.title}>Kuis Integral</Text>

      <View style={mathUI.inlineQuestion}>
        <Text style={mathUI.questionText}>∫ </Text>

        <IntegralSlot
          value={quiz.selectedPieces[0]}
          locked={quiz.isSubmitted}
          onPress={() =>
            quiz.selectedPieces[0] &&
            setQuiz(q => removePiece(q, 0))
          }
        />

        <Text style={mathUI.questionText}> dx = </Text>

        <IntegralSlot
          value={quiz.selectedPieces[1]}
          locked={quiz.isSubmitted}
          onPress={() =>
            quiz.selectedPieces[1] &&
            setQuiz(q => removePiece(q, 1))
          }
        />

        <Text style={mathUI.questionText}> + C</Text>
      </View>

      <View style={mathUI.pieceContainer}>
        {quiz.remainingPieces.map(piece => (
          <IntegralPiece
            key={piece}
            label={piece}
            disabled={quiz.isSubmitted}
            onPress={() =>
              setQuiz(q => selectPiece(q, piece))
            }
          />
        ))}
      </View>

      {!quiz.isSubmitted ? (
        <TouchableOpacity
          style={[
            mathUI.button,
            !isComplete(quiz) && mathUI.buttonDisabled
          ]}
          disabled={!isComplete(quiz)}
          onPress={() => setQuiz(q => submitQuiz(q))}
        >
          <Text style={mathUI.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <>
          {isCorrect(quiz) ? (
            <Text style={[mathUI.resultText, mathUI.correct]}>
              Jawaban benar 🎉
            </Text>
          ) : (
            <View>
              <Text style={[mathUI.resultText, mathUI.incorrect]}>
                Salah ❌
              </Text>
              <Text style={[mathUI.resultText, mathUI.correct]}>
                Jawaban: {quiz.question.correctOrder.join(", ")}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={mathUI.button}
            onPress={() => setQuiz(createIntegralQuiz())}
          >
            <Text style={mathUI.buttonText}>Quiz Again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

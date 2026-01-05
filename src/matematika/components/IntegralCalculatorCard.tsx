import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import {
  parseInput,
  parseOutput,
  solveIndefiniteIntegral
} from "../logic/integralSolver";

import { numericIntegration } from "../logic/numericIntegration";
import { mathUI } from "../constants/mathUI";

export const IntegralCalculatorCard: React.FC = () => {
  const [func, setFunc] = useState("");
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");

  const [symbolicResult, setSymbolicResult] = useState<string | null>(null);
  const [numericResult, setNumericResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setSymbolicResult(null);
    setNumericResult(null);

    if (!func.trim()) {
      setError("Function tidak boleh kosong.");
      return;
    }

    const parsedFunc = parseInput(func);

    const symbolic = solveIndefiniteIntegral(parsedFunc);
    if (symbolic?.result) {
      setSymbolicResult(
        `∫ ${func} dx = ${parseOutput(symbolic.result)} + C`
      );
    }

    if (lower !== "" && upper !== "") {
      const a = Number(lower);
      const b = Number(upper);

      if (isNaN(a) || isNaN(b)) {
        setError("Batas integral harus berupa angka.");
        return;
      }

      const numeric = numericIntegration(parsedFunc, a, b);

      if (numeric === "Divergent") {
        setNumericResult(
          `∫ ${func} dx dari ${lower} ke ${upper} = Integral divergen`
        );
      } else if (numeric === "Undefined") {
        setNumericResult(
          `∫ ${func} dx dari ${lower} ke ${upper} = Integral tidak terdefinisi`
        );
      } else {
        setNumericResult(
          `∫ ${func} dx dari ${lower} ke ${upper} = ${numeric}`
        );
      }
    }
  };

  return (
    <View style={mathUI.card}>
      <Text style={mathUI.title}>Kalkulator Integral</Text>

      <TextInput
        style={mathUI.input}
        placeholder="f(x), contoh: x^2"
        value={func}
        onChangeText={setFunc}
      />

      {/* <View style={mathUI.row}>
        <TextInput
          style={mathUI.inputSmall}
          placeholder="Lower"
          value={lower}
          onChangeText={setLower}
        />
        <TextInput
          style={mathUI.inputSmall}
          placeholder="Upper"
          value={upper}
          onChangeText={setUpper}
        />
      </View> */}

      <TouchableOpacity style={mathUI.button} onPress={handleCalculate}>
        <Text style={mathUI.buttonText}>Hitung Integral</Text>
      </TouchableOpacity>

      {symbolicResult && (
        <Text style={mathUI.resultText}>{symbolicResult}</Text>
      )}

      {/* {numericResult && (
        <Text style={mathUI.resultText}>{numericResult}</Text>
      )} */}

      {error && (
        <Text style={[mathUI.resultText, mathUI.incorrect]}>
          {error}
        </Text>
      )}
    </View>
  );
};

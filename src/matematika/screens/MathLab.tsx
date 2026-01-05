import React from "react";
import { ScrollView, Text, View } from "react-native";

import { IntegralQuizCard } from "../components/IntegralQuizCard";
import { IntegralCalculatorCard } from "../components/IntegralCalculatorCard";
import { mathUI } from "../constants/mathUI";

export default function MathLab() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 0,
        paddingBottom: 32,
        marginTop: 24
      }}
    >
      <View style={mathUI.header}>
        <Text style={mathUI.headerTitle}>
          Virtual Lab Matematika
        </Text>
        <Text style={mathUI.headerSubtitle}>
          Eksplorasi konsep integral melalui kuis interaktif dan kalkulator.
        </Text>
      </View>
      
      <IntegralCalculatorCard />

      <IntegralQuizCard />
    </ScrollView>
  );
}

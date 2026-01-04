import React from "react";
import { Text, View } from "react-native";

export default function MathLab() {
  return (
    <View
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0"
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "900", color: "#0f172a" }}>Praktikum Matematika</Text>
      <Text style={{ marginTop: 8, color: "#475569" }}>
        Placeholder praktikum matematika. Modul dan interaksi praktikum matematika akan dikembangkan di dalam folder
        src/matematika.
      </Text>
    </View>
  );
}

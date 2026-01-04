import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import MathLab from "@/matematika/screens/MathLab";

export default function MatematikaTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#0f172a" }}>Praktikum Matematika</Text>
          <Text style={{ marginTop: 4, color: "#334155" }}>
            Placeholder praktikum matematika. Modul akan dikembangkan oleh tim.
          </Text>
        </View>
        <MathLab />
      </ScrollView>
    </SafeAreaView>
  );
}

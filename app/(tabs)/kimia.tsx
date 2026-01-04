import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import ChemistryLab from "@/kimia/screens/ChemistryLab";

export default function KimiaTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#0f172a" }}>Praktikum Kimia</Text>
          <Text style={{ marginTop: 4, color: "#334155" }}>
            Modul praktikum kimia Univirtualab.
          </Text>
        </View>
        <ChemistryLab />
      </ScrollView>
    </SafeAreaView>
  );
}

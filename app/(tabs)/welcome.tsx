import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "900", color: "#0f172a" }}>Univirtualab</Text>
        <Text style={{ marginTop: 8, fontSize: 16, color: "#334155", textAlign: "center" }}>
          Selamat datang di Univirtualab.
        </Text>
      </View>
    </SafeAreaView>
  );
}


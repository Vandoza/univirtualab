import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function AccountScreen() {
  const { user, signOut, logout } = useAuth() as any;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const fn = signOut ?? logout;
      if (fn) {
        await fn();
      }
      router.replace("/(auth)/login");
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "900", color: "#0f172a" }}>Akun</Text>

        <View
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 18,
            backgroundColor: "#f8fafc",
            borderWidth: 1,
            borderColor: "#e2e8f0"
          }}
        >
          <Text style={{ fontSize: 14, color: "#334155" }}>Masuk sebagai</Text>
          <Text style={{ marginTop: 4, fontSize: 16, fontWeight: "800", color: "#0f172a" }}>
            {user?.email ?? "Pengguna"}
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => ({
              backgroundColor: "#dc2626",
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: "center",
              opacity: pressed ? 0.9 : 1
            })}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

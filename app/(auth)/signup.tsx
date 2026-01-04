import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupScreen() {
  const { signUp } = useAuth() as any;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Pendaftaran gagal", "Semua kolom harus diisi.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Pendaftaran gagal", "Konfirmasi password tidak sama.");
      return;
    }
    try {
      setSubmitting(true);
      if (!signUp) {
        throw new Error("signUp tidak tersedia di AuthContext");
      }
      await signUp(email, password);
      router.replace("/(tabs)/welcome");
    } catch (e: any) {
      console.log("Signup error", e);
      Alert.alert("Pendaftaran gagal", e?.message ?? "Terjadi kesalahan saat mendaftar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c2e6fc" }}>
      <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "900", color: "#0f172a", textAlign: "center" }}>
          Univirtualab
        </Text>
        <Text style={{ marginTop: 4, color: "#475569", textAlign: "center" }}>
          Daftar untuk memulai praktikum.
        </Text>

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
          <Text style={{ fontSize: 14, fontWeight: "800", color: "#0f172a" }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="nama@example.com"
            style={{
              marginTop: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cbd5f5",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: "white",
              color: "#0f172a"
            }}
          />

          <Text style={{ marginTop: 14, fontSize: 14, fontWeight: "800", color: "#0f172a" }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            style={{
              marginTop: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cbd5f5",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: "white",
              color: "#0f172a"
            }}
          />

          <Text style={{ marginTop: 14, fontSize: 14, fontWeight: "800", color: "#0f172a" }}>
            Konfirmasi Password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="••••••••"
            style={{
              marginTop: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#cbd5f5",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: "white",
              color: "#0f172a"
            }}
          />

          <Pressable
            onPress={handleSignup}
            disabled={submitting}
            style={({ pressed }) => ({
              marginTop: 20,
              borderRadius: 14,
              paddingVertical: 12,
              alignItems: "center",
              backgroundColor: submitting ? "#94a3b8" : "#16a34a",
              opacity: pressed && !submitting ? 0.9 : 1
            })}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>
              {submitting ? "Memproses..." : "Daftar"}
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: "#64748b" }}>
            Sudah punya akun?{" "}
            <Link href="/(auth)/login" style={{ color: "#2563eb", fontWeight: "800" }}>
              Masuk
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

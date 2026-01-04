import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        headerStyle: { backgroundColor: "#c2e6fc" },
        headerTitleStyle: { fontWeight: "900", color: "#0f172a" }
      }}
    >
      <Tabs.Screen
        name="welcome"
        options={{
          title: "Welcome",
          tabBarLabel: "Welcome"
        }}
      />
      <Tabs.Screen
        name="kimia"
        options={{
          title: "Praktikum Kimia",
          tabBarLabel: "Kimia"
        }}
      />
      <Tabs.Screen
        name="matematika"
        options={{
          title: "Praktikum Matematika",
          tabBarLabel: "Matematika"
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Progress",
          tabBarLabel: "Progress"
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Akun",
          tabBarLabel: "Akun"
        }}
      />
    </Tabs>
  );
}



import { StyleSheet } from "react-native";

export const mathUI = StyleSheet.create({
  header: {
    marginBottom: 16
  },
  
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0f172a"
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#475569"
  },

  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },

  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 12
  },

  question: {
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 16
  },

  slotRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },

  slot: {
    minWidth: 64,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5f5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },

  slotEmpty: {
    borderStyle: "dashed",
    borderColor: "#94a3b8"
  },

  slotDisabled: {
    opacity: 0.5
  },

  slotText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a"
  },

  slotPlaceholder: {
    fontSize: 16,
    color: "#94a3b8"
  },

  pieceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16
  },

  piece: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#e0f2fe",
    borderWidth: 1,
    borderColor: "#7dd3fc"
  },

  pieceDisabled: {
    opacity: 0.4
  },

  pieceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0369a1"
  },

  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#2563eb",
    alignItems: "center"
  },

  buttonDisabled: {
    backgroundColor: "#94a3b8"
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16
  },

  resultText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "800"
  },

  correct: {
    color: "#16a34a"
  },

  incorrect: {
    color: "#dc2626"
  },

  slotFilled: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff"
  },

  pieceTextDisabled: {
    color: "#94a3b8"
  },

  inlineQuestion: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 12
  },

  questionText: {
    fontSize: 18,
    color: "#0f172a",
    fontWeight: "600"
  },

  input: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: 14,
    color: "#0f172a"
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  },

  inputSmall: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: 14,
    color: "#0f172a"
  }
});

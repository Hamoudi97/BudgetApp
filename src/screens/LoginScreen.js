import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../utils/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      alert(result.error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

    <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => {
            const cleaned = text.replace(/[^a-zA-Z0-9@._-]/g, ""); 
        setEmail(cleaned.toLowerCase());
      }}
      keyboardType="email-address"
    autoCapitalize="none"
  />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#1a73e8",
  },
});
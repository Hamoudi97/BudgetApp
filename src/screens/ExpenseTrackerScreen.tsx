import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet,FlatList,ActivityIndicator, Animated, Easing } from "react-native";
import { ExpenseContext } from "../utils/ExpenseContext";

export default function ExpenseTrackingScreen({ navigation }) {
  const { expenses, addExpense } = useContext(ExpenseContext);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [cadToUsd, setCadToUsd] = useState<number | null>(null);
  const [rateLoading, setRateLoading] = useState(false);

  const scale = new Animated.Value(1);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Parallel
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  //fetch currency rate from cad to usd 
  useEffect(() => {
    const loadRate = async () => {
      try {
        setRateLoading(true);
        const res = await fetch("https://api.frankfurter.app/latest?from=CAD&to=USD");
        const json = await res.json();
        if (json?.rates?.USD) {
          setCadToUsd(Number(json.rates.USD));
        }
      } catch (err) {
        setCadToUsd(null);
      } finally {
        setRateLoading(false);
      }
    };

    loadRate();
  }, []);

  // Sequence
  const handlePress = () => {
    Animated.sequence([
      Animated.delay(50),
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const handleAddExpense = () => {
    if (!amount || !desc || !category) {
      alert("Please fill in all fields including category");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addExpense({ amount, desc, category });
      setAmount("");
      setDesc("");
      setCategory("");
      setLoading(false);
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>Track Your Expenses 💵</Text>
        <Text style={styles.rateText}>
          {rateLoading ? "Loading CAD→USD..." : cadToUsd ? `CAD→USD: ${cadToUsd.toFixed(3)}`: "Could not load CAD→USD"}
        </Text>
      </Animated.View>

      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Food, Transport)"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            handlePress();
            handleAddExpense();
          }}
        >
          <Text style={styles.addText}>Add Expense</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Loading */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#4caf50"
          style={{ marginTop: 10 }}
        />
      )}

      {/* Expenses list */}
      <FlatList
        style={{ marginTop: 20, width: "100%" }}
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Search", { expenseCategory: item.category })}>
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>
                ${item.amount} - {item.category} - {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No expenses yet. Add one above!</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8f5e9",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1b5e20",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  expenseItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },

  expenseText: {
    fontSize: 16,
    color: "#333",
  },

  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  rateText: {
    fontSize: 14,
    color: "#1b5e20",
    marginBottom: 12,
  },
});
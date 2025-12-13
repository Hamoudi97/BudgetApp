import React, {useState, useRef, useEffect } from "react";
import { View,Text,TextInput, TouchableOpacity,StyleSheet,FlatList, ActivityIndicator, Animated, Easing} from "react-native";


export default function ExpenseTrackingScreen() {
  const [amount, setAmount]= useState("");
  const [desc, setDesc] =useState("");
  const [expenses, setExpenses]=useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const scale = new Animated.Value(1);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  //parallel
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

  //sequence
  const handlePress = () => {
    Animated.sequence([
      Animated.delay(50),
      Animated.spring(scale, { toValue:0.9, useNativeDriver: true }),
      Animated.spring(scale, { toValue:1, useNativeDriver: true }),
    ]).start();
  };

  const addExpense=() => {
    if (!amount ||!desc) return;

    setLoading(true);

    setTimeout(() =>{
      setExpenses((prev) => [
        ...prev,
        {id: Date.now().toString(),amount, desc },
      ]);

      setAmount("");
      setDesc("");
      setLoading(false); }, 700); 
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        }],
      }}>
        <Text style={styles.title}>Track Your Expenses 💵</Text>
      </Animated.View>

      <TextInput
        style={styles.input}
        placeholder= "Expense Amount"
        keyboardType = "numeric"
        value= {amount}
        onChangeText={setAmount}
      />

      <TextInput
        style= {styles.input}
        placeholder="Description"
        value ={desc}
        onChangeText={setDesc}
      />

      <Animated.View style={{ transform: [{scale }] }}>
        <TouchableOpacity style={styles.addButton} onPress={() => { handlePress(); addExpense(); }}>
          <Text style={styles.addText}>Add Expense</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Loading */}
      {loading && (
        <ActivityIndicator size="large" color="#4caf50" style={{ marginTop: 10 }} />
      )}

      {/* Expenses list */}
      <FlatList
        style ={{ marginTop: 20, width: "100%" }}
        data = {expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item })=>(
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>${item.amount} - {item.desc}</Text>
          </View>
        )}
      />

      
    </View>
  );
}

const styles =StyleSheet.create({
  container:{ 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#e8f5e9" 
},

  title:{ 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#1b5e20" 
  },

  input:{
    backgroundColor: "#fff",
    padding:12,
    borderRadius:8,
    marginBottom:10,
    borderWidth: 1,
    borderColor:"#ccc",
  },
  addButton:{
    backgroundColor: "#4caf50",
    padding:14,
    borderRadius: 10,
    alignItems:"center",
    marginTop: 10,
  },

  addText: { 
    color:"#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  expenseItem:{
    backgroundColor: "#fff",
    padding:14,
    borderRadius: 8,
    marginBottom: 8,
  },
  
  expenseText:{
    fontSize: 16,
    color: "#333" 
},

});

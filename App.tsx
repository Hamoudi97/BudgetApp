import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { AuthProvider, AuthContext } from "./src/utils/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ExpenseTrackingScreen from "./src/screens/ExpenseTrackerScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import SpendingBreakdown from "./src/screens/SpendingBreakdown";
import SearchFilterScreen from "./src/screens/SearchFilterScreen";
import { ExpenseProvider } from "./src/utils/ExpenseContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CURRENT_USER_ID = "user-123";

// App Info Screen
function AppInfoScreen() {
  return (
    <ScrollView style={styles.infoContainer}>
      <Text style={styles.infoTitle}>Budget App 💰</Text>

      <Text style={styles.sectionTitle}>Purpose</Text>
      <Text style={styles.infoText}>
        This app helps you manage your finances by tracking expenses,
        setting budgets, and analyzing spending patterns.
      </Text>

      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.infoText}>• Track daily expenses</Text>
      <Text style={styles.infoText}>• Set monthly budgets</Text>
      <Text style={styles.infoText}>• Search and filter transactions</Text>
      <Text style={styles.infoText}>• View spending breakdown</Text>
      <Text style={styles.infoText}>• Alerts when over budget</Text>
    </ScrollView>
  );
}

// Bottom Tab Navigation
function MainTabs() {
  const { logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "#999",
        headerStyle: { backgroundColor: "#4caf50" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerRight: () => (
          <Text
            onPress={() => {
              logout();
              navigation.replace("Login");
            }}
            style={{
              marginRight: 15,
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="TrackExpenses"
        component={ExpenseTrackingScreen}
        options={{
          title: "Expense Tracker",
          tabBarLabel: "Expenses",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>💵</Text>,
        }}
      />

      <Tab.Screen
        name="Budget"
        options={{
          title: "Budget",
          tabBarLabel: "Budget",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📊</Text>,
          headerShown: false,
        }}
      >
        {() => <BudgetScreen userId="user-123" />}
      </Tab.Screen>

      <Tab.Screen
        name="Breakdown"
        options={{
          title: "Breakdown",
          tabBarLabel: "Breakdown",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📈</Text>,
          headerShown: false,
        }}
      >
        {() => <SpendingBreakdown userId="user-123" />}
      </Tab.Screen>

      <Tab.Screen
        name="Search"
        component={SearchFilterScreen}
        options={{
          title: "Search & Filter",
          tabBarLabel: "Search",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🔍</Text>,
        }}
      />

      <Tab.Screen
        name="Info"
        component={AppInfoScreen}
        options={{
          title: "App Info",
          tabBarLabel: "Info",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>ℹ️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigation with Auth
function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4caf50" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {user ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    padding: 20,
  },
  infoTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginTop: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
});

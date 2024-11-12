import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import LoginScreen from './LoginScreen'; // Import your LoginScreen

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth(); // Use the Auth context
  const navigation = useNavigation(); // Simple use of navigation hook

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            logout(); // Log the user out
            navigation.navigate('Login'); // Navigate to LoginScreen
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.emailText}>Email: {user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loginPromptText}>Please log in to view your profile.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  emailText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginPromptText: {
    fontSize: 20,
    color: '#777',
  },
});

export default ProfileScreen;

// SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [isButtonPressed, setIsButtonPressed] = useState<string | null>(null);
  const [pressedMessage, setPressedMessage] = useState<string | null>(null);

  const handlePress = (button: string) => {
    setPressedMessage(`${button} button pressed!`);
    setTimeout(() => setPressedMessage(null), 1500); // Clear message after 1.5 seconds
  };

  return (
    <View style={styles.container}>
      

      {/* Change Password Button */}
      <TouchableOpacity
        style={[styles.button, isButtonPressed === 'password' && styles.buttonPressed]}
        onPress={() => handlePress("Change Password")}
        onPressIn={() => setIsButtonPressed('password')}
        onPressOut={() => setIsButtonPressed(null)}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Notifications Button */}
      <TouchableOpacity
        style={[styles.button, isButtonPressed === 'notifications' && styles.buttonPressed]}
        onPress={() => handlePress("Notifications")}
        onPressIn={() => setIsButtonPressed('notifications')}
        onPressOut={() => setIsButtonPressed(null)}
      >
        <Text style={styles.buttonText}>Notifications</Text>
      </TouchableOpacity>

      {/* Display Feedback Message */}
      {pressedMessage && <Text style={styles.feedbackText}>{pressedMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7, // Change opacity on press
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;

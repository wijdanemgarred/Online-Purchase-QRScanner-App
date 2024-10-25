// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Import the type
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// Import your local image
import backgroundImage from '../../assets/bg.jpeg'; // Adjust the path as necessary

// Define TypeScript type for form values
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useAuth(); // Use the Auth context
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial values for the form
  const initialValues: LoginFormValues = { email: '', password: '' };

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMessage('');

    try {
      await login(values.email, values.password); // Call the login function
      navigation.navigate('Home'); // Navigate to Home
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.'); // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
                style={styles.input}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit as any} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.link}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    resizeMode: 'cover', // Cover the screen
  },
  container: {
    width: '90%', // Adjust width
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#cccccc', // Softer border color
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff', // White background for inputs
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff', // Primary color for the button
    borderRadius: 10, // Rounded corners
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;

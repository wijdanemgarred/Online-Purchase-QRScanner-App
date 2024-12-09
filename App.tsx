// App.tsx
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen'; // Adjust the import path as necessary
import HomeScreen from './src/screens/HomeScreen'; // Import your HomeScreen
import ProfileScreen from './src/screens/ProfileScreen'; // Import ProfileScreen
import SettingsScreen from './src/screens/SettingsScreen'; // Import SettingsScreen
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import { CartProvider } from './src/contexts/CartContext';
import { AuthProvider } from './src/contexts/AuthContext';
import CartScreen from './src/screens/CartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide the header for the HomeTabs

        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }} // Hide the header for the HomeTabs
        />
        <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Détails du Produit' }} />
      </Stack.Navigator>



    </NavigationContainer>
    </CartProvider>
    </AuthProvider>
  );
};


// Create the Tab Navigator
const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }}
      />
     
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// LogoutScreen component to handle the logout action
const LogoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Reset to the Login screen
    });
  };

  // Call handleLogout on component mount or provide a button to trigger it
  React.useEffect(() => {
    handleLogout(); // Automatically logout when this screen is focused
  }, []);

  return null; // No UI needed, just handle the navigation
};

export default App;
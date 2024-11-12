import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCart } from '../contexts/CartContext'; // Adjust the path as needed

import A from '../../assets/A.jpg';

type RootStackParamList = {
  ProductDetail: { product: { id: number; name: string; price: number; description: string; image: string } };
};

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart(); // Use the CartContext

  const [quantity, setQuantity] = useState<number>(1);
  const [isPressed, setIsPressed] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity); // Ensure addToCart accepts product and quantity
    Alert.alert("Added to Cart", `${quantity} ${product.name}(s) added to your cart!`);
  };

  return (
    <View style={styles.container}>
      <Image source={A} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button title="+" onPress={() => setQuantity(quantity + 1)} />
      </View>

      {/* Add TouchableOpacity with onPressIn and onPressOut */}
      <TouchableOpacity
        style={[styles.addButton, isPressed && styles.addButtonPressed]}
        onPress={handleAddToCart}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonPressed: {
    backgroundColor: '#0056b3', // Darker shade for pressed state
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;

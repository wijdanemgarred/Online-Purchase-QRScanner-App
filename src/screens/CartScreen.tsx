import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useCart } from '../contexts/CartContext'; // Adjust the path as needed
import Icon from 'react-native-vector-icons/Ionicons'; // Or your preferred icon library


const CartScreen: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Render the delete action when swiped
  const renderRightActions = (productId: number) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeFromCart(productId)}
    >
      <Text style={styles.deleteButtonText}></Text>
      <Icon name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => renderRightActions(item.product.id)}
              >
                <View style={styles.cartItem}>
                  <Text style={styles.productName}>{item.product.name}</Text>
                  <Text style={styles.productDetails}>Quantité: {item.quantity}</Text>
                  <Text style={styles.productDetails}>Prix: ${item.product.price.toFixed(2)}</Text>
                </View>
              </Swipeable>
            )}
          />
          <Text style={styles.totalPrice}>Prix Total: ${totalPrice.toFixed(2)}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  cartItem: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productDetails: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CartScreen;

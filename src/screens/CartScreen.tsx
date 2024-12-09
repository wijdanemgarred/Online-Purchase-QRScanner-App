import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useCart } from '../contexts/CartContext'; // Adjust the path as needed
import Icon from 'react-native-vector-icons/Ionicons'; // Or your preferred icon library
import images from '../utils/images'; // Import the image map

const CartScreen: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const renderRightActions = (productId: number) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeFromCart(productId)}
    >
      <Icon name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
          <Text style={styles.emptyCartSubText}>Commencez vos achats maintenant!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={() => renderRightActions(item.product.id)}>
                <View style={styles.cartItem}>
                  {/* Use image map to get the correct image */}
                  <Image
                    source={images[item.product.imageUrl]} // Reference the image using the product ID
                    style={styles.productImage}
                  />
                  <View style={styles.productDetailsContainer}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.productDetails}>Quantité: {item.quantity}</Text>
                    <Text style={styles.productDetails}>Prix: ${item.product.price.toFixed(2)}</Text>
                  </View>
                </View>
              </Swipeable>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalPrice}>Prix Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Passer à la caisse</Text>
            </TouchableOpacity>
          </View>
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  emptyCartSubText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007BFF',
  },
  cartItem: {
    flexDirection: 'row',
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  productDetailsContainer: {
    flex: 1,
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
  totalContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
    marginRight: 16,
  },
});

export default CartScreen;

// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { db } from '../../firebase'; // Import your Firebase config file
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../interfaces/Product';  // Import the Product interface

type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;
type ProductListScreenRouteProp = RouteProp<RootStackParamList, 'ProductList'>;

interface ProductListScreenProps {
  navigation: ProductListScreenNavigationProp;
  route: ProductListScreenRouteProp;
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); // 'products' is the collection name
        const productList: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.item}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#888',
  },
});

export default ProductListScreen;

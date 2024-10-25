// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Product, products } from '../data/productsData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Image } from 'react-native';


import A from '../../assets/A.jpg'; // Adjust the path as necessary
import B from '../../assets/B.jpg'; // Adjust the path as necessary
import C from '../../assets/C.jpg'; // Adjust the path as necessary



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
////////OLD HOMESCREEN
const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.item}>
        <Image source={A} style={styles.image} />
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
      keyExtractor={(item) => item.id.toString()}
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
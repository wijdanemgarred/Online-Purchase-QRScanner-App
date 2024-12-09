import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // Import navigation

import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation(); // Get navigation object

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }
 
  
 // Handle QR code scan
 async function handleBarcodeScanned(result) {
  const scannedProductName = result.data; // Assume the QR code contains the product name
  console.log('Scanned QR Code:', scannedProductName);

  // Fetch the product by name from Firestore
  const fetchProductByName = async (productName) => {
    try {
      // Query Firestore to get the product with the corresponding name
      const productRef = collection(db, 'products');
      const q = query(productRef, where('name', '==', productName)); // Search by product name

      // Execute the query to get product document
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
          const productData = doc.data();
          console.log('Product data:', productData);

          // Navigate to the ProductDetail screen with product data
          navigation.navigate('ProductDetail', { product: productData });
        });
      } else {
        console.log('Product not found');
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product');
    }
  };

  // Fetch the product data by its name
  fetchProductByName(scannedProductName);
}

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], // Only scan QR codes
        }}
        onBarcodeScanned={(event) => {
          handleBarcodeScanned(event); // Use the scanned result
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

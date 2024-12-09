// navigation/types.ts

import { DocumentData } from 'firebase/firestore';
export type RootStackParamList = {
    Login: undefined;  // No parameters expected for Login screen
    Home: undefined;   // No parameters expected for Home screen
    // Add other screens as needed
    ProductList: undefined;
  ProductDetail: { product: DocumentData }; // Define the product parameter as DocumentData
  QRScanner: undefined;
  };
  



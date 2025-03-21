import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importação do Firestore
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBp8d-caZim4EMdM_PpUjbORu1cncnJvg8",
  authDomain: "crud-react-49e55.firebaseapp.com",
  databaseURL: "https://crud-react-49e55-default-rtdb.firebaseio.com",
  projectId: "crud-react-49e55",
  storageBucket: "crud-react-49e55.appspot.com",
  messagingSenderId: "857444817073",
  appId: "1:857444817073:web:0086625120bc153615ea90",
  measurementId: "G-FXX7KNJV0Y"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa o Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

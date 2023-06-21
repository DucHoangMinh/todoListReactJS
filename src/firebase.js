// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAGVUjqMW9oOo1L8WdYWeEnA1eplDgYmFs',
    authDomain: 'my-simple-crud-f5b5c.firebaseapp.com',
    projectId: 'my-simple-crud-f5b5c',
    storageBucket: 'my-simple-crud-f5b5c.appspot.com',
    messagingSenderId: '67101673768',
    appId: '1:67101673768:web:adc9b6c234195585aa281d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

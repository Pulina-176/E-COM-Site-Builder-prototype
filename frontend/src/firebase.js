// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCAOnWqSv2F_N0H2uIR_9gjN1Y7TvU8c4",
  authDomain: "test-c6b1d.firebaseapp.com",
  databaseURL: "https://test-c6b1d-default-rtdb.firebaseio.com",
  projectId: "test-c6b1d",
  storageBucket: "test-c6b1d.appspot.com",
  messagingSenderId: "423589112815",
  appId: "1:423589112815:web:52d5e9c5364444c8a9241a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
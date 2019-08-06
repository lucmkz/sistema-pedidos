import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCZ4fuGJyXh25M5NonyG2CvknO20S0FyfQ',
  authDomain: 'reactzzaria-c030e.firebaseapp.com',
  databaseURL: 'https://reactzzaria-c030e.firebaseio.com',
  projectId: 'reactzzaria-c030e',
  storageBucket: '',
  messagingSenderId: '563457483452',
  appId: '1:563457483452:web:2652f9d4e79d0922'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase

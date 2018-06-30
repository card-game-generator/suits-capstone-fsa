import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBjws0GS086OblSGiNPvDkxfFWTNDaY660',
  authDomain: 'suits-card-generator.firebaseapp.com',
  databaseURL: 'https://suits-card-generator.firebaseio.com',
  projectId: 'suits-card-generator',
  storageBucket: '',
  messagingSenderId: '353816980796',
};
const settings = { timestampsInSnapshots: true };
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings(settings);
export default db;

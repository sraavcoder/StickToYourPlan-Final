import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDRW-a-HWDcegVp6r3J0RFUTWNRsvuXcPo",
  authDomain: "stick-to-your-plan.firebaseapp.com",
  databaseURL: "https://stick-to-your-plan.firebaseio.com",
  projectId: "stick-to-your-plan",
  storageBucket: "stick-to-your-plan.appspot.com",
  messagingSenderId: "281312066244",
  appId: "1:281312066244:web:8e14bb3286f0fc3a512791"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

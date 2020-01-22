
import firebase from 'firebase'

// copy the config from the console https://console.firebase.google.com/u/0/project/sign-11111/settings/general/
var firebaseConfig = {
    apiKey: "AIzaSyAcR52sZGz5Edn6rryrtyy189K2FHFbfgA",
    authDomain: "intern-d961b.firebaseapp.com",
    databaseURL: "https://intern-d961b.firebaseio.com",
    projectId: "intern-d961b",
    storageBucket: "intern-d961b.appspot.com",
    messagingSenderId: "950078591602",
    appId: "1:950078591602:web:03da238351581ed481e8eb"
};
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) { 
  app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', firebase)
}
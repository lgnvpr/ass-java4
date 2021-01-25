import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCCg3XAqljQNsnhzjGTuGUsDWCzytKwUPs",
	authDomain: "ticket-9a286.firebaseapp.com",
	databaseURL: "https://ticket-9a286.firebaseio.com",
	projectId: "ticket-9a286",
	storageBucket: "ticket-9a286.appspot.com",
	messagingSenderId: "347308509861",
	appId: "1:347308509861:web:fbc03e98b07b274c09db4c",
	measurementId: "G-S8MMVQCF1J",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "it";
const fireStoreFirebase = firebase.firestore();
const storage = firebase.storage();
const authFirebase = firebase.auth();
const provideGoogle = new firebase.auth.GoogleAuthProvider();
const provideFacebook = new firebase.auth.FacebookAuthProvider();
const provideGitHub =  new firebase.auth.GithubAuthProvider();

export { storage, fireStoreFirebase, authFirebase,provideGoogle, provideFacebook, provideGitHub };

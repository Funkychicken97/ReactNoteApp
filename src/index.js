import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board.js';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
	 apiKey: "AIzaSyBJpQJLAoVDYkjvYp3n-CAQA0gVAFbDw-Q",
    authDomain: "the-app-e3e2a.firebaseapp.com",
    databaseURL: "https://the-app-e3e2a.firebaseio.com",
    projectId: "the-app-e3e2a",
    storageBucket: "the-app-e3e2a.appspot.com",
    messagingSenderId: "1086434860667",
    appId: "1:1086434860667:web:ca8d317f4c71fe58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(<Board dbRef={firebase.database().ref()} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

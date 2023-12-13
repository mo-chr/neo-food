import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyAPB9cK3KIJhC3xCd0KNINY8U9rFYhRvjE",
	authDomain: "neo-food.firebaseapp.com",
	projectId: "neo-food",
	storageBucket: "neo-food.appspot.com",
	messagingSenderId: "983822725788",
	appId: "1:983822725788:web:8941a560eeed51e2603359",
	databaseURL:
		"https://neo-food-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);




const config = {
			apiKey: "AIzaSyAFLYwPS4ftbp_ZakT18Ragq1pDyeCtMjs",
			authDomain: "chatusingreact.firebaseapp.com",
			databaseURL: "https://chatusingreact.firebaseio.com",
			projectId: "chatusingreact",
			storageBucket: "",
			messagingSenderId: "494491167736"
		};
		
const fire = new firebase.initializeApp(config);
const gglProvider = new firebase.auth.GoogleAuthProvider()

export { fire, gglProvider }

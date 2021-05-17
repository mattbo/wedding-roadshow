import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let instance = null;

export default function getFirebase() {
    if (typeof window !== 'undefined') {
        if(instance) return instance;
        instance = firebase.initializeApp({
            apiKey: process.env.FIREBASE_APIKEY,
            authDomain: process.env.FIREBASE_AUTHDOMAIN,
            databaseURL: process.env.FIREBASE_DATABASEURL,
            projectId: process.env.FIREBASE_PROJECTID,
            projectNumber: process.env.FIREBASE_PROJECTNUMBER,
            storageBucket: process.env.FIREBASE_STORAGEBUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
            appId: process.env.FIREBASE_APPID,
            measurementId: process.env.FIREBASE_MEASUREMENTID
        });
        // Emulator only!
        // instance.database().useEmulator("localhost", 9000);
        return instance;
    }
    return null;
}

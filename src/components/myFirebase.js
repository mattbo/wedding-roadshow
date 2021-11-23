import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

let instance = null;

export default function getFirebase() {
    if (typeof window !== 'undefined') {
        if(instance) return instance;
        // instance = firebase.initializeApp({
        instance = {}
        instance.app = initializeApp({
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
        
        instance.db = getDatabase(instance.app);
        instance.functions = getFunctions(instance.app);
        // Variable is only set in .env.development
        if (process.env.FIREBASE_EMULATOR === "1") { 
            console.log("Using emulator in myFirebase.js")
            // getDatabase(instance).useEmulator("localhost", 9000);
            connectDatabaseEmulator(instance.db, "localhost", 9000);
            connectFunctionsEmulator(instance.functions, "localhost", 5001);
        }

        return instance;
    }
    return null;
}

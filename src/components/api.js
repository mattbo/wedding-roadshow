/* Wrapper around the spotify web-api to grab an access token */
import Spotify from 'spotify-web-api-js';
import getFirebase from './myFirebase';
import { httpsCallable } from "firebase/functions";

let instance = null;

export function getSpotify() {
    if (typeof window !== 'undefined') {
        if(instance) return new Promise ((resolve, reject) => resolve(instance))
        // const functions = getFirebase().functions('us-central1');
        const functions = getFirebase().functions;

        // if (process.env.FIREBASE_EMULATOR === "1") { 
            // functions.useEmulator('localhost', 5001)
        // }

        // return functions.httpsCallable('getToken')()
        return httpsCallable(functions, 'getToken')()
            .then(response => {
                return response.data.access_token;
            })
            .then(data => {
                instance = new Spotify();
                instance.setAccessToken(data);
                return instance;
            });
    }
    return new Promise( (resolve, reject) => resolve(null));
}

export function getGPhotos() {
    if (typeof window !== 'undefined') {
        if(instance) return new Promise ((resolve, reject) => resolve(instance))
        // const functions = getFirebase().functions('us-central1');
        const functions = getFirebase().functions;

        // if (process.env.FIREBASE_EMULATOR === "1") { 
        //    functions.useEmulator('localhost', 5001)
        // }

        // return functions.httpsCallable('getPhotosToken')()
        return httpsCallable(functions, 'getToken')()
            .then(response => {
                return response.data.access_token;
            })
            .then(data => {
                return data;
            });
    }
    return new Promise( (resolve, reject) => resolve(null));
}

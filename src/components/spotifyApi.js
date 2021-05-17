/* Wrapper around the spotify web-api to grab an access token */
import Spotify from 'spotify-web-api-js';
import getFirebase from './myFirebase';

let instance = null;

export function getSpotify() {
    if (typeof window !== 'undefined') {
        if(instance) return new Promise ((resolve, reject) => resolve(instance))
        const functions = getFirebase().functions('us-central1');
        functions.useEmulator('localhost', 5001)
       return functions.httpsCallable('getToken')()
            .then(response => {
                return response.data.access_token;
            })
            .then(data => {
                console.log(data);
                instance = new Spotify();
                instance.setAccessToken(data);
                return instance;
            });
    }
    return new Promise( (resolve, reject) => resolve(null));
}
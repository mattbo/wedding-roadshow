// import getFirebase from '../components/myFirebase'

export const isBrowser = () => typeof window !== "undefined"

const PASS = process.env.AUTH_PASSWORD;
const lsKey = process.env.AUTH_LOCALSTORAGE_KEY;

export const getUser = () => {
  if (isBrowser() && window.localStorage.getItem(lsKey)) {
      /*
    const firebase = getFirebase();
    firebase.auth().signInAnonymously().then(() =>
        JSON.parse(window.localStorage.getItem(lsKey))
    ).catch((error) => {
        console.log("Problem with anonymous auth");
        console.log("Error code: " + error.code);
        console.log("Error message: " + error.message);
    });
    */
    return JSON.parse(window.localStorage.getItem(lsKey));
  }
  return({});
}

const setUser = user =>
  window.localStorage.setItem(lsKey, JSON.stringify(user))

export const handleLogin = ({ password }) => {
  if (password.toLowerCase() === PASS.toLowerCase()) {
    setUser({ username: `anon`, })
    return true
  }
  return false;
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}

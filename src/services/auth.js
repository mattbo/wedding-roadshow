export const isBrowser = () => typeof window !== "undefined"

const PASS = process.env.AUTH_PASSWORD;
const lsKey = process.env.AUTH_LOCALSTORAGE_KEY;

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(lsKey)
    ? JSON.parse(window.localStorage.getItem(lsKey))
    : {}

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

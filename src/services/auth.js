export const isBrowser = () => typeof window !== "undefined"

const PASS = "Let The Good Times Roll!";
const lsKey = "wedding_gatsby_user";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(lsKey)
    ? JSON.parse(window.localStorage.getItem(lsKey))
    : {}

const setUser = user =>
  window.localStorage.setItem(lsKey, JSON.stringify(user))

export const handleLogin = ({ password }) => {
  if (password === PASS) {
    return setUser({
      username: `anon`,
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}

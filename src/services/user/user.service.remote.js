import {httpService} from '../http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getloggedinUser,
  getAllUsers,
  getById,
  deleteUser,
  updateUser,
}

async function getAllUsers() {
  const users = await httpService.get('user')
  console.log('Users from getAllUsers:', users)
  return users
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

async function deleteUser(userId) {
  return httpService.delete(`user/${userId}`)
}

async function updateUser({_id}) {
  const updatedUser = await httpService.put(`user/${_id}`)

  const loggedinUser = getloggedinUser()
  if (loggedinUser?._id === updatedUser._id) _saveLocalUser(updatedUser)

  return updatedUser
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return _saveLocalUser(user)
  }
}

async function signup(userCred) {
  if (!userCred.imgUrl) {
    userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  }
  const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function getloggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    isAdmin: user.isAdmin,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

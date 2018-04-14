const { captureError } = require('./apiError')
const FireBaseService = require('../../data/vendors/firebase')
const UserService = require('../../data/repositories/usersRepository')
const OrderService = require('../../data/repositories/ordersRepository')
const { requestBeARepresentant } = require('../../domain/services/userService')

const firebaseErrors = {
  'auth/email-already-in-use': 409,
  'auth/weak-password': 400,
  'auth/invalid-email': 400
}

const getAll = async (req, res) => {
  try {
    let users = await UserService.findAllUsers()

    res.status(200).json(users)
  } catch (err) {
    return captureError('Get All Users', err, req, res)
  }
}

const requestRep = async (req, res) => {
  const { id } = req.params

  try {
    if (!id || id === 'undefined') {
      return captureError('Representant request without user', new Error(), req, res)
    }

    await requestBeARepresentant(id)
    res.status(200).json({ message: 'Received' })
  } catch (err) {
    return captureError('Representant request', err, req, res)
  }
}

const getProfile = async (req, res) => {
  const { id } = req.params
  try {
    let userProfile = await UserService.findById(id)

    if (!userProfile) {
      captureError('User not found', undefined, req, res, 404)
    }

    res.status(200).json(userProfile)
  } catch (err) {
    return captureError('Get user profile', err, req, res)
  }
}

const findUsersByParams = async (req, res) => {
  const { searchParam } = req.query
  try {
    const foundUsers = await UserService.findUsersByNameOrEmailOrSchool(
      searchParam
    )
    res.status(200).json(foundUsers)
  } catch (err) {
    return captureError('users not founds', err, req, res)
  }
}

const updateProfile = async (req, res) => {
  const { body, params } = req
  const id = params.id
  console.log('atualizando profile')
  try {
    const updatedProfile = await UserService.updateProfile(id, body)
    res.status(200).json(updatedProfile)
  } catch (err) {
    return captureError('Updating profile', err, req, res)
  }
}

const requestWithdraw = async (req, res) => {
  const { body, params } = req
  const id = params.id

  try {
    const updatedProfile = await UserService.requestWithdraw(id, body)
    res.status(200).json(updatedProfile)
  } catch (err) {
    return captureError('Requesting Withdraw', err, req, res)
  }
}

const signUp = async (req, res) => {
  const { email, password } = req.body

  try {
    const fireBaseUser = await FireBaseService.createUserWithEmailAndPassword(
      email,
      password
    )

    // FIXME: This is a bad smell
    req.params.id = fireBaseUser.uid

    return createProfile(req, res)
  } catch (err) {
    const { code, message } = err
    return captureError(message, err, req, res, firebaseErrors[code])
  }
}

const createProfile = async (req, res) => {
  const { body, params } = req
  const id = params.id

  if (!id) {
    return captureError(
      'Creating a profile without passing an ID',
      null,
      req,
      res,
      400
    )
  }

  try {
    const newProfile = await UserService.createProfile(body, id)
    res.status(201).json(newProfile)
  } catch (err) {
    return captureError(
      'Error during creating a profile, try it out in a few',
      err,
      req,
      res
    )
  }
}

const userNetwork = async (req, res) => {
  const { id } = req.params

  try {
    const userNetworks = await UserService.findUserNetwork(id)
    res.status(200).json(userNetworks)
  } catch (err) {
    return captureError('Error during retrieving user network', err, req, res)
  }
}

const userOrders = async (req, res) => {
  const { id } = req.params

  try {
    // FIXME: Esse endpoint está expondo coisas além do necessario
    // como informacoes do usuario, refatorar isso.
    const orders = await OrderService.findOrdersByUserId(id)
    res.status(200).json(orders)
  } catch (err) {
    return captureError('Error during retrieving user orders', err, req, res)
  }
}

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  requestRep,
  requestWithdraw,
  getAll,
  userOrders,
  userNetwork,
  findUsersByParams,
  signUp
}

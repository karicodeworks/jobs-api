const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('No blanks')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('User does not exist!')
  }

  const passwordCorrect = await user.comparePasswords(password)

  if (!passwordCorrect) {
    throw new UnauthenticatedError('Incorrect password!')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }

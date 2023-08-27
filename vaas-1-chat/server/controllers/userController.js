const { default: mongoose } = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck)
      return res.json({ msg: 'Username alreay used!!', status: false })
    const emailCheck = await User.findOne({ email })
    if (emailCheck)
      return res.json({ msg: 'Email already used!', status: false })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (ex) {
    // next(ex)
    console.log(ex)
  }
}

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const usernameP = await User.findOne({ username })
    if (!usernameP) {
      return res.json({ msg: 'invalid Username', status: false })
    }
    const isValidpass = await bcrypt.compare(password, usernameP.password)
    if (!isValidpass) {
      return res.json({ msg: 'invalid Password', status: false })
    }
    delete usernameP.password
    return res.json({ status: true, usernameP })
  } catch (err) {
    console.log(err)
  }
}

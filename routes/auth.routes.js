const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  // Массив middlewares (валидатор express-validator)
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min length 6 symbols')
      .isLength({min: 6})
  ],
  async (req, res) => {
  try {
    // express validator валидирует входящие поля
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data on registration'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({email})

    if (candidate) {
      return res.status(400).json({message: 'This email already exists'})
    }
    // Зашифровка пароля с библиотекой bcryptjs
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})
    // Ждем, пока сохранится user
    await user.save()

    res.status(201).json({message: 'User registered'})

  } catch (e) {
    res.status(500).json({message: 'Something went wrong, try again'})
  }
})

// /api/auth/login
router.post(
  '/login',
  // Массив middlewares (валидатор express-validator)
  [
    check('email', 'Input correct email').normalizeEmail().isEmail(),
    check('password', 'Input password').exists()
  ],
  async (req, res) => {
  try {
    // express validator валидирует входящие поля
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data on login'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({message: 'User not found'})
    }
    // Проверка совпадает ли пароль
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({message: 'Invalid password, try again'})
    }
    // Генерация токена для user при авторизации
    const token = jwt.sign(
      {userId: user.id},
      config.get('jwtSecret'),
      {expiresIn: '1h'}
    )

    res.json({token, userId: user.id})

  } catch (e) {
    res.status(500).json({message: 'Something went wrong, try again'})
  }
})

module.exports = router
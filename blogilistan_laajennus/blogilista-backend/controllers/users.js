const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
    const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

    res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
    const body = req.body
  
    if (body.password.length < 3) {
      return res.status(400).json({ error: 'password is too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)  

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    
    const savedUser = await user.save()
    res.json(savedUser.toJSON())
})

module.exports = usersRouter
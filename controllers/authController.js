const User = require('../models/User')

/**
 * Handles user login
 *   @param {import('express').Request} req - The request object
 *   @param {import('express').Response} res - The response object
*/
exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) return res
            .status(404)
            .render('login', { field: 'username', value: 'User not found' })
        if (!await user.comparePassword(password)) return res
            .status(404)
            .render('login', { field: 'password', value: 'Incorrect password' })
        delete user.password
        req.session.user = user
        res.redirect('/chats')
    } catch (error) {
        return res.status(500).render('login', { field: 'username', value: 'Server error' })
    }
}

/**
 * Handles user login
 *   @param {import('express').Response} res - The response object
*/
exports.showLogin = (_, res) => {
    // res.render('login', { field: '', value: '' })
    res.json({ fuck: 'hehe' })
}

/**
 * Handles user login
 *   @param {import('express').Request} req - The request object
 *   @param {import('express').Response} res - The response object
*/
exports.register = async (req, res) => {
    const { username, password } = req.body
    try {
        let user = await User.findOne({ username })
        if (user) return res
            .status(404)
            .render('login', { field: 'username', value: 'User already exists' })
        user = new User({ username, password })
        await user.save()
        delete user.password
        req.session.user = user
        res.redirect('/chats')
    } catch (error) {
        return res.status(500).render('login', { field: 'username', value: 'Server error' })
    }
}

/**
 * Handles user login
 *   @param {import('express').Response} res - The response object
*/
exports.showRegister = (_, res) => {
    res.render('register', { field: '', value: '' })
}


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out.');
        }
        res.clearCookie('connect.sid'); // Optional: clear the cookie
        res.redirect('/login')
    });
}
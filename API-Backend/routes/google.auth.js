const express = require('express');
const passport = require('passport');
const router = express.Router();
const googleAuthController = require('../controllers/google.auth');

// Initialize Google OAuth login

router.get('/',
    (req, res, next) => {
        console.log('Google OAuth login route called');
        next();
    },
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/callback',
    passport.authenticate('google', 
        { session: false,
        failureRedirect: '/auth/google/error' 
    }),
    googleAuthController.googleCallback
);

module.exports = router;
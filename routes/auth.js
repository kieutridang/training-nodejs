var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 7;
const privateKey = 'newPrivateKey';

/*  */
router.post('/sign-up', function (req, res, next) {
  // TODO: handle request
  const users = req.app.users
  const { email, password } = req.body;

  // TODO: check email existence
  const isExisted = users.some(user => user.email === email);

  if (isExisted) {
    // TODO: Error Handler
    res.status(400).send('Email existed!');
  } else {
    // TODO: Hash password
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      users.push({ email, password: hash });
      req.app.users = users;
      // TODO: Success Handler
      res.status(200).send('Sign up success');
    });
  }
});

router.post('/sign-in', function (req, res, next) {
  const users = req.app.users
  // TODO: handle request
  const { email, password } = req.body;

  // TODO: check email/password valid
  const isExisted = users.some(user => user.email === email);
  // TODO: error handler
  if (isExisted == false) {
    res.status(401).send('Email or password is invalid');
  } else {
    const foundUser = users.find(user => user.email === email);
    bcrypt.compare(password, foundUser.password).then(function (isMatched) {
      if (isMatched) {
        // TODO: Create access token as jwt
        jwt.sign({ email, password }, privateKey, function (err, accessToken) {
          // TODO: Store access token
          if (err) {
            res.status(500).send(err);
            return
          }
          users.forEach(user => {
            if (user.email == email) {
              user.accessToken = accessToken;
            }
          })
          req.app.users = users;
          // TODO: Success handler
          res.status(200).send({
            message: 'Sign-in successfully',
            accessToken,
          })
        });
      } else {
        res.status(401).send('Email or password is invalid');
      }
    });
  }
});

router.get('/users', function (req, res, next) {
  res.send(req.app.users);
});

module.exports = router;
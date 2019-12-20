const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("./auth-model")


router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 14);

  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error registering user"
    })
  })

});

router.post('/login', (req, res) => {
  // implement login
const { username, password } = req.body;

  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)){
      const token = signToken(user)

      res.status(200).json({
        token,
        message: `welcome ${user.username}!`
      })
    } else {
      res.status(401).json({
        message: "invalid credentials"
      })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      errorMessage: "there was a problem logging in on the backend"
    })
  })
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const secret = process.env.JWT_SECRET || "Secret Squirrel";

  options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;

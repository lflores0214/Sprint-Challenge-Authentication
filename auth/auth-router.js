const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Jokes = require("../jokes/jokes-model")


router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 14);

  user.password = hash;

  Jokes.add(user)
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
  Jokes.findBy()
});

module.exports = router;

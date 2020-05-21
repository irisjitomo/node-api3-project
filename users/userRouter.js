const express = require('express');
const userDb = require('./userDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const post = req.body
  userDb
  .insert(post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(() => {
    res.status(500).json({ message: 'error'})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  userDb.get()
  .then((database) => {
    res.status(200).json(database);
  })
  .catch(() => {
    res.status(500).json({ error: 'not getting data' });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDb
  .getById(id)
  .then(user => {
    if (user) {
      console.log('router.get /:id works')
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: "does not exist"})
    }
  })
  .catch(() => {
    res.status(500).json({ error: "not getting data"})
  })

});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id
  userDb.getUserPosts(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(() => {
    res.status(500).json({ error: 'error'})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  const user = req.body
  if (!id || id !== req.params.id) {
    return res.status(404).json({ message: "invalid user id" })
  } else {
    req.user = user
    console.log('validateUserId activated and works')
    next()
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: 'user data missing'})
  } else if (!req.body.name) {
    res.status(400).json({message: 'missing name'})
  } else {
    console.log('validateUser')
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400).json({ message: "request body is missing" })
  } if (!req.body.text) {
    res.status(400).json({ message: "no text"})
  } else {
    console.log('validatePost')
    next()
  }
}

module.exports = router;

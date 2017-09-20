const router = require('express').Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

module.exports = router;

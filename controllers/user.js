const router = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const url = require('url');

// Sign In page
router.get('/sign-in', (req, res) => {
  res.render('sign-in', { user: {}, errors: {} });
});

// Sign Up page
router.get('/sign-up', (req, res) => {
  res.render('sign-up', { user: {}, errors: {} });
});

/*
  POST /sign-up to create user

  Params:
    - email
    - password
    - password_confirmation
*/
router.post('/sign-up', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation
  };

  let errors = {};

  if (!data.name) errors.name = 'Please provide a name';
  if (!data.email) errors.email = 'Please provide an email address';
  if (!data.password) errors.password = 'Please provide a password';
  if (data.password_confirmation !== data.password) errors.password_confirmation = 'Password confirmation does not match password';

  if (Object.keys(errors).length > 0) return res.status(422).render('sign-up', { errors: errors, user: data });

  bcrypt.hash(data.password, 10).then((hash) => {
    delete data.password;
    delete data.password_confirmation;
    data.encrypted_password = hash;

    const user = models.user.build(data);

    user.save()
      .then(user => {
        req.flash('success', 'Thank you for registering, now please sign in');
        res.redirect(url.format({
          pathname: '/sign-in',
          query: req.query
        }));
      })
      .catch(err => res.status(422).render('sign-up', { errors: err, user: user }));
  });
});

module.exports = router;

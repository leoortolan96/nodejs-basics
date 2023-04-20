var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.post(
  '/submit', 
  body('email', 'E-mail inválido').isEmail(),
  body('password', 'Senha inválida').isLength({ min: 5 }),
  // body('confirmPassword', 'Senha inválida').isLength({ min: 5 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value.length < 5) {
      throw new Error('Senha inválida');
    }
    if (value !== req.body.password) {
      throw new Error('As senhas estão diferentes');
    }
    return true;
  }),
  function(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.errors.length > 0) {
      req.session.errors = errors.errors;
      req.session.success = false;
      // return res.status(400).json({ errors: errors.array() });
    } else {
      req.session.success = true;
    }
    res.redirect('/');
  },
);

module.exports = router;

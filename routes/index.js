var express = require('express');
var router = express.Router();
let userModel = require('./users')
let upload = require('./multer');

let passport = require('passport')
let localstargtegy = require('passport-local')

passport.use(new localstargtegy(userModel.authenticate()))
/* GET home page. */
router.get('/', function (req, res, next) {
  const error = req.flash("error");
  res.render('index', { error });
});

router.get('/signup', function (req, res) {
  res.render('sign-up')
})
//this is home page after login and signup make all changhes as like profile image and bioetx
router.get('/Homepage', isLoggdeIn, async function (req, res) {
  let user = await userModel.findOne(
    { username: req.session.passport.user }
  );

  res.render('Homepage', { user });
});



router.get('/logout', function (req, res) {
  req.logOut(function (e) {
    if (e) {
      return next(e)
    }
    res.redirect('/')

  })
}
)
//eddit profile
router.get('/editprofile', isLoggdeIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user })
  res.render('editprofile', user)
})
//post methord

router.post('/register', function (req, res) {
  let UserData = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  })
  userModel.register(
    UserData, req.body.password
  ).then(function (registeruser) {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/Homepage')
    })
  })
})



router.post('/login', passport.authenticate('local', { successRedirect: '/Homepage', failureRedirect: '/', failureFlash: true, }), function (req, res) { })

//edit
router.post('/edit', isLoggdeIn, upload.single('post'), async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (!user) return res.redirect('/login');

  user.username = req.body.username?.trim() || user.username;
  user.fullname = req.body.fullname || user.fullname;
  user.bio = req.body.bio || user.bio;
  if (req.file) user.profileimage = req.file.filename;

  await user.save();
  req.session.passport.user = user.username;

  res.redirect('/Homepage');
});


//middel ware
function isLoggdeIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/');
}

module.exports = router;

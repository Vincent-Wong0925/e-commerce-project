const dotenv = require('dotenv');
dotenv.config();
const db = require('./db/index');
const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');
const registrationRouter = require('./routes/registration');
const profileRouter = require('./routes/profile');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "./view/build")));

const store = new session.MemoryStore();
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24},
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email, password, done) {
    let result;
    try {
      result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rowCount == 0) {
        return done(null, false, { message: "Username or password incorrect" });
      }
      const user = result.rows[0];
      const isMatch = bcrypt.compare(password ,user.password);
      if (!isMatch) {
        return done(null, false, { message: "Username or password incorrect" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("success");
  const queryString = `
  SELECT * FROM users
  WHERE id = $1`;
  let result;

  try {
    result = await db.query(queryString, [id]);
    if (result.rowCount == 0) {
      return done(null, false);
    }
    const user = result.rows[0];
    done(null, user);
  } catch(err) {
    return done(err);
  }
});

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/register', registrationRouter);
app.use('/profile', profileRouter);

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, "./view/build/index.html"));
});

app.get('/login-failed', (req, res, next) => {
  return res.status(400).json({error: "Wrong email or password"});
});

app.post('/login', passport.authenticate("local", {failureRedirect: '/login-failed'}),
  (req, res, next) => {
    return res.status(200).json({id: req.user.id, username: req.user.username, email: req.user.email});
  });

app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({message: "Logged out successfully"});
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
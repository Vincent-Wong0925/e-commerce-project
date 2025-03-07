const db = require('./db/index');
const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');
const registrationRouter = require('./routes/registration');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");


const app = express();
const port = 3000;

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/register', registrationRouter);

const store = new session.MemoryStore();
app.use(session({
  secret: "Gk8dYnkJh",
  cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: "none" },
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(passport.initialize());
app.use(passport.session());

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
      if (user.password !== password) {
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
    return done(null, user);
  } catch(err) {
    return done(err);
  }
});

app.get('/login', (req, res, next) => {
  return res.send("This is the login page");
});

app.post('/login', passport.authenticate("local", {failureRedirect: '/login'}),
  (req, res, next) => {
    return res.send("Successfully login");
  });

app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/login');
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const db = require('./db/index');
const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');
const registrationRouter = require('./routes/registration');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/index");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
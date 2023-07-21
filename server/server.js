require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');
const User = require('./model/user.model');
const accountController = require('./controllers/accountController');


// Create Express app
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb+srv://CanTek:CanTek123@cantekcluster.uujud7m.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport local strategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all the required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// User login endpoint
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Login successful' });
});

// User logout endpoint
app.get('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ status: 'ok', message: 'Logout successful' });
});

// Check user authentication status endpoint
app.get('/api/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ status: 'ok', message: 'User is authenticated' });
  } else {
    return res.json({ status: 'error', message: 'User is not authenticated' });
  }
});

// Default route
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Hello, user is authenticated!');
  } else {
    res.send('Hello, user is not authenticated!');
  }
});

// Start the server and listen on the specified port
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());

app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile);
app.post('/login', passport.authenticate('local', { session: false }), accountController.login);
app.post('/register', accountController.register);

let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log(data);
    io.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    io.emit('newUserResponse', users);
  });

  socket.on('logout', () => {
    console.log('🔥: A user logged out');
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

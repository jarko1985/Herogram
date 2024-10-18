const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Signup controller
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login controller
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred during login." });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log in user." });
      }
      return res
        .status(200)
        .json({ message: "Login successful", user: user.email });
    });
  })(req, res, next);
};

// Logout controller
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

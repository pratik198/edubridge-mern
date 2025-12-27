const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Auth");
const { isValidEmail } = require("../utils/emailValidator");

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // --- ALL FIELDS ---
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // --- EMAIL ---
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // --- PSSWRD ---
    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    // --- ENUM ROLE ---
    if (role && !["student", "educator"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // --- ALREADY EXISTING ---
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // --- HASHED PSSWRD ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- FINALLY CREATE USER ----
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- ALL FIELDS ---
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    //  --- EMAIL ---
    // ----- VALIDATE EMAIL -----
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // ----- VALID USER -----
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // --- PSSWRD ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // --- TOKEN SIGN ---
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };

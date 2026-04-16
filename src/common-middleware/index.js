
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];



    console.log("File Name:", file.originalname);
    console.log("Mimetype:", file.mimetype);

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only image or PDF files allowed"), false);
    }


    cb(null, true);
  }
});


// Auth middleware
const requireSignin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Role middleware
const userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

// ✅ Export everything together
module.exports = {
  requireSignin,
  userMiddleware,
  adminMiddleware,
  upload,
};
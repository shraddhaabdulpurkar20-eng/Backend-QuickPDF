const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// ✅ File Filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, PNG, or PDF files allowed"), false);
  }

  cb(null, true);
};

// ✅ Upload Config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// ✅ AUTH MIDDLEWARE (USED FOR VERIFY / PROFILE)
const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔥 Better check
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ important for /verify
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


// 🔥 OPTIONAL (BEST FOR YOUR REQUIREMENT)
// Allow guest OR logged-in user
const optionalSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // logged-in user
    } catch {
      req.user = null; // invalid token
    }
  } else {
    req.user = null; // guest user
  }

  next();
};


// ✅ Role Middlewares
const userMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "User access denied",
    });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }
  next();
};

// ✅ Export
module.exports = {
  requireSignin,
  optionalSignin,   // 🔥 NEW (important)
  userMiddleware,
  adminMiddleware,
  upload,
};
const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const mergePDFRoutes = require("./routes/MergePDF.js");
const splitPDFRoutes = require("./routes/SplitPDF.js");
const compressPDFRoutes = require("./routes/CompressPDF.js");
const convertPDFRoutes = require("./routes/ConvertPDF.js");

// env
env.config();

// ✅ DB
mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("Database Connected"))
  .on("error", (err) => console.log(err));

// ✅ 🔥 CORS FIX (IMPORTANT)
app.use(cors({
  origin: "http://localhost:3000",
  exposedHeaders: [
    "X-Original-Size",
    "X-Compressed-Size",
    "X-Reduction"
  ]
}));

app.use(express.json());

// routes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", mergePDFRoutes);
app.use("/api/pdf", splitPDFRoutes);
app.use("/api", compressPDFRoutes);
app.use("/api", convertPDFRoutes);

// static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
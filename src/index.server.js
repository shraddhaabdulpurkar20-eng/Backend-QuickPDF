const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const mergePDFRoutes = require("./routes/MergePDF.js")
const splitPDFRoutes = require("./routes/SplitPDF.js")
const compressPDFRoutes = require("./routes/CompressPDF.js")
const convertPDFRoutes = require("./routes/ConvertPDF.js")


//environment variable or you can say constants
env.config();

//mongodb connection

// Enable Mongoose debug mode
mongoose.set("debug", true);

mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", function () {
    console.log("Database Connected");
  })
  .on("error", function (error) {
    console.log(error);
  });
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", mergePDFRoutes);
app.use("/api/pdf", splitPDFRoutes);
app.use("/api", compressPDFRoutes);
app.use("/api", convertPDFRoutes);


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

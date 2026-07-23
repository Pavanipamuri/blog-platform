const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Blog API Running");
});


app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/posts",require("./routes/postRoutes"));
app.use("/api/comments",require("./routes/commentRoutes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});

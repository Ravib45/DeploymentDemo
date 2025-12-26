import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
    res.send("Backend with MongoDB running 🚀");
});

// save contact
app.post("/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.json({
            success: true,
            msg: "Saved to database ✅"
        });
    } catch (err) {
        res.status(500).json({ msg: "Error saving data ❌" });
    }
});

// port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

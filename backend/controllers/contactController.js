const Contact = require('../models/Contact'); // Path check kar lein

exports.submitContact = async (req, res) => {
    try {
        // Frontend se bheja gaya data extract karna
        const { name, email, subject, message } = req.body;

        // Naya document create karna
        const newContact = new Contact({ name, email, subject, message });

        // Database mein save karna (Ye line miss hone se data save nahi hota)
        await newContact.save(); 

        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Database save error:", error);
        res.status(500).json({ message: "Failed to save data", error: error.message });
    }
};

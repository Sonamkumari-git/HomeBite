const Contact = require('../models/Contact');

// User ka message save karne ke liye
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Database mein save karna
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({ success: true, message: "Your message has been sent successfully!" });

    } catch (error) {
        console.error("Contact submission error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

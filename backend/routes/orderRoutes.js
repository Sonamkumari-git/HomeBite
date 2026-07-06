// User ke orders fetch karne ki API
router.get('/my-orders/:phone', async (req, res) => {
    try {
        const userOrders = await Order.find({ customerPhone: req.params.phone }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: userOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const express = require('express');
const cors = require('cors');

const app = express();

// ✅ IMPORTANT: Use Render's port
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock DB for OTPs
let otpStore = {};

// --- OTP Endpoints ---

// Send OTP
app.post('/api/otp/send', (req, res) => {
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: 'Contact info required' });

    const otp = "1234"; // Simulation constant
    otpStore[contact] = otp;

    console.log(`[Backend] OTP ${otp} sent to ${contact}`);
    res.json({ message: 'OTP sent successfully', simulationOtp: otp });
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
    const { contact, otp } = req.body;

    if (otpStore[contact] === otp) {
        delete otpStore[contact];
        return res.json({ success: true, message: 'OTP verified' });
    }

    res.status(400).json({ success: false, error: 'Invalid OTP' });
});

// --- Payment Endpoint ---

app.post('/api/payment/process', (req, res) => {
    const { amount, method } = req.body;

    console.log(`[Backend] Processing ${method} payment of ₹${amount}...`);

    setTimeout(() => {
        const success = Math.random() > 0.1;

        if (success) {
            res.json({ success: true, transactionId: 'TXN' + Date.now() });
        } else {
            res.status(400).json({ success: false, error: 'Payment declined by bank' });
        }
    }, 2000);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Amoga Mart Backend running on port ${PORT}`);
});

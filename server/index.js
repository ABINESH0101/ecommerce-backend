const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock DB for OTPs (in real app, use Redis or similar)
let otpStore = {};

// --- OTP Endpoints ---

// Send OTP
app.post('/api/otp/send', (req, res) => {
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: 'Contact info required' });

    // Mock sending OTP
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

// --- Payment Endpoints ---

app.post('/api/payment/process', (req, res) => {
    const { amount, method, details } = req.body;

    console.log(`[Backend] Processing ${method} payment of ₹${amount}...`);

    // Simulate delay
    setTimeout(() => {
        // 90% success rate for simulation
        const success = Math.random() > 0.1;
        if (success) {
            res.json({ success: true, transactionId: 'TXN' + Date.now() });
        } else {
            res.status(400).json({ success: false, error: 'Payment declined by bank' });
        }
    }, 2000);
});

app.listen(PORT, () => {
    console.log(`Amoga Mart Backend running on http://localhost:${PORT}`);
});

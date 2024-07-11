const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const urlRoute = require('./routes/url');
const connectToMongoDB = require('./connect');
const URL = require('./models/url');
const { handleAllUrlAnalytics } = require('./controllers/url');
const PORT = 8000;
const ConnectToMongoDB = process.env.MONGODBCONNECTURL

// Connect to MongoDB
connectToMongoDB(ConnectToMongoDB)
    .then(() => console.log('MongoDB Has Connected...'));

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the URL routes
app.use('/url', urlRoute);

// Route to handle redirection
app.get('/shorten/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { vistHistory: { timestamp: Date.now() } } }
    );
    res.redirect(entry.redirectURL);
});
app.get('/analytics', handleAllUrlAnalytics)

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
});

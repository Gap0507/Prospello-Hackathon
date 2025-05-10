// Import dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require('dotenv');
const config = require('./config/serverconfig');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

dotenv.config();

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Logging middleware
if (config.nodeEnv === "development") {
    app.use(morgan("dev"));
}

// Enable CORS
app.use(cors(config.cors));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
            ...(config.nodeEnv === "development" && { stack: err.stack }),
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: "Not Found",
        },
    });
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');
const authRouter = require('./app/routes/auth.route');
const nhaxuatbanRouter = require('./app/routes/nhaxuatban.route');
const sachRouter = require('./app/routes/sach.route');
const theodoimuonsachRouter = require('./app/routes/theodoimuonsach.route');
const nhanvienRouter = require('./app/routes/nhanvien.route');
const docgiaRouter = require('./app/routes/docgia.route');
const protectedController = require('./app/controllers/protect.controller');
const session = require('express-session');

const app = express();

app.use(cors({
    origin: "http://localhost:4000", // Cho phép từ nguồn localhost:3001
    credentials: true                // Cho phép gửi credentials (cookies, headers xác thực, v.v.)
}));

app.use(express.json());
app.use(session({
    secret: 'your-secret-key', // Secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using https
}));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to contactbook application." });
});

app.use('/api/auth', authRouter);
app.use('/api/nhaxuatban',protectedController.protected, nhaxuatbanRouter);
app.use('/api/sach',protectedController.protected, sachRouter);
app.use('/api/nhanvien' ,protectedController.protected, protectedController.isAdmin, nhanvienRouter);
app.use('/api/theodoimuonsach',protectedController.protected, theodoimuonsachRouter);
app.use('/api/docgia',protectedController.protected, protectedController.isAdmin, docgiaRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server Error",
    });
});

module.exports = app;

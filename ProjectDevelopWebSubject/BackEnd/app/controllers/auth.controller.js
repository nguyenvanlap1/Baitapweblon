const bcrypt = require('bcryptjs');
const MongoDB = require('../utils/mongodb.util');
const NhanVienService = require('../services/nhanvien.service');
const DocGiaService = require('../services/docgia.service');
const ApiError = require('../api-error');

exports.login = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const docGiaService = new DocGiaService(MongoDB.client);

        const { _id, password } = req.body; // Tài khoản (_id) và mật khẩu từ client

        // Bước 1: Thử đăng nhập với tài khoản nhân viên
        try {
            const employee = await nhanVienService.findById(_id);

            if (employee && employee.length > 0) {
                const passwordMatch = await bcrypt.compare(password, employee[0].password);

                if (passwordMatch) {
                    // Lưu thông tin nhân viên vào session
                    req.session.user = {
                        _id: employee[0]._id,
                        hotennv: employee[0].hotennv,
                        chucvu: employee[0].chucvu,
                    };

                    return res.status(200).send(req.session.user); // Thành công, trả về thông tin nhân viên
                }
            }
        } catch (error) {
            // Không cần xử lý ở đây, tiếp tục thử với tài khoản độc giả
        }

        // Bước 2: Nếu thất bại với nhân viên, thử đăng nhập với tài khoản độc giả
        const reader = await docGiaService.findById(_id);

        if (!reader || reader.length === 0) {
            return next(new ApiError(401, "User not found"));
        }

        const passwordMatch = await bcrypt.compare(password, reader[0].password);

        if (!passwordMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        // Lưu thông tin độc giả vào session
        req.session.user = {
            _id: reader[0]._id,
            holot: reader[0].holot,
            ten: reader[0].ten,
        };

        res.status(200).send(req.session.user); // Thành công, trả về thông tin độc giả
    } catch (error) {
        return next(new ApiError(500, error.message)); // Lỗi hệ thống
    }
};


exports.logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(new ApiError(500, "Failed to logout"));
            }

            res.status(200).send({ message: "Logged out successfully" });
        });
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};

exports.checkLogin = (req, res, next) => {
    if (req.session.user) {
        // If the user is logged in, return a success message along with user info
        return res.status(200).send(req.session.user);
    } else {
        // If no session exists, return an error message
        return res.status(401).send({
            message: "User is not logged in",
        });
    }
};

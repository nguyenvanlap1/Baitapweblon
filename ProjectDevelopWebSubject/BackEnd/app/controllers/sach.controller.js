const MongoDB = require("../utils/mongodb.util");
const SachService = require("../services/sach.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);

    // Lấy thông tin từ form
    const data = req.body;

    // Nếu có ảnh thì lưu tên file vào data.image
    if (req.file) {
      data.image = req.file.path; // Đây là URL ảnh trên Cloudinary
      // lưu tên file (hoặc full path nếu bạn muốn)
    }

    const result = await sachService.create(data);
    res.status(201).send(result);
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  let results = [];
  try {
    const sachService = new SachService(MongoDB.client);
    const tensach = req.body.tensach;
    if (tensach) {
      results = await sachService.findByName(tensach);
    } else {
      results = await sachService.find({});
    }
    res.send(results);
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while retrieving books: ${error}`)
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const id = req.params.id;
    const result = await sachService.findById(id);
    if (result.length === 0) {
      return next(new ApiError(404, "Book not found"));
    }
    res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error retrieving book with id=${req.params.id}: ${error}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  console.log("req.file:", req.file); // 👈 xem có path / url không
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const sachService = new SachService(MongoDB.client);
    // Lấy dữ liệu hiện tại để giữ lại ảnh cũ nếu không có ảnh mới
    const existing = await sachService.findById(req.params.id);
    if (!existing || existing.length === 0) {
      return next(new ApiError(404, "Không tìm thấy sách để cập nhật"));
    }

    const updateData = req.body;
    // Nếu có ảnh mới => dùng ảnh mới, nếu không thì giữ ảnh cũ
    if (req.file) {
      updateData.image = req.file.path; // đường dẫn ảnh mới từ Cloudinary
    } else {
      updateData.image = existing[0].image; // giữ ảnh cũ
    }

    const result = await sachService.update(req.params.id, updateData);
    if (!result) {
      return next(new ApiError(404, "Không cập nhật được sách"));
    }

    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Lỗi khi cập nhật sách có id=${req.params.id}: ${error}`
      )
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const result = await sachService.delete(req.params.id);
    if (!result) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.send({ message: `Book was deleted successfully` });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete book with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const deleteCount = await sachService.deleteAll();
    return res.send({
      message: `${deleteCount} books were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while removing all books: ${error}`)
    );
  }
};

const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    // Lấy accessToken từ header
    const authorizationStr = req.headers.authorization;
    if (!authorizationStr || !authorizationStr.startsWith("Bearer")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    const token = authorizationStr.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    try {
      //Verify accessToken
      const decoded = jwt.verify(token, "cffce994824327219b2404cef953e5eb");
      if (!decoded || !decoded.id) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }

      // Kiểm tra có tồn tại user với id đã decode không
      const checkExist = await UserModel.findById(decoded.id);
      if (!checkExist) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }
      //Lưu id user vào req
      req.userId = decoded.id;
      next();
    } catch (e) {
      console.log(e);

      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;

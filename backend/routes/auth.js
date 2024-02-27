var express = require("express");
const { ServerResponse } = require("http");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const UserModel = require("../models/user.model");
const authenticate = require("../middlewares/authenticate");
var router = express.Router();

router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {
      // Lấy data user
      const data = req.user;
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Bad request",
        });
      }

      // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
      let user = await UserModel.findOne({ email: data.email });
      if (!user) {
        const newUser = await UserModel.create({
          email: data.email,
          name: data.name,
          thumbnail: data.thumbnail,
        });

        user = newUser;
      }

      // Tạo accessToken và refreshToken
      const accessToken = jwt.sign(
        { id: user._id },
        "cffce994824327219b2404cef953e5eb",
        {
          expiresIn: 60 * 60,
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        "684ba6c0ced5b3129992f2d52b407e479a604e38",
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      return res.status(200).json({ accessToken, refreshToken });
    } catch (e) {
      console.log(e);
      return res.status(500).json("Error");
    }
  }
);

router.get("/github", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  async (req, res) => {
    // Lấy data user
    const data = req.user;
    if (!data) {
      return res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }

    // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
    let user = await UserModel.findOne({ email: data.email });
    if (!user) {
      const newUser = await UserModel.create({
        email: data.email,
        name: data.name,
        thumbnail: data.thumbnail,
      });

      user = newUser;
    }

    // Tạo accessToken và refreshToken
    const accessToken = jwt.sign(
      { id: user._id },
      "cffce994824327219b2404cef953e5eb",
      {
        expiresIn: 60 * 60,
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      "684ba6c0ced5b3129992f2d52b407e479a604e38",
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return res.status(200).json({ accessToken, refreshToken });
  }
);

router.get("/profile", authenticate, async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);

  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      id: user._id,
      email: user.email,
      name: user.name,
      thumbnail: user.thumbnail,
    },
  });
});

module.exports = router;

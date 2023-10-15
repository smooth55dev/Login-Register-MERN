const router = require("express").Router();
const controller = require("./controllers/appController");
const authMiddleware = require("./middlewares/auth-middleware");
const mailer = require("./controllers/mailer");

// POST
router.route("/register").post(controller.register);
router.route("/registerMail").post(mailer.registerMail);
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

// GET
router.route("/user/:username").get(controller.getUser);
router
  .route("/generateOTP")
  .get(
    controller.verifyUser,
    authMiddleware.localVariables,
    controller.generateOTP
  );
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

// PUT

router.route("/updateuser").put(authMiddleware.Auth, controller.updateUser);
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);

module.exports = router;

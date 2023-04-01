const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users_controller");

router.get("/signup", usersController.signUp);

router.get("/login", usersController.signIn);
router.get("/signout", usersController.signOut);

router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);

module.exports = router;

const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks_controller");

router.post("/create", tasksController.create);
router.get("/destroy/:id", tasksController.destroy);
router.post("/edit/:id", tasksController.edit);

module.exports = router;

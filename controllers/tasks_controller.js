const Task = require("../models/task");

//create new task
module.exports.create = async function (req, res) {
  try {
    await Task.create({
      ...req.body,
      user: req.cookies.user_id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return;
  }
};

// delete task by taskId
module.exports.destroy = async function (req, res) {
  try {
    let task = await Task.findById(req.params.id);
    if (task.user == req.cookies.user_id) {
      task.deleteOne();
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

//edit task by task-id
module.exports.edit = async function (req, res) {
  try {
    let task = await Task.findById(req.params.id);
    if (task.user == req.cookies.user_id) {
      await task.updateOne(req.body);
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

const Task = require("../models/task");
const User = require("../models/user");

// home controller action
module.exports.home = async function (req, res) {
  try {
    const user = await User.findById(req.cookies.user_id);
    const tasks = await Task.find({}).populate("user");
    return res.render("home", {
      tasks,
      user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

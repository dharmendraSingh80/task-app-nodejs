const User = require("../models/user");

// users signout
module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/users/login");
};

// render the sign up page
module.exports.signUp = async function (req, res) {
  try {
    const user = await User.findById(req.cookies.user_id);
    return res.render("user_signup", {
      user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

//render the sign in page

module.exports.signIn = async function (req, res) {
  try {
    const user = await User.findById(req.cookies.user_id);
    return res.render("user_login", {
      user,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            return res.redirect("/users/login");
          })
          .catch((err) => {
            console.log("error in creating user while  signing up");
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((error) => {
      console.log("error in finding user in  signing up :", error);
      return;
    });
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  // Steps to authentication
  //find the user
  User.findOne({ email: req.body.email })
    .then((user) => {
      //handle user found
      if (user) {
        //handle password which doesn't match
        if (user.password != req.body.password) {
          return res.redirect("back");
        }
        //handle session creation
        res.cookie("user_id", user.id);
        return res.redirect("/");
      } else {
        //handle user not found
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error in finding user in  signing in :", err);
      return;
    });
};

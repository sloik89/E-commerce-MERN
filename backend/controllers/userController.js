import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandlers.js";

import { generateToken } from "../utilis/generateToken.js";
// auth user & get token
// route Post /api/users/login
// acces public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// register user
// route Post /api/users
// acces public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExsist = await User.findOne({ email });
  if (userExsist) {
    res.status(400);
    throw new Error("User already exsist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// logout user / clear cookie
// route Post /api/users/logout
// acces private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
});
// get user profile
// route get /api/users/profile
// acces private
const getUserProfile = asyncHandler(async (req, res) => {
  // show user data
  const user = await User.findById(req.user._id);
  const { _id, name, email, isAdmin } = user;
  console.log(user);
  if (user) {
    res.status(200).json({
      _id,
      name,
      email,
      isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// get user profile
// route get /api/users/profile
// acces private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// get users
// route get /api/users
// acces private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
// delete users
// route delete /api/users/:id
// acces private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete users");
});

// get user
// route get /api/users/:id
// acces private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
// update user
// route put /api/users/:id
// acces private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

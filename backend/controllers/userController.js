import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandlers.js";

// auth user & get token
// route Post /api/users/login
// acces public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
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
  res.send("register user");
});
// logout user / clear cookie
// route Post /api/users/logout
// acces private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});
// get user profile
// route get /api/users/profile
// acces private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("user profile");
});
// get user profile
// route get /api/users/profile
// acces private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
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

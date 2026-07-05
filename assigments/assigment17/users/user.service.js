const userModel = require("./user.model");
const blogModel = require("../blogs/blog.model");
const { uploadFile, deleteFile } = require("../lib/cloudinary.lib");

exports.getAllUsers = async (query) => {
  const users = await userModel.find().populate("blogs", "title content");
  return users;
};

exports.getUserById = async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    return null;
  }

  return user;
};

exports.uploadProfileImage = async (userId, fileBuffer) => {
  const user = await userModel.findById(userId);
  if (!user) return null;

  if (user.imagePublicId) {
    return "IMAGE_ALREADY_EXISTS";
  }

  const uploadedImage = await uploadFile(fileBuffer, "profile-images");

  user.imageUrl = uploadedImage.url;
  user.imagePublicId = uploadedImage.publicId;

  await user.save();
  return user;
};

exports.deleteUserById = async (id) => {
  const deletedUser = await userModel.findByIdAndDelete(id);

  if (!deletedUser) {
    return null;
  }

  await blogModel.deleteMany({ author: id });

  if (deletedUser.imagePublicId) {
    await deleteFile(deletedUser.imagePublicId);
  }

  return deletedUser;
};

exports.deleteProfileImage = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) return null;

  if (!user.imagePublicId) {
    return "IMAGE_NOT_FOUND";
  }

  await deleteFile(user.imagePublicId);

  user.imageUrl = null;
  user.imagePublicId = null;

  await user.save();
  return user;
};

exports.updateUserById = async (id, body) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      ...body,
      $inc: { __v: 1 },
    },
    { new: true },
  );

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};

exports.updateProfileImage = async (userId, fileBuffer) => {
  const user = await userModel.findById(userId);
  if (!user) return null;

  const oldPublicId = user.imagePublicId;
  const uploadedImage = await uploadFile(fileBuffer, "profile-images");

  user.imageUrl = uploadedImage.url;
  user.imagePublicId = uploadedImage.publicId;

  await user.save();

  if (oldPublicId) {
    await deleteFile(oldPublicId);
  }

  return user;
};

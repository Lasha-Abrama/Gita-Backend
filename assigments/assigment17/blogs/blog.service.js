const userModel = require("../users/user.model");
const blogModel = require("./blog.model");

exports.createBlog = async ({ title, content, author }) => {
  const newBlogObject = {
    title,
    content,
    author,
  };

  const newBlog = await blogModel.create(newBlogObject);
  await userModel.findByIdAndUpdate(author, {
    $push: { blogs: newBlog._id },
  });

  return newBlog;
};

exports.getAllBlogs = async () => {
  return await blogModel.find().populate("author", "fullName email birthDate");
};

exports.getBlogById = async (id) => {
  return blogModel.findById(id).populate("author", "fullName email birthDate");
};

exports.updateBlogById = async (blogId, authorId, body) => {
  const existBlog = await blogModel.findById(blogId);
  if (!existBlog) {
    return "NOT_FOUND";
  }

  if (existBlog.author.toString() !== authorId.toString()) {
    return "PERMISSION_DENIED";
  }

  const updatedBlog = await blogModel
    .findByIdAndUpdate(blogId, body, {
      returnDocument: "after", // { new : true }
      runValidators: true,
    })
    .populate("author", "fullName");

  return updatedBlog;
};

exports.deleteBlogById = async (blogId, authorId) => {
  const existBlog = await blogModel.findById(blogId);
  if (!existBlog) {
    return "NOT_FOUND";
  }

  if (existBlog.author.toString() !== authorId) {
    return "PERMISSION_DENIED";
  }

  await blogModel.findByIdAndDelete(blogId);
  await userModel.findByIdAndUpdate(authorId, {
    $pull: { blogs: existBlog._id },
  });
  return "OK";
};

const { Router } = require("express");
const validate = require("../middlewares/validate");
const { createBlogDto } = require("./dto/create-blog.dto");
const isAuthMiddleware = require("../middlewares/is-auth.middleware");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");
const blogService = require("./blog.service");
const { updateBlogDto } = require("./dto/update-blog.dto");

const blogRouter = new Router();

blogRouter.post(
  "/",
  isAuthMiddleware,
  validate(createBlogDto),
  async (req, res) => {
    const { title, content } = req.body;
    const newblog = await blogService.createBlog({
      title,
      content,
      author: req.userId,
    });

    res.status(201).json({ message: "Blog created successfully" });
  },
);

blogRouter.get("/", isAuthMiddleware, async (req, res) => {
  const allBlogs = await blogService.getAllBlogs();
  res.json(allBlogs);
});

blogRouter.get(
  "/:id",
  isAuthMiddleware,
  isValidMongoIdMiddleware,
  async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  },
);

blogRouter.put(
  "/:id",
  isValidMongoIdMiddleware,
  isAuthMiddleware,
  validate(updateBlogDto),
  async (req, res) => {
    const resp = await blogService.updateBlogById(
      req.params.id,
      req.userId,
      req.body,
    );

    if (resp === "NOT_FOUND") {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (resp === "PERMISSION_DENIED") {
      return res.status(403).json({ message: "Permission denied" });
    }

    res.json({ message: "Blog deleted successfully", data: resp });
  },
);

blogRouter.delete(
  "/:id",
  isValidMongoIdMiddleware,
  isAuthMiddleware,
  async (req, res) => {
    const resp = await blogService.deleteBlogById(req.params.id, req.userId);
    if (resp === "NOT_FOUND") {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (resp === "PERMISSION_DENIED") {
      return res.status(403).json({ message: "Permission denied" });
    }

    res.json({ message: "Blog deleted successfully" });
  },
);

module.exports = blogRouter;

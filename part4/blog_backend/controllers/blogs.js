const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { info } = require("../utils/logger");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => info(error));
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
    console.log("Post successful");
  });
});

blogsRouter.delete("/:id", (request, response) => {
  info(request.params.id);
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      info("successfully deleted item:", result.title);
      response.status(204).end();
    })
    .catch((error) => info(error));
});

module.exports = blogsRouter;

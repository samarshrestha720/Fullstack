const blogsRouter = require("express").Router();
const { response } = require("../app");
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
  if (request.body.likes == null) {
    console.log("***Likes is null verified***");
    request.body.likes = 0;
  }
  if (request.body.title == null || request.body.url == null) {
    console.log("***Missing Url or Title***");
    response.status(400).end();
    return;
  }
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
    console.log("Post successful");
  });
});

blogsRouter.delete("/:id", async (request, response) => {
  info(request.params.id);
  const res = await Blog.findByIdAndDelete(request.params.id);
  info("successfully deleted item:", res.title);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.status(200).json(res);
});

module.exports = blogsRouter;

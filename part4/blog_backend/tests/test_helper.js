const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Samar",
    url: "abc.com/abc",
    likes: 13,
  },
  {
    title: "Data number 2",
    author: "embr",
    url: "em.com/em",
    likes: 100,
  },
];

const missingLike = {
  title: "Likes Missing",
  author: "embr",
  url: "em.com/em",
};

const missingTitle = {
  author: "embr",
  url: "em.com/em",
  likes: 10,
};

const missingUrl = {
  title: "Missing Url",
  author: "embr",
  likes: 10,
};

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  missingLike,
  missingTitle,
  missingUrl,
  nonExistingId,
  blogsInDb,
};

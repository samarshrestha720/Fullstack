const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let highestLike = 0;
  let highestPost;
  blogs.map((blog) => {
    if (blog.likes >= highestLike) {
      highestLike = blog.likes;
      highestPost = blog;
    }
  });
  return highestPost;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

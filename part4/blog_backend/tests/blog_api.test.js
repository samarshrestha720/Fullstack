const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned check", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("id is defined", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body[0].id;
  expect(id).toBeDefined();
});

//4.10 completed
test("successful post", async () => {
  const body = {
    title: "Post request Test",
    author: "embr",
    url: "em.com/em",
    likes: 62,
  };
  await api.post("/api/blogs").send(body).expect(201);
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  console.log(response.body);
});

test("likes property missing", async () => {
  await api.post("/api/blogs").send(helper.missingLike).expect(201);
  await api.get("/api/blogs").expect(200);
});

//4.12 completed
test("title and url missing get response 400", async () => {
  await api.post("/api/blogs").send(helper.missingUrl).expect(400);
  await api.post("/api/blogs").send(helper.missingTitle).expect(400);
});

test("delete note successful", async () => {
  const res = await api.get("/api/blogs/").expect(200);
  await api.delete(`/api/blogs/${res.body[0].id}`).expect(204);
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body).toHaveLength(helper.initialBlogs.length - 1);
});

test("update post successful", async () => {
  const res = await api.get("/api/blogs/").expect(200);
  const updatedBlog = {
    title: "Updated Blog 1",
    author: "embr",
    url: "em.com/em",
    likes: 2,
  };
  const response = await api
    .put(`/api/blogs/${res.body[0].id}`)
    .send(updatedBlog)
    .expect(200);
  console.log(response.body);
});

afterAll(async () => {
  await mongoose.connection.close();
});

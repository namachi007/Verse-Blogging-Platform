import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: 1,
    title: "Literary Sanctuary",
    content:
      "What secrets do books hold? Join us as we uncover the hidden meanings and messages within the pages.",
  },
  {
    id: 2,
    title: "Voyager's Journey",
    content:
      "The Voyager probes have been exploring the outer reaches of our solar system for over 40 years...",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { currentPath: req.path });
});

app.get("/feature", (req, res) => {
  res.render("feature.ejs", { currentPath: req.path });
});

app.get("/create&view", (req, res) => {
  res.render("create&view.ejs", { currentPath: req.path, posts });
});

app.get("/faqs", (req, res) => {
  res.render("faqs.ejs", { currentPath: req.path });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { currentPath: req.path });
});

app.get("/create", (req, res) => {
  res.render("create.ejs", { currentPath: req.path });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.redirect("/create&view");
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/create&view");
});

app.get("/view/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (post) {
    res.render("view.ejs", { currentPath: req.path, post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Your server is Running on Server: ${port}`);
});

import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello, Pinoy!");
});

app.get("/info", (req, res) => {
  res.status(300).send("Name: Marcus Neo Rangel, Section: IT4C, Program: IT");
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.status(200).send("Hello " + name);
});

app.get("/foo", (req, res) => {
  console.log(req.query);
});

/*
app.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request for ID: ${id}`);
});
*/

app.get("/IT", (req, res) => {
  const body = req.body;
  console.log(body);
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);

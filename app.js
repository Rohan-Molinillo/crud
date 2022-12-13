require("dotenv").config();
const express = require("express");

const userHandler = require("./userhandler");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT;

app.get("/api/users", userHandler.getUsers);

app.get("/api/users/:id", userHandler.getUserById);

app.post("/api/users", userHandler.postUser);

app.put("/api/users/:id", userHandler.updateUser);

app.delete("/api/users/:id", userHandler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`server listening on port ${port}`);
  }
});

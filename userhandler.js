const database = require("./connexionDatabase");

const getUsers = (req, res) => {
  database.query("select * from user").then((rep) => res.send(rep[0]));
};

const getUserById = (req, res) => {
  database
    .query("select * from user where id=?", [req.params.id])
    .then((rep) => {
      if (rep[0].length === 0) {
        res.sendStatus(404);
      } else {
        const rows = rep[0];
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
};

const postUser = (req, res) => {
  const { email, password } = req.body;

  database
    .query("INSERT INTO user (email, password) VALUES (?, ?)", [
      email,
      password,
    ])
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error saving user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { email, password } = req.body;

  database
    .query("update user set email = ?, password = ? where id = ?", [
      email,
      password,
      id,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error editing user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from user where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Deleting user");
    });
};

module.exports = { getUsers, getUserById, postUser, updateUser, deleteUser };

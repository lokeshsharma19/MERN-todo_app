const express = require("express");
const { Todo } = require("./DB/database");
const { TodoCheck } = require("./Middlewares/TodoCheck");
const { DuplicateChecker } = require("./Middlewares/DuplicateChecker");
const { validateId } = require("./Middlewares/validateId");
const cors = require("cors");
const app = express();

const port = 1000;

app.use(express.json());
app.use(cors());

app.get("/", async function (req, res) {
  try {
    const allTodos = await Todo.find({});
    res.json({
      allTodos: allTodos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});
app.post("/", TodoCheck, DuplicateChecker, async function (req, res) {
  const { newTask } = req.body;
  try {
    await Todo.create(newTask);
    res.send("Todo Added");
  } catch (error) {
    console.log(error);
    res.status(404).send("Couldn't Add");
  }
});
app.put("/", validateId, async function (req, res) {
  const id = req.query.id;
  console.log(id);
  try {
    const tempTodo = await Todo.findOne({ id });
    await Todo.updateOne({ id: id }, { completed: !tempTodo.completed });
    res.send("Todo Updated");
  } catch (error) {
    res.status(404).send("Couldn't Update!");
  }
});
app.delete("/", validateId, async function (req, res) {
  const { id } = req.query;
  // console.log(id);
  try {
    await Todo.deleteOne({ id: id });
    res.send("Todo Deleted");
  } catch (error) {
    res.status(404).send("Couldn't Delete!");
  }
});

app.listen(port, () => {
  console.log("app listening on ", port);
});

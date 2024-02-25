const { Todo } = require("../DB/database");
async function DuplicateChecker(req, res, next) {
  try {
    const { newTask } = req.body;
    const title = newTask.title;

    const existingTodo = await Todo.findOne({ title: title });

    if (existingTodo) {
      return res
        .status(400)
        .json({ error: "Todo with this title already exists" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { DuplicateChecker };

const { Todo } = require("../DB/database");
async function validateId(req, res, next) {
  try {
    const id = req.query.id;
    const existingTodo = await Todo.findOne({ id: id });
    if (!existingTodo) {
      return res.status(400).json({ error: "Todo doesn't exists" });
    }
    next();
  } catch (error) {
    console.error("hi", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { validateId };

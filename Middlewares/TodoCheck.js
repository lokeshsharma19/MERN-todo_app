const z = require("zod");

const schema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
});
function TodoCheck(req, res, next) {
  const { newTask } = req.body;
  try {
    const response = schema.safeParse(newTask);
    if (response.success) {
      next();
    } else {
      console.log("meqoo");
      throw new Error("Wrong Format");
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
module.exports = { TodoCheck };

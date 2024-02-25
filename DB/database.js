const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:L2z59TsKtGQHoaRV@cluster0.xsiq7uy.mongodb.net/"
);

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};

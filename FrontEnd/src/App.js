import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const baseUrl = "http://localhost:1000/";
  const [data, setData] = useState({
    isError: false,
    result: [],
    errorMsg: "",
  });
  const [tasks, setTasks] = useState([]);
  const handleAddtask = async (newTask) => {
    try {
      console.log(newTask);
      await axios.post(baseUrl, {
        newTask: {
          id: newTask.id,
          title: newTask.title,
          completed: newTask.completed,
        },
      });
      setTasks((prevState) => [...prevState, newTask]);
      setData((prev) => {
        return {
          ...prev,
          result:
            prev.result.length > 0 ? [...prev.result, newTask] : [newTask],
        };
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task. Please try again.");
    }
  };
  const handleCheck = async (id) => {
    setTasks((prevState) => {
      // Update tasks array
      return prevState.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });
    });

    setData((prev) => {
      return {
        ...prev,
        result: tasks,
      };
    });
    await axios.put(`${baseUrl}?id=${id}`);
  };

  const handleRemove = async (id) => {
    setTasks((prevState) => {
      return prevState.filter((task) => {
        return task.id !== id;
      });
    });
    console.log(id);
    await axios.delete(`${baseUrl}?id=${id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(baseUrl);
        setData((prev) => {
          return { isError: false, result: response.data, errorMsg: "" };
        });
        setTasks(response.data.allTodos);
      } catch (error) {
        console.log(error);
        setData({ isError: true, result: [], errorMsg: error.message });
        setTasks([]);
      }
    })();
  }, []);
  return (
    <div className="App container">
      <ToastContainer />
      <h1 className="main__title">Todo List</h1>
      <TodoForm handleAddtask={handleAddtask} />
      <Todos
        tasks={tasks}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
      />
    </div>
  );
}

export default App;

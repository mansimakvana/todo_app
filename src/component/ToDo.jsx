import React, { useEffect, useState } from "react";
import "./Todo.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const ToDo = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    let newTodo = {
      title: newTitle,
      description: newDesc,
    };

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodo);
    setAllTodos(updatedTodo);
    localStorage.setItem("todolist", JSON.stringify(updatedTodo));
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, []);

  return (
    <div className="todo-app">
      <h1>My Todo's</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task ?"
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What's the task Description ?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAdd} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="icon">
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <BsCheckLg className="check-icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDo;

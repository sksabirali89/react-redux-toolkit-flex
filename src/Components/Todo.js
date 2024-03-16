import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeTodoCategoryToComplete,
  changeTodoCategoryToTask,
} from "../redux/todo/todoSlice";
import { COMPLETED, TASKS } from "../redux/todo/categories";

const Todo = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.todos.selectedCategory);
  const todos = useSelector(state => state.todos[selectedCategory]);
  const todosCompleted = useSelector(state => state.todos[COMPLETED]);
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      const taskName = event.target.value.trim();
      if (taskName === "") {
        return;
      }
      const taskObj = { category: selectedCategory, todo: taskName };
      dispatch(addTodo(taskObj));
      setAddTaskInputValue("");
    }
  };

  const handleTaskComplete = e => {
    console.log(`Todo at index  is selected: ${e.target.value}`);
    // You can add more code here to handle the selection
    const params = {
      todo: e.target.value,
      category: COMPLETED,
    };
    dispatch(changeTodoCategoryToComplete(params));
  };
  const handleTaskPending = e => {
    console.log(`Todo at index  is selected: ${e.target.value}`);
    // You can add more code here to handle the selection
    const params = {
      todo: e.target.value,
      category: TASKS,
    };
    dispatch(changeTodoCategoryToTask(params));
  };

  return (
    <div className="rightside box">
      <div className="rightside-header">
        <div className="rightside-header-left">
          <div className="rightside-header-left-title">{selectedCategory}</div>
          <div className="rightside-header-left-day">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="rightside-header-right">
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
      </div>
      <div className="rightside-content">
        <div className="rightside-content-tasks">
          {todos?.map(singleTodo => (
            <div className="task-item" key={singleTodo}>
              <input
                type="radio"
                name="todoSelect"
                value={singleTodo}
                onChange={e => handleTaskComplete(e)}
              />
              {singleTodo}
            </div>
          ))}
        </div>
        {todosCompleted?.length > 0 && (
          <>
            {" "}
            <div className="completed-header-title">
              <span>Completed</span>
            </div>
            <div className="rightside-content-completed">
              {todosCompleted?.map(singleTodo => (
                <div className="task-item" key={singleTodo}>
                  <input
                    type="radio"
                    name="todoSelect"
                    value={singleTodo}
                    onChange={e => handleTaskPending(e)}
                  />
                  {singleTodo}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="rightside-footer">
        <FontAwesomeIcon icon={faPlus} className="add-task-icon" />
        <input
          type="text"
          placeholder="Add a task"
          onKeyDown={handleKeyPress}
          value={addTaskInputValue}
          onChange={e => setAddTaskInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Todo;

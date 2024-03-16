import { createSlice } from "@reduxjs/toolkit";
import { IMPORTANT, TASKS, COMPLETED } from "./categories";

const initialState = {
  selectedCategory: TASKS,
};
initialState[IMPORTANT] = [];
initialState[TASKS] = [];
initialState[COMPLETED] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { category, todo } = action.payload;
      state[category].push(todo);
    },
    changeSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeTodoCategoryToComplete: (state, action) => {
      console.log(action.payload);
      const { todo, category } = action.payload;
      state[TASKS] = state[TASKS].filter(item => item !== todo);
      state[category].push(todo);
    },
    changeTodoCategoryToTask: (state, action) => {
      console.log(action.payload);
      const { todo, category } = action.payload;
      state[COMPLETED] = state[COMPLETED].filter(item => item !== todo);
      state[category].push(todo);
    },
  },
});

export const {
  addTodo,
  changeSelectedCategory,
  changeTodoCategoryToComplete,
  changeTodoCategoryToTask,
} = todoSlice.actions;
export default todoSlice.reducer;

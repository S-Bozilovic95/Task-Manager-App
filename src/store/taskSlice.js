import { createSlice } from "@reduxjs/toolkit";
import { getAllTasks } from "../api/tasks/tasks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    initialTaskList: [],
    isLoading: null,
    currentTaskId: null,
  },

  reducers: {
    setInitialTasks(state, action) {
      state.initialTaskList = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentTaskId(state, action) {
      state.currentTaskId = action.payload;
    },
  },
});

export const getTaskData = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllTasks();
      let newArray = [];
      for (const key in response.data) {
        newArray.push({
          id: key,
          title: response.data[key].title,
          description: response.data[key].description,
          assignee: response.data[key].assignee,
          dueDate: response.data[key].dueDate,
          project: response.data[key].project,
        });
      }
      dispatch(setInitialTasks(newArray));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const { setInitialTasks, setIsLoading, setCurrentTaskId } =
  taskSlice.actions;
export const initialTaskList = (state) => state.tasks.initialTaskList;
export const isLoading = (state) => state.tasks.isLoading;
export const currentTaskId = (state) => state.tasks.currentTaskId;
export default taskSlice;

import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    employees: employeeSlice.reducer,
    projects: projectSlice.reducer,
  },
});

export default store;

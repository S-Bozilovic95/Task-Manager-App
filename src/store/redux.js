import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    employees: employeeSlice.reducer,
  },
});

export default store;

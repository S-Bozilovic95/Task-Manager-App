import { createSlice } from "@reduxjs/toolkit";
import { getAllEmployees } from "../api/employees/employees";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    initialEmployeeList: [],
    isLoading: null,
    currentEmployeeId: null,
  },

  reducers: {
    setInitialEmployees(state, action) {
      state.initialEmployeeList = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentEmployeeId(state, action) {
      state.currentEmployeeId = action.payload;
    },
  },
});

export const getEmployeeData = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllEmployees();
      let newArray = [];
      for (const key in response.data) {
        newArray.push({
          id: key,
          fullName: response.data[key].fullName,
          email: response.data[key].email,
          phoneNumber: response.data[key].phoneNumber,
          dateOfBirth: response.data[key].dateOfBirth,
          monthlySalary: response.data[key].monthlySalary,
        });
      }
      dispatch(setInitialEmployees(newArray));
      dispatch(setIsLoading(false));
      console.log(newArray);
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const { setInitialEmployees, setCurrentEmployeeId, setIsLoading } =
  employeeSlice.actions;
export const initialEmployeeList = (state) =>
  state.employees.initialEmployeeList;
export const isLoading = (state) => state.employees.isLoading;
export const currentEmployeeId = (state) => state.employees.currentEmployeeId;
export default employeeSlice;

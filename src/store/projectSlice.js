import { createSlice } from "@reduxjs/toolkit";
import { getAllProjects } from "../api/projects/projects";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    initialProjectList: [],
    isLoading: null,
    currentProjectId: null,
  },

  reducers: {
    setInitialProjects(state, action) {
      state.initialProjectList = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentProjectId(state, action) {
      state.currentProjectId = action.payload;
    },
  },
});

export const getProjectData = () => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllProjects();
      let newArray = [];
      for (const key in response.data) {
        newArray.push({
          id: key,
          title: response.data[key].title,
        });
      }
      dispatch(setInitialProjects(newArray));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const { setInitialProjects, setIsLoading, setCurrentProjectId } =
  projectSlice.actions;
export const initialProjectList = (state) => state.projects.initialProjectList;
export const isLoading = (state) => state.projects.isLoading;
export const currentProjectId = (state) => state.projects.currentProjectId;
export default projectSlice;

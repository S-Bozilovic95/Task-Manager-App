import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    initialMealsList: [],
    filteredMeals: [],
    recommendedMeals: [],
  },

  reducers: {
    setInitialMeals(state, action) {
      state.initialMealsList = action.payload;
      state.filteredMeals = action.payload;
    },
    setFilteredMeals(state, action) {
      const category = action.payload;

      if (category === "Menu") {
        state.filteredMeals = state.initialMealsList;
        return;
      }

      state.filteredMeals = state.initialMealsList.filter(
        (item) => item.category === category
      );
    },
    setRecommendedMeals(state, action) {
      const bestSellers = action.payload;
      const recommendedArr = [];

      for (const item of bestSellers) {
        const meal = state.initialMealsList.find((m) => m.id === item.id);
        if (meal) {
          recommendedArr.push(meal);
        }
      }

      state.recommendedMeals = recommendedArr;
    },
  },
});

export const { setFilteredMeals, setInitialMeals, setRecommendedMeals } =
  mealsSlice.actions;
export const filteredMeals = (state) => state.meals.filteredMeals;
export const initialMealsList = (state) => state.meals.initialMealsList;
export const recommendedMeals = (state) => state.meals.recommendedMeals;
export default mealsSlice;

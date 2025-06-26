import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  totalRecords: 0,
  currentPage: 1,
  search: "",
  status: null,
  type: null,
  selectedCategory: null,
  error: null,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload.categories;
      state.totalRecords = action.payload.totalRecords;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    addCategory(state, action) {
      state.categories.unshift(action.payload);
      state.totalRecords += 1;
    },
    updateCategory(state, action) {
      const index = state.categories.findIndex(
        (category) => category.slug === action.payload.slug
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.slug !== action.payload
      );
      state.totalRecords -= 1;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    resetCategoryState(state) {
      state.categories = [];
      state.loading = false;
      state.totalRecords = 0;
      state.currentPage = 1;
      state.search = "";
      state.status = null;
      state.type = null;
      state.selectedCategory = null;
      state.error = null;
    },
  },
});

export const {
  setCategories,
  setLoading,
  setCurrentPage,
  setSearch,
  setStatus,
  setType,
  setSelectedCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  setError,
  clearError,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    lang: localStorage.getItem('animall_lang') || 'mr', // Marathi default
    isOnline: navigator.onLine,
    showFilters: false,
    activeCategory: 'all',
    priceRange: [0, 200000],
  },
  reducers: {
    toggleLang(state) {
      state.lang = state.lang === 'mr' ? 'en' : 'mr';
      localStorage.setItem('animall_lang', state.lang);
    },
    setOnline(state, action) {
      state.isOnline = action.payload;
    },
    toggleFilters(state) {
      state.showFilters = !state.showFilters;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    clearFilters(state) {
      state.activeCategory = 'all';
      state.priceRange = [0, 200000];
    },
  },
});

export const {
  toggleLang, setOnline, toggleFilters,
  setActiveCategory, setPriceRange, clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;

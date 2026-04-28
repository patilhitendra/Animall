import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Dummy seed data for demo / offline mode ---
const DUMMY_ANIMALS = [
  {
    _id: 'a1', type: 'cow', emoji: '🐄', price: 40000,
    breed: 'जर्सी क्रॉस', calving: 'प्रथम Calving', milkPerDay: '3L',
    age: 3, ageUnit: 'years', location: 'KNG Nande Chowk (अंदाजे 3 के.एम.)',
    sellerName: 'रामू शेट', sellerPhone: '9876543210',
    description: 'जर्सी क्रॉस | प्रथम Calving | 3L दुधाची क्षमता',
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    _id: 'a2', type: 'cow', emoji: '🐄', price: 25000,
    breed: 'जर्सी क्रॉस', calving: 'नाही', milkPerDay: '0L',
    age: 2, ageUnit: 'years', location: 'KNG Nande Chowk (अंदाजे 3 के.एम.)',
    sellerName: 'संजय पाटील', sellerPhone: '9765432109',
    description: 'OL दुधाची क्षमता | जर्सी क्रॉस | नाही',
    createdAt: new Date(Date.now() - 10 * 3600000).toISOString(),
  },
  {
    _id: 'a3', type: 'buffalo', emoji: '🐃', price: 65000,
    breed: 'मुर्रा', calving: 'दुसरे', milkPerDay: '12L',
    age: 4, ageUnit: 'years', location: 'नाशिक, महाराष्ट्र',
    sellerName: 'अर्जुन मोरे', sellerPhone: '9654321098',
    description: 'मुर्रा | दुसरे Calving | 12L/दिवस दूध',
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    _id: 'a4', type: 'buffalo', emoji: '🐃', price: 85000,
    breed: 'मेहसाणा', calving: 'तिसरे', milkPerDay: '18L',
    age: 5, ageUnit: 'years', location: 'सातारा, महाराष्ट्र',
    sellerName: 'बाळू जाधव', sellerPhone: '9543210987',
    description: 'मेहसाणा | तिसरे Calving | 18L/दिवस दूध',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    _id: 'a5', type: 'goat', emoji: '🐐', price: 8000,
    breed: 'उस्मानाबादी', calving: 'पहिले', milkPerDay: '2L',
    age: 1, ageUnit: 'years', location: 'कोल्हापूर, महाराष्ट्र',
    sellerName: 'महादेव कदम', sellerPhone: '9432109876',
    description: 'उस्मानाबादी बकरी',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
  {
    _id: 'a6', type: 'chicken', emoji: '🐓', price: 350,
    breed: 'देशी', calving: '', milkPerDay: '',
    age: 6, ageUnit: 'months', location: 'सोलापूर, महाराष्ट्र',
    sellerName: 'विनोद सावंत', sellerPhone: '9321098765',
    description: 'देशी कोंबडी, निरोगी',
    createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
  {
    _id: 'a7', type: 'sheep', emoji: '🐑', price: 12000,
    breed: 'इतर', calving: '', milkPerDay: '',
    age: 2, ageUnit: 'years', location: 'अहमदनगर, महाराष्ट्र',
    sellerName: 'रवि शिंदे', sellerPhone: '9210987654',
    description: 'निरोगी मेंढी',
    createdAt: new Date(Date.now() - 72 * 3600000).toISOString(),
  },
  {
    _id: 'a8', type: 'goat', emoji: '🐐', price: 15000,
    breed: 'संगमनेरी', calving: 'दुसरे', milkPerDay: '3L',
    age: 2, ageUnit: 'years', location: 'लातूर, महाराष्ट्र',
    sellerName: 'सुरेश पोवार', sellerPhone: '9109876543',
    description: 'संगमनेरी बकरी | दुसरे Calving',
    createdAt: new Date(Date.now() - 96 * 3600000).toISOString(),
  },
];

// Assign emoji & bg color based on type (used when images are not uploaded)
export const ANIMAL_META = {
  cow:     { emoji: '🐄', bg: 'bg-amber-100',  border: 'border-amber-300' },
  buffalo: { emoji: '🐃', bg: 'bg-gray-100',   border: 'border-gray-300' },
  goat:    { emoji: '🐐', bg: 'bg-orange-100', border: 'border-orange-300' },
  chicken: { emoji: '🐓', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  sheep:   { emoji: '🐑', bg: 'bg-sky-100',    border: 'border-sky-300' },
  pig:     { emoji: '🐷', bg: 'bg-pink-100',   border: 'border-pink-300' },
  other:   { emoji: '🐾', bg: 'bg-green-100',  border: 'border-green-300' },
};

// --- Async thunks ---

export const fetchAnimals = createAsyncThunk(
  'animals/fetch',
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await api.get(`/animals?${query}`);
      // Cache in localStorage for offline
      localStorage.setItem('animall_cached_animals', JSON.stringify(res.data.animals));
      return res.data.animals;
    } catch {
      // Offline fallback: return cached or dummy data
      const cached = localStorage.getItem('animall_cached_animals');
      return cached ? JSON.parse(cached) : DUMMY_ANIMALS;
    }
  }
);

export const fetchMyListings = createAsyncThunk(
  'animals/myListings',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const res = await api.get('/animals/my/listings', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return res.data;
    } catch {
      // Offline: filter dummy by phone
      return DUMMY_ANIMALS.filter(a => a.sellerPhone === auth.user?.phone);
    }
  }
);

export const addAnimal = createAsyncThunk(
  'animals/add',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await api.post('/animals', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch {
      // Mock mode: create a local entry
      const mock = {
        _id: `local_${Date.now()}`,
        ...Object.fromEntries(formData.entries()),
        emoji: ANIMAL_META[formData.get('type')]?.emoji || '🐾',
        createdAt: new Date().toISOString(),
      };
      return mock;
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  'animals/delete',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch { /* offline: still remove from local state */ }
    return id;
  }
);

// --- Slice ---

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    list: DUMMY_ANIMALS,
    myListings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAnimals.pending, (state) => { state.loading = true; })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state) => { state.loading = false; })

      // My listings
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.myListings = action.payload;
      })

      // Add animal
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.myListings.unshift(action.payload);
      })

      // Delete
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter(a => a._id !== id);
        state.myListings = state.myListings.filter(a => a._id !== id);
      });
  },
});

export default animalsSlice.reducer;

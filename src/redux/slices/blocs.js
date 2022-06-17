import { createSlice } from '@reduxjs/toolkit';
// Bloc slice
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  guessedBlocs: [],
};

const slice = createSlice({
  name: 'blocs',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add a new guessed bloc to the list
    addGuessedBlocs(state, action) {
      state.isLoading = false;
      const {payload}=action
      state.guessedBlocs=[payload,...state.guessedBlocs]
    },
    // Rest blocs list
    resetGuessedBlocs(state, action) {
      state.isLoading = false;
      state.guessedBlocs=[]
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addGuessedBlocs, resetGuessedBlocs } = slice.actions;



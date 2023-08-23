import { createSlice } from '@reduxjs/toolkit';

const allowedTypes = ['Supplements and Herbs', 'Sports and Nutrition', 'Medicine', 'Beauty', 'Bath'].map((type) => ({ key: type, label: type }));

const initialState = {
  formData: {
    name: '',
    type: '',
    measurement_unit: '',
    age_limit: 2,
    markup_price: 0,
    exp_date: '',
    manufactured_date: '',
    description: '',
    stock: 5,
  },
  filters: [
    { key: 'name', label: 'Name' },
    {
      key: 'type',
      label: 'Type',
      options: allowedTypes,
    },
    { key: 'measurement_unit', label: 'Unit' },
    { key: 'description', label: 'Description' },
  ],
  sorts: [],
  allowedTypes,
};

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;

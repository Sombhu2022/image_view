// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../main'

const initialState = {
    images: [],
    selectedImage: {},
    status: 'idle',
    error: null,
};

// Define an async thunk to fetch products from the API
export const allImages = createAsyncThunk('images/allImages', async () => {

    const response = await axios.get(`${base_url}/api/images`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});
// Define an async thunk to fetch products from the API
export const deleteImage = createAsyncThunk('images/deleteImage', async (id) => {

    const response = await axios.delete(`${base_url}/api/images/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});


const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // all images
            .addCase(allImages.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(allImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload.allImages;


            })
            .addCase(allImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteImage.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload.allImages;


            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    },
});

export default imageSlice.reducer;

// Export any actions you need
export const selectImages = (state) => state.images;  

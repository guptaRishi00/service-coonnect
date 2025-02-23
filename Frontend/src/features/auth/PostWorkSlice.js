import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWork = createAsyncThunk(
  "work/fetchWorkDetails",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token") || null;

      if (!token) {
        console.error("No token found in localStorage");
        return rejectWithValue("No Token Found");
      }

      const work = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/my-works`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return work.data;
    } catch (error) {
      console.error("Error fetching work:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Failed to fetch work");
    }
  }
);

// ✅ New async thunk for posting a work
export const postWork = createAsyncThunk(
  "work/postWork",
  async (formData, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token") || null;

      console.log("token", JSON.stringify(token));

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/postwork`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error posting work:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Failed to post work");
    }
  }
);

const initialState = {
  work: [],
  status: "idle",
  error: null,
};

const postWorkSlice = createSlice({
  name: "postwork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWork.fulfilled, (state, action) => {
        state.work = action.payload;
      })
      .addCase(fetchWork.rejected, (state, action) => {
        state.work = null;
      })
      .addCase(postWork.fulfilled, (state, action) => {
        state.work.push(action.payload);
      })
      .addCase(postWork.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default postWorkSlice.reducer;

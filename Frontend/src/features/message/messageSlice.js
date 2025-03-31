import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Messages
export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (receiverId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return rejectWithValue("No Token Found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/message/${receiverId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch messages"
      );
    }
  }
);

// Send Message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return rejectWithValue("No Token Found");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/message/send/${receiverId}`,
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Failed to send message");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Messages
      .addCase(fetchMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;

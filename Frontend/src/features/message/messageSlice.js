import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Conversations
export const fetchConversations = createAsyncThunk(
  "message/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return rejectWithValue("No Token Found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/message/conversations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("from slice fetchConversation: ", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching conversations:",
        error.response?.data || error
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch conversations"
      );
    }
  }
);

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
    if (!receiverId || receiverId === "") {
      return rejectWithValue({ error: "Receiver ID is required" });
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found+p in localStorage");
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
    conversations: [],
    messages: [],
  },

  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload || []; // Ensure array
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.messages = action.payload || []; // Ensure it's always an array
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.newMessage); // Push the newMessage from the response
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;

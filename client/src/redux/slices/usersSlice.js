import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ search = '', status = '' } = {}, { rejectWithValue }) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const upgradeToPrime = createAsyncThunk(
  'users/upgradeToPrime',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/upgrade-prime`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upgrade failed');
    }
  }
);

export const revertToNormal = createAsyncThunk(
  'users/revertToNormal',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/revert-prime`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Revert failed');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users', userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId; // return the id so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    stats: {
      totalUsers: 0,
      primeUsers: 0,
      nonPrimeUsers: 0,
      totalFamilyMembers: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.stats = action.payload.stats;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(upgradeToPrime.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        state.stats.primeUsers += 1;
        state.stats.nonPrimeUsers = Math.max(0, state.stats.nonPrimeUsers - 1);
      })
      .addCase(upgradeToPrime.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(revertToNormal.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        state.stats.nonPrimeUsers += 1;
        state.stats.primeUsers = Math.max(0, state.stats.primeUsers - 1);
      })
      .addCase(revertToNormal.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.stats.totalUsers += 1;
        if (action.payload.isPrime) {
          state.stats.primeUsers += 1;
        } else {
          state.stats.nonPrimeUsers += 1;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        // action.payload is the deleted userId
        const removed = state.list.find((u) => u._id === action.payload);
        state.list = state.list.filter((u) => u._id !== action.payload);
        state.stats.totalUsers = Math.max(0, state.stats.totalUsers - 1);
        if (removed?.isPrime) {
          state.stats.primeUsers = Math.max(0, state.stats.primeUsers - 1);
        } else {
          state.stats.nonPrimeUsers = Math.max(0, state.stats.nonPrimeUsers - 1);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;

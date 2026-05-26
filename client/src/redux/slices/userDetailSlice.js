import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUserDetail = createAsyncThunk(
  'userDetail/fetchUserDetail',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'userDetail/updateUser',
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, updates);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

export const upgradeToPrimeDetail = createAsyncThunk(
  'userDetail/upgradeToPrime',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/upgrade-prime`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upgrade failed');
    }
  }
);

export const revertToNormalDetail = createAsyncThunk(
  'userDetail/revertToNormal',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/revert-prime`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Revert failed');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'userDetail/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Order update failed');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'userDetail/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

export const addFamilyMember = createAsyncThunk(
  'userDetail/addFamilyMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await api.post('/family', memberData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add member');
    }
  }
);

export const deleteFamilyMember = createAsyncThunk(
  'userDetail/deleteFamilyMember',
  async (memberId, { rejectWithValue }) => {
    try {
      await api.delete(`/family/${memberId}`);
      return memberId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

export const updateFamilyMember = createAsyncThunk(
  'userDetail/updateFamilyMember',
  async ({ memberId, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/family/${memberId}`, updates);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    user: null,
    orders: [],
    payments: [],
    familyMembers: [],
    totalSpent: 0,
    loading: false,
    error: null,
    updateSuccess: false, // used to briefly show a success message after saving
  },
  reducers: {
    clearUserDetail: (state) => {
      // reset when navigating away from the detail page
      state.user = null;
      state.orders = [];
      state.payments = [];
      state.familyMembers = [];
      state.totalSpent = 0;
      state.error = null;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.orders = action.payload.orders;
        state.payments = action.payload.payments;
        state.familyMembers = action.payload.familyMembers;
        state.totalSpent = action.payload.totalSpent;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(upgradeToPrimeDetail.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(revertToNormalDetail.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const index = state.orders.findIndex((o) => o._id === action.payload._id);
      if (index !== -1) state.orders[index] = action.payload;
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload);
    });

    builder
      .addCase(addFamilyMember.fulfilled, (state, action) => {
        state.familyMembers.unshift(action.payload);
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(deleteFamilyMember.fulfilled, (state, action) => {
      state.familyMembers = state.familyMembers.filter(
        (m) => m._id !== action.payload
      );
    });

    builder.addCase(updateFamilyMember.fulfilled, (state, action) => {
      const index = state.familyMembers.findIndex(
        (m) => m._id === action.payload._id
      );
      if (index !== -1) state.familyMembers[index] = action.payload;
    });
  },
});

export const { clearUserDetail, clearUpdateSuccess } = userDetailSlice.actions;
export default userDetailSlice.reducer;

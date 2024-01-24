import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchGiphyDetailById } from './giphyDetail.api';
import { IGiphyDetailState } from './giphyDetail.interface';

const initialState: IGiphyDetailState = {
  id: null,
  detail: {},
  status: 'idle',
};

export const fetchGiphyDetailAsync = createAsyncThunk(
  'giphy/fetchGiphyDetail',
  async (args: any) => {
    const { id } = args;
    const response = await fetchGiphyDetailById({ id });

    return {
      id,
      detail: response.data,
    };
  },
);

export const giphyDetailSlice = createSlice({
  name: 'giphyDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiphyDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGiphyDetailAsync.fulfilled, (state, action) => {
        const { id, detail } = action.payload;

        state.id = id;
        state.detail = detail;
        state.status = 'idle';
      })
      .addCase(fetchGiphyDetailAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectDetail = (state: RootState) => state.giphyDetail.detail;
export const selectStatus = (state: RootState) => state.giphyDetail.status;

export default giphyDetailSlice.reducer;

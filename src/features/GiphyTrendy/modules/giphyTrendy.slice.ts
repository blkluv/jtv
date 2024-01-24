import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { DEFAULT_API_PARAMS } from 'utils/config';
import { IGiphyTrendyState } from './giphyTrendy.interface';
import { fetchGiphyTrendyByType, searchGiphyTrendyByText } from './giphyTrendy.api';

const initialState: IGiphyTrendyState = {
  data: [],
  params: { ...DEFAULT_API_PARAMS },
  status: 'idle',
  currentOffset: 0,
};

export const fetchGiphyTrendyAsync = createAsyncThunk(
  'giphy/fetchGiphyTrendy',
  async (args: any, { getState }) => {
    const state: any = getState();
    const { giphyTrendy } = state;
    const { text } = args;

    let response;
    if (text) {
      response = await searchGiphyTrendyByText({ ...giphyTrendy.params, text });
    } else {
      response = await fetchGiphyTrendyByType({ ...giphyTrendy.params });
    }

    return {
      data: response.data,
      pagination: response.pagination,
    };
  },
);

const increaseOffsetByLimit = (currentOffset: number, limit: number) => {
  return currentOffset + limit;
};

const updateDataByAction = (state: IGiphyTrendyState, action: AnyAction) => {
  const { data, pagination } = action.payload;
  const { data: currentData = [], params: currentParams, currentOffset } = state;

  state.data = currentParams?.offset != currentOffset ? [...currentData, ...data] : [...data];
  state.currentOffset = currentParams?.offset || 0;
  state.pagination = pagination;
  state.status = 'idle';
};

export const giphyTrendySlice = createSlice({
  name: 'giphyTrendy',
  initialState,
  reducers: {
    stateReseting: (state) => {
      state.data = [];
      state.params = { ...initialState.params };
      state.status = initialState.status;
      state.currentOffset = initialState.currentOffset;
    },
    offsetIncrement: (state) => {
      state.params = {
        ...state.params,
        offset: increaseOffsetByLimit(state.params?.offset || 0, state.params?.limit || 0),
      };
    },
    dataTypeUpdating: (state, action) => {
      state.params = {
        ...state.params,
        type: action.payload.type,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiphyTrendyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGiphyTrendyAsync.fulfilled, (state, action) => {
        updateDataByAction(state, action);
      })
      .addCase(fetchGiphyTrendyAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { dataTypeUpdating, offsetIncrement, stateReseting } = giphyTrendySlice.actions;

export const selectTrendyData = (state: RootState) => state.giphyTrendy.data;
export const selectTrendyParam = (state: RootState) => state.giphyTrendy.params;
export const selectTrendyPagination = (state: RootState) => state.giphyTrendy.pagination;

export default giphyTrendySlice.reducer;

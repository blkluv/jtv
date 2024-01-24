import {
  selectTrendyData,
  selectTrendyParam,
  dataTypeUpdating,
  offsetIncrement,
  stateReseting,
  fetchGiphyTrendyAsync,
} from './giphyTrendy.slice';

export const useGiphyTrendy = () => {
  return {
    selectors: {
      data: selectTrendyData,
      param: selectTrendyParam,
    },
    actions: {
      dataTypeUpdating,
      offsetIncrement,
      stateReseting,
      fetchGiphyTrendyAsync,
    },
  };
};

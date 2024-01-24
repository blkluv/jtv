import { selectDetail, selectStatus, fetchGiphyDetailAsync } from './giphyDetail.slice';

export const useGiphyDetail = () => {
  return {
    selectors: {
      detail: selectDetail,
      status: selectStatus,
    },
    actions: {
      fetchGiphyDetailAsync,
    },
  };
};

import giphyDetailReducer from './modules/giphyDetail.slice';
import { IGiphyDetailState } from './modules/giphyDetail.interface';

describe('giphyDetail reducer', () => {
  const initialState: IGiphyDetailState = {
    id: null,
    detail: {},
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(giphyDetailReducer(undefined, { type: 'unknown' })).toEqual({
      id: null,
      detail: {},
      status: 'idle',
    });
  });
});

export default {};

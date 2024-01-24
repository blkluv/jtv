import GiphyFetcher from 'utils/giphySDK';
import { IGiphyDetailParams } from './giphyDetail.interface';

export const fetchGiphyDetailById = async ({ id }: IGiphyDetailParams): Promise<any> => {
  const response = await GiphyFetcher.gif(id);

  return response;
};

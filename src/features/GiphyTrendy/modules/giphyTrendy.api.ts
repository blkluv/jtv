import GiphyFetcher from 'utils/giphySDK';
import { IGiphyAPIParams, IGiphyDataType } from './giphyTrendy.interface';

export const fetchGiphyTrendyByType = async ({
  limit,
  offset,
  rating,
  type,
}: IGiphyAPIParams): Promise<IGiphyDataType> => {
  const response = await GiphyFetcher.trending({ limit, offset, rating, type });
  return response;
};

export const searchGiphyTrendyByText = async ({
  text,
  limit,
  offset,
  rating,
  type,
}: IGiphyAPIParams): Promise<IGiphyDataType> => {
  const response = await GiphyFetcher.search(text, { limit, offset, rating, type });
  return response;
};

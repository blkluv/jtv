import { GiphyFetch } from '@giphy/js-fetch-api';

const GIPHY_API_KEY: string | undefined = process.env.REACT_APP_GIPHY_SDK_API_KEY;
const giphyFetcher = new GiphyFetch(GIPHY_API_KEY || '');

export default giphyFetcher;

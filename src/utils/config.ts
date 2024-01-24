import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

export const SITE = {
  title: 'PI Giphy',
  logoWidth: 80,
};

export const STATUSES = {
  idle: 'idle',
  loading: 'loading',
  failed: 'failed',
};

export const MAIN_MENU = [
  { id: '1', title: 'GIFS', link: '/gifs', icon: EmojiEmotionsIcon },
  { id: '2', title: 'Videos', link: '/videos', icon: SportsEsportsIcon },
  { id: '4', title: 'Stickers', link: '/stickers', icon: EmojiNatureIcon },
];

export const FOOTER_MENU = [];

export const GIPHY_DATA_TYPES = {
  gif: 'gifs',
  sticker: 'stickers',
  video: 'videos',
};

export const RATING_TYPES = {
  y: 'y',
  g: 'g',
  pg: 'pg',
  pg13: 'pg-13',
  r: 'r',
};

export const DEFAULT_API_PARAMS = {
  offset: 0,
  limit: 24,
  type: '',
  rating: '',
};

export const UPLOADER_SETTING = {
  MAX_FILE_SIZE: 6291456, // 6 MB
  MAX_NUMBER_OF_FILES: 10,
  ALLOWED_FILE_TYPES: ['.gif', '.webp', '.mp4'],
};

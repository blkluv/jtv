import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';
import VideosPage from 'pages/videos/VideosPage';
import StickersPage from 'pages/stickers/StickersPage';
import GifsPage from 'pages/gifs/GifsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/gifs',
    element: <GifsPage />,
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  {
    path: '/stickers',
    element: <StickersPage />,
  },
  {
    path: '/404',
    element: 'Page not found',
  },
]);

export default router;
